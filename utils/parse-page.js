const fastmatter = require('fastmatter')
const parseMarkdown = require('./parse-markdown')

module.exports = parsePage

function parsePage(fileContents) {
	const { attributes: frontmatter, body } = fastmatter(fileContents)
	const markdownAST = parseMarkdown(body)
	return {
		frontmatter,
		body,
		markdownAST,
	}
}
