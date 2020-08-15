const getRuleGlossary = require('../../utils/get-rule-glossary')
const stripReferenceLinks = require('./get-rule-body')

function getGlossary({ markdownAST }, glossary) {
	const ruleGlossary = getRuleGlossary(markdownAST, glossary)
	return `## Glossary\n\n` + ruleGlossary.map(getGlossaryMarkdown).join('\n\n')
}

function getGlossaryMarkdown({ frontmatter, body, markdownAST }) {
	return `### ${frontmatter.title}\n\n` + stripReferenceLinks({ body, markdownAST })
}

module.exports = getGlossary
