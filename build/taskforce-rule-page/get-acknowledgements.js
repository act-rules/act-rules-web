const outdent = require('outdent').default
const { contributors } = require('../../node_modules/act-rules-community/package.json')
const { getAcknowledgements } = require('../../src/rule/get-acknowledgements')

function getMdAcknowledgements({ frontmatter }) {
	const acknowledgements = frontmatter.acknowledgments || frontmatter.acknowledgements
	const sections = getAcknowledgements(acknowledgements, contributors)
	const sectionTexts = sections.map(sectionToMarkdown)

	const intro = outdent`
    This rule was written in the [ACT Rules community group](https://w3.org/community/act-r/), 
    with the support of the EU-funded [WAI-Tools Project](https://www.w3.org/WAI/about/projects/wai-tools/).
	`
	return `## Acknowledgements\n\n${intro}\n\n` + sectionTexts.join('\n\n')
}

function sectionToMarkdown({ title, items }) {
	const content = items.map(({ url, text }) => (url ? `- [${text}](${url})` : `- ${text}`))

	return `### ${title}\n\n` + content.join('\n')
}

module.exports = getMdAcknowledgements
