import React from 'react'
import PropTypes from 'prop-types'
import glossaryUsedInRules from './../../_data/glossary-used-in-rules.json'
import glossaryUsedInGlossary from './../../_data/glossary-used-in-glossary.json'

import './glossary.scss'

const Glossary = ({ slug, glossaryData }) => {
	const glossaryKeysForRule = getGlossaryKeysForRule(slug)

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
						<div className="glossaryContent" dangerouslySetInnerHTML={{ __html: html }} />
					</article>
				)
			})}
		</>
	)
}

Glossary.propTypes = {
	slug: PropTypes.string.isRequired,
	glossaryData: PropTypes.object.isRequired,
}

export default Glossary

/**
 * Helper to get all glossary items referred by a rule (recursively)
 * @param {String} ruleSlug page slug data for a rule, eg: `rules/abc123`
 */
function getGlossaryKeysForRule(ruleSlug) {
	const result = []

	/**
	 * Iterate data from `glossary-used-in-rules` and obtain keys of glossary items used by rule
	 */
	for (const [glossaryKey, values] of Object.entries(glossaryUsedInRules)) {
		for (const { slug } of values) {
			if (ruleSlug === slug && !result.includes(glossaryKey)) {
				result.push(glossaryKey)

				/**
				 * concat any glossary item referring other glossary
				 */
				const glossaryRefs = glossaryUsedInGlossary[glossaryKey]
				if (glossaryRefs && glossaryRefs.length) {
					result.concat(glossaryRefs)
				}
			}
		}
	}

	return [...new Set(result)].sort((a, b) => a.localeCompare(b))
}
