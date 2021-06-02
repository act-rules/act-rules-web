const path = require('path')
const getMarkdownData = require('../utils/get-markdown-data')
const createFile = require('../utils/create-file')
const getRuleContent = require('./taskforce-rule-page/get-rule-content')
const getDefinitionContent = require('./taskforce-rule-page/get-definition-content')
const program = require('commander')

const rulesDirDefault = path.resolve(__dirname, '../node_modules/act-rules-community/_rules')
const glossaryDirDefault = path.resolve(__dirname, '../node_modules/act-rules-community/pages/glossary')

program
	.option('-i, --ruleIds <id_list>', 'comma separated list of IDs', val => val.split(','))
	.option('-o, --outDir <dirname>', 'Path to output dir')
	.option('-r, --rulesDir <dirname>', 'Path to _rules directory')
	.option('-g, --glossaryDir <dirname>', 'Path to glossary directory')
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
}) {
	const rulesData = getMarkdownData(rulesDir)
	const glossary = getMarkdownData(glossaryDir)
	const glossaryFiles = new Set()

	for (const ruleData of rulesData) {
		if (ruleIds.length && !ruleIds.includes(ruleData.frontmatter.id)) {
			continue
		}
		const { filepath, content } = buildTfRuleFile(ruleData, glossary)
		await createFile(path.resolve(outDir, filepath), content)

		const definitions = parseDefinitions(content)
		definitions.forEach(dfn => glossaryFiles.add(dfn))
	}

	for (const definition of glossaryFiles) {
		const { filepath, content } = buildTfDefinitionFile(definition, glossary)
		await createFile(path.resolve(outDir, filepath), content)
	}
}

function buildTfRuleFile(ruleData, glossary) {
	return {
		filepath: ruleData.filename,
		content: getRuleContent(ruleData, glossary),
	}
}

function buildTfDefinitionFile(definitionKey, glossary) {
	return {
		filepath: `glossary/${definitionKey}.md`,
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
