const path = require('path')
const getMarkdownData = require('../utils/get-markdown-data')
const taskforceRulePage = require('./taskforce-rule-page/index.js')
const createFile = require('../utils/create-file')

const rulesDirDefault = path.resolve(__dirname, '../node_modules/act-rules-community/_rules')
const glossaryDirDefault = path.resolve(__dirname, '../node_modules/act-rules-community/pages/glossary')

module.exports = {
	taskforceMarkdown,
	buildTfRuleFile,
	getRuleContents,
}

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

const sectionMethodsInOrder = [
	taskforceRulePage.getFrontmatter,
	taskforceRulePage.getRuleMetadata,
	taskforceRulePage.getRuleDescription,
	taskforceRulePage.getRuleBody,
	taskforceRulePage.getGlossary,
	taskforceRulePage.getAcknowledgements,
	taskforceRulePage.getReferenceLinks,
]

function getRuleContents(ruleData, glossary) {
	const rulePageSections = sectionMethodsInOrder.map(createContent => {
		return createContent(ruleData, glossary)
	})
	return rulePageSections.join('\n\n')
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
