import React from 'react'
import PropTypes from 'prop-types'
import glossaryUsages from './../../_data/glossary-usages.json'

const Glossary = ({ ruleId, glossaryData }) => {
	const glossaryKeysForRule = glossaryUsages[ruleId]
	// Always show the outcome definition:
	if (!glossaryKeysForRule.includes('#outcome')) {
		glossaryKeysForRule.push('#outcome')
	}
	const items = glossaryData.edges.filter(({ node }) => {
		const { frontmatter } = node
		return glossaryKeysForRule.includes(`#${frontmatter.key}`)
	})

	return (
		<>
			<a id="glossary-listing" href="#glossary-listing">
				<h2>Glossary</h2>
			</a>
			{items.map(({ node }) => {
				const { frontmatter, html } = node
				return (
					<article key={node.id}>
						<a id={frontmatter.key} href={`#${frontmatter.key}`}>
							<h3>{frontmatter.title}</h3>
						</a>
						<div dangerouslySetInnerHTML={{ __html: html }} />
					</article>
				)
			})}
		</>
	)
}

Glossary.propTypes = {
	ruleId: PropTypes.string.isRequired,
	glossaryData: PropTypes.object.isRequired,
}

export default Glossary
