const visit = require('unist-util-visit')

module.exports = ({ markdownAST, markdownNode }, pluginOptions) => {
	const { matchPath, fromHeadingDepth, toHeadingDepth } = pluginOptions
	const {
		fields: { slug },
	} = markdownNode

	/**
	 * Only run on markdown paths that match a given path as option
	 */
	if (!new RegExp(matchPath).test(slug)) {
		return markdownAST
	}

	visit(markdownAST, 'heading', node => {
		if (node.depth !== fromHeadingDepth) {
			return
		}
		/**
		 * Change heading depth
		 */
		node.depth = toHeadingDepth
	})
	return markdownAST
}
