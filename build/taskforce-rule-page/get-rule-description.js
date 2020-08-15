function getRuleDescription({ frontmatter }) {
	return `## Description\n\n` + frontmatter.description.trim()
}

module.exports = getRuleDescription
