const visit = require('unist-util-visit')

module.exports = ({ markdownAST, markdownNode }, pluginOptions) => {
	const { matchPath, matchHeadingDepths, suffixFrontmatterKey } = pluginOptions
	const {
		fields: { slug },
		frontmatter,
	} = markdownNode
	/**
	 * Only run on markdown paths that match a given path as option
	 */
	if (!new RegExp(matchPath).test(slug)) {
		return markdownAST
	}

	visit(markdownAST, 'heading', node => {
		if (!matchHeadingDepths.includes(node.depth)) {
			return
		}

		/**
		 * Change value of child text node
		 */
		const newChild = [...node.children]
		newChild[0].value = `${newChild[0].value} for ${frontmatter[suffixFrontmatterKey].toLowerCase()}`

		node.children = newChild
	})
	return markdownAST
}
