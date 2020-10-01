const getMarkdownAstNodesOfType = require('./get-markdown-ast-nodes-of-type')

function getRuleGlossary(markdownAST, glossary) {
	const keysSearched = {
		outcome: getDefinition('outcome', glossary),
	}
	const keysToSearch = getDefinitionLinks(markdownAST)

	while (keysToSearch.length > 0) {
		// Move the key to the "searched" list
		const currentKey = keysToSearch.pop()

		// Find all keys in the current definition
		const definition = getDefinition(currentKey, glossary)
		const newKeys = getDefinitionLinks(definition.markdownAST)
		keysSearched[currentKey] = definition

		// Add new keys to the search list
		newKeys.forEach(definitionKey => {
			if (!keysSearched[definitionKey] && !keysToSearch.includes(definitionKey)) {
				keysToSearch.push(definitionKey)
			}
		})
	}

	return Object.values(keysSearched)
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
