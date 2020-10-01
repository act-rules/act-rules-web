const getRuleGlossary = require('../../utils/get-rule-glossary')

function getGlossary({ markdownAST }, glossary) {
	const ruleGlossary = getRuleGlossary(markdownAST, glossary)
	const glossaryIncludes = ruleGlossary.map(getGlossaryMarkdown).join('\n')

	return `## Glossary\n\n` + glossaryIncludes
}

function getGlossaryMarkdown({ frontmatter }) {
	return `{% include_relative glossary/${frontmatter.key}.md %}`
}

module.exports = getGlossary
