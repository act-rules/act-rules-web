const sectionMethodsInOrder = [
	require('./get-frontmatter'),
	require('./get-rule-metadata'),
	require('./get-rule-description'),
	require('./get-rule-body'),
	require('./get-glossary'),
	require('./get-acknowledgements'),
	require('./get-changelog'),
	require('./get-reference-links'),
]

function getRuleContent(ruleData, glossary) {
	const rulePageSections = sectionMethodsInOrder.map(createContent => {
		return createContent(ruleData, glossary)
	})
	return rulePageSections.join('\n\n')
}

module.exports = getRuleContent
