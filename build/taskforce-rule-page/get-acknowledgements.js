const { contributors } = require('../../node_modules/act-rules-community/package.json')
const { getAcknowledgements } = require('../../src/rule/get-acknowledgements')

function getMdAcknowledgements({ frontmatter }) {
	const acknowledgements = frontmatter.acknowledgments || frontmatter.acknowledgements
	const sections = getAcknowledgements(acknowledgements, contributors)
	const sectionTexts = sections.map(sectionToMarkdown)
	return '## Acknowledgements\n\n' + sectionTexts.join('\n\n')
}

function sectionToMarkdown({ title, items }) {
	const content = items.map(({ url, text }) => (url ? `- [${text}](${url})` : `- ${text}`))
	return `### ${title}\n\n` + content.join('\n')
}

module.exports = getMdAcknowledgements
