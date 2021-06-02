function getRuleBody({ body, markdownAST }) {
	const firstDfn = markdownAST.children.find(({ type }) => type === 'definition')

	if (firstDfn) {
		const { offset } = firstDfn.position.start
		body = body.substr(0, offset)
	}
	return body.trim()
}

module.exports = getRuleBody
