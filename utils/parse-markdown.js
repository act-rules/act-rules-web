const unified = require('unified')
const remarkParse = require('remark-parse')
const remarkFrontmatter = require('remark-frontmatter')

function parseMarkdown(markdown) {
	const unifiedProcesser = unified()
		.use(remarkParse)
		.use(remarkFrontmatter)
	return unifiedProcesser.parse(markdown)
}

module.exports = parseMarkdown
