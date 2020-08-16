const path = require('path')
const getMarkdownData = require('../utils/get-markdown-data')
const createFile = require('../utils/create-file')

const sectionMethodsInOrder = [
	require('./taskforce-rule-page/get-frontmatter'),
	require('./taskforce-rule-page/get-rule-metadata'),
	require('./taskforce-rule-page/get-rule-description'),
	require('./taskforce-rule-page/get-rule-body'),
	require('./taskforce-rule-page/get-glossary'),
	require('./taskforce-rule-page/get-acknowledgements'),
	require('./taskforce-rule-page/get-reference-links'),
]

const rulesDirDefault = path.resolve(__dirname, '../node_modules/act-rules-community/_rules')
const glossaryDirDefault = path.resolve(__dirname, '../node_modules/act-rules-community/pages/glossary')

async function taskforceMarkdown(rulesDir = rulesDirDefault, glossaryDir = glossaryDirDefault) {
	const rulesData = getMarkdownData(rulesDir)
	const glossary = getMarkdownData(glossaryDir)

	for (const ruleData of rulesData) {
		const { filepath, content } = buildTfRuleFile(ruleData, glossary)
		await createFile(filepath, content)
	}
}

function buildTfRuleFile(ruleData, glossary) {
	return {
		filepath: `content/${ruleData.filename}`,
		content: getRuleContents(ruleData, glossary),
	}
}

function getRuleContents(ruleData, glossary) {
	const rulePageSections = sectionMethodsInOrder.map(createContent => {
		return createContent(ruleData, glossary)
	})
	return rulePageSections.join('\n\n')
}

module.exports = {
	taskforceMarkdown,
	buildTfRuleFile,
	getRuleContents,
}

// Execute if invoked directly with node
if (require.main === module) {
	taskforceMarkdown()
		.then(() => {
			console.log('Created taskforce markdown files')
			process.exit()
		})
		.catch(e => {
			console.error(e)
			process.exit(1)
		})
}
