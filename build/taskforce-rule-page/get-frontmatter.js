const outdent = require('outdent').default

function getFrontmatter({ filename, frontmatter }) {
	const permalink = '/standards-guidelines/act/rules/' + filename.replace('.md', '')
	const githubPath = `content/${filename}`
	return outdent`
    ---
    title: "${frontmatter.name}"
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

module.exports = getFrontmatter
