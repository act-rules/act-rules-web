const outdent = require('outdent').default
const parseMarkdown = require('../../utils/parse-markdown')

function getFrontmatter({ filename, frontmatter }) {
	const permalink = '/standards-guidelines/act/rules/' + filename.replace('.md', '')
	const githubPath = `content/${filename}`
	return outdent`
    ---
    title: "${stripMarkdownFromStr(frontmatter.name)}"
    permalink: ${permalink}/
    ref: ${permalink}/
    lang: en
    github:
      repository: w3c/wcag-act-rules
      path: ${githubPath}
    # footer: > # Text in footer in HTML
    #   <p> This is the text in the footer </p>
    ---
  `
}

function stripMarkdownFromStr(str) {
	const AST = parseMarkdown(str)
	return stripMarkdownFromAST(AST)
}

function stripMarkdownFromAST(markdownAST) {
	if (markdownAST.value) {
		return markdownAST.value
	}

	let str = ''
	for (const child of markdownAST.children || []) {
		str += stripMarkdownFromAST(child)
	}
	return str
}

module.exports = getFrontmatter
