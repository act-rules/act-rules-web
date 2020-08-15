const getMarkdownAstNodesOfType = require('./get-markdown-ast-nodes-of-type')

function getRuleGlossary(markdownAST, glossary) {
	const ruleGlossary = {
		outcome: getDefinition('outcome', glossary),
	}
	const dfnLinks = getDefinitionLinks(markdownAST)
	while (dfnLinks.length > 0) {
		const dfnLink = dfnLinks.pop()
		if (typeof ruleGlossary[dfnLink] !== 'undefined') {
			continue
		}

		const definition = getDefinition(dfnLink, glossary)
		ruleGlossary[dfnLink] = definition

		if (definition) {
			const newDfnLinks = getDefinitionLinks(definition.markdownAST)
			dfnLinks.push(...newDfnLinks)
		}
	}

	return Object.values(ruleGlossary)
		.filter(val => val !== null)
		.sort((a, b) => (a.frontmatter.key > b.frontmatter.key ? 1 : -1))
}

function getDefinitionLinks(markdownAST) {
	// get all links -> eg: [Alpha](https://....) or [Beta](#semantic-role)
	const pageLinks = getMarkdownAstNodesOfType(markdownAST, 'link').map(({ url }) => url)
	// get all definition links  -> eg: [alpha]: https:// 'Link to something' or [beta]: #some-glossary 'Def to some glossary'
	const definitionLinks = getMarkdownAstNodesOfType(markdownAST, 'definition').map(({ url }) => url)

	const allLinks = [...pageLinks, ...definitionLinks]
	const localLinks = allLinks.filter(dfnTerm => dfnTerm[0] === '#')
	return localLinks.map(dfnTerm => dfnTerm.substr(1))
}

function getDefinition(dfnLink, glossary) {
	return glossary.find(dfn => dfn.frontmatter.key === dfnLink) || null
}

module.exports = getRuleGlossary
