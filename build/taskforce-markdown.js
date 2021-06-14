const path = require('path')
const getMarkdownData = require('../utils/get-markdown-data')
const createFile = require('../utils/create-file')
const getRuleContent = require('./taskforce-rule-page/get-rule-content')
const getDefinitionContent = require('./taskforce-rule-page/get-definition-content')
const { getWcagCriterion } = require('../src/rule/get-wcag-criterion')
const program = require('commander')

const rulesDirDefault = path.resolve(__dirname, '../node_modules/act-rules-community/_rules')
const glossaryDirDefault = path.resolve(__dirname, '../node_modules/act-rules-community/pages/glossary')

program
	.option('-i, --ruleIds <id_list>', 'comma separated list of IDs', val => val.split(','))
	.option('-o, --outDir <dirname>', 'Path to output dir')
	.option('-r, --rulesDir <dirname>', 'Path to _rules directory')
	.option('-g, --glossaryDir <dirname>', 'Path to glossary directory')
	.option('-p, --proposed', 'List the rule with the Proposed rule template')
	.parse(process.argv)

taskforceMarkdown(program)
	.then(() => {
		console.log('Created taskforce markdown files')
		process.exit()
	})
	.catch(e => {
		console.error(e)
		process.exit(1)
	})

async function taskforceMarkdown({
	rulesDir = rulesDirDefault,
	glossaryDir = glossaryDirDefault,
	ruleIds = [],
	outDir = './content/',
	proposed = false,
}) {
	const rulesData = getMarkdownData(rulesDir)
	const glossary = getMarkdownData(glossaryDir)
	const glossaryFiles = new Set()
	let wcagMapping = require(path.resolve(outDir, 'wcag-mapping.json'))

	for (let ruleData of rulesData) {
		ruleData = { ...ruleData, proposed }
		if (ruleIds.length && !ruleIds.includes(ruleData.frontmatter.id)) {
			continue
		}

		wcagMapping['act-rules'] = updateWcagMapping(wcagMapping['act-rules'], ruleData)
		console.log(`Updated ${ruleLink(ruleData)}`)

		const { filepath, content } = buildTfRuleFile(ruleData, glossary)
		await createFile(path.resolve(outDir, 'content', filepath), content)

		const definitions = parseDefinitions(content)
		definitions.forEach(dfn => glossaryFiles.add(dfn))
	}

	for (const definition of glossaryFiles) {
		const { filepath, content } = buildTfDefinitionFile(definition, glossary)
		await createFile(path.resolve(outDir, filepath), content)
	}

	await createFile(path.resolve(outDir, 'wcag-mapping.json'), JSON.stringify(wcagMapping, null, 2))
	console.log('\nUpdated wcag-mapping.json')
}

function buildTfRuleFile(ruleData, glossary) {
	return {
		filepath: ruleData.filename,
		content: getRuleContent(ruleData, glossary),
	}
}

function buildTfDefinitionFile(definitionKey, glossary) {
	return {
		filepath: `content/glossary/${definitionKey}.md`,
		content: getDefinitionContent(definitionKey, glossary),
	}
}

function parseDefinitions(content) {
	const definitionKeys = []
	const matches = content.match(/{%[^%]*%}/g)
	matches.forEach(str => {
		const match = str.match(/{%\s+include_relative\s+glossary\/([^.]+).md\s+%}/i)
		if (match) {
			definitionKeys.push(match[1])
		}
	})
	return definitionKeys
}

function ruleLink({ frontmatter, filename }) {
	return `[${frontmatter.name}](${ruleUrl(filename)})`
}

function updateWcagMapping(wcagMapping, { frontmatter, filename, proposed }) {
	const { id } = frontmatter
	wcagMapping = wcagMapping.filter(({ permalink }) => !permalink.includes('-' + id))
	const { successCriteria, wcagTechniques } = getRequirements(frontmatter)

	wcagMapping.push({
		title: frontmatter.name.replace(/`/gi, ''),
		permalink: ruleUrl(filename),
		successCriteria,
		wcagTechniques,
		proposed,
	})
	return wcagMapping
}

function ruleUrl(filename) {
	return `/standards-guidelines/act/rules/${filename.replace('.md', '')}/`
}

function getRequirements({ accessibility_requirements: requirements }) {
	const successCriteria = []
	const wcagTechniques = []
	Object.keys(requirements || {}).forEach(id => {
		const [standard, key] = id.split(':')
		if (standard === 'wcag-technique') {
			wcagTechniques.push(key)
		}

		if (standard.indexOf('wcag2') === 0) {
			const scId = getWcagCriterion(key).url.split('#')[1]
			if (scId) {
				successCriteria.push(scId)
			}
			return
		}
	})
	return { successCriteria, wcagTechniques }
}
