const getRuleGlossary = require('../../utils/get-rule-glossary')

function getRuleReferenceLinks(rule, glossary) {
	const pages = [rule]
	pages.push(...getRuleGlossary(rule.markdownAST, glossary))
	const reflinkMap = getReferenceLinkMap(pages)
	const sortedLines = Object.entries(reflinkMap).sort(([a], [b]) => (a > b ? 1 : -1))
	const refLinkLines = sortedLines.map(([key, text]) => `${key}: ${text}`)
	return refLinkLines.join('\n')
}

function getReferenceLinkMap(pages) {
	const reflinkMap = {}
	const refLinks = pages.map(getReferenceLinks).filter(refLink => refLink !== '')

	refLinks.forEach(refLinkStr => {
		const refLinks = refLinkStr.split('\n')
		for (const refLink of refLinks) {
			const [key, text] = refLink.split(': ')
			if (key && text && !reflinkMap[key]) {
				reflinkMap[key] = text
			}
		}
	})
	return reflinkMap
}

function getReferenceLinks({ body, markdownAST }) {
	const firstDfn = markdownAST.children.find(({ type }) => type === 'definition')
	if (!firstDfn) {
		return ''
	}
	const { offset } = firstDfn.position.start
	return body.substr(offset)
}

module.exports = getRuleReferenceLinks
