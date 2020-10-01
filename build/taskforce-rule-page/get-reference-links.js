function getReferenceLinks({ body, markdownAST }) {
	const firstDfn = markdownAST.children.find(({ type }) => type === 'definition')
	if (!firstDfn) {
		return ''
	}
	const { offset } = firstDfn.position.start
	return body.substr(offset)
}

module.exports = getReferenceLinks
