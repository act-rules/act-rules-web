const assert = require('assert')

function getDefinitionContent(definitionKey, glossary) {
	const definition = glossary.find(dfn => dfn.frontmatter.key === definitionKey)
	assert(definition, `Unable to find definition for ${definitionKey} in glossary`)

	const heading = `### ${definition.frontmatter.title} {#${definitionKey}}\n`
	return heading + definition.body
}

module.exports = getDefinitionContent
