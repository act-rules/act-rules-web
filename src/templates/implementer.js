import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import ListOfImplementations from '../components/list-of-implementations'
import RuleHeader from '../components/rule-header'
import Badge from '../components/badge'
import Note from '../components/note'

import './implementer.scss'

const Implementer = ({ location, data }) => {
	const { implementerData } = data.sitePage.context
	const { organisation, toolName, actMapping, description } = JSON.parse(implementerData)

	const title = `Implementation report of ${toolName} (${organisation})`
	const completeMaps = filterByConsistency(actMapping, ['consistent', 'partially-consistent'])
	const incompleteMaps = filterByConsistency(actMapping, ['inconsistent'])

	if (!completeMaps || !completeMaps.length) {
		return (
			<Layout location={location}>
				<SEO title={title} />
				<section className="page-implementer">
					<h1>{title}</h1>
					<Note
						title={`Insufficient implementation data`}
						body={`There are no known implementations. This is likely because the rule has been updated and the implementation report has not yet been updated.`}
					/>
				</section>
			</Layout>
		)
	}

	return (
		<Layout location={location}>
			<SEO title={title} />
			<section className="page-implementer">
				{/* title  */}
				<h1>{title}</h1>
				{/* desc  */}
				{description && <p>{description}</p>}
				{/* impl  */}
				{data.allRules.edges.map(({ node }) => {
					const {
						frontmatter: { id, name, rule_type },
					} = node

					const impl = completeMaps.find(({ ruleId }) => ruleId === id)
					const isIncomplete = incompleteMaps.find(({ ruleId }) => ruleId === id)

					if (!impl && isIncomplete) {
						return null
					}

					if (!impl) {
						return null
					}

					/**
					 * show complete implementation tabulation
					 */
					return (
						<div className="cardItem" key={id} data-rule-id={id}>
							<RuleHeader ruleId={id} ruleName={name}>
								<Badge title={`Id:`} value={id} />
								<Badge title={`Type:`} value={rule_type} />
								<Badge title={`Consistency:`} value={impl.consistency} />
							</RuleHeader>
							<ListOfImplementations mapping={[impl]} showIncomplete={false} />
						</div>
					)
				})}
			</section>
		</Layout>
	)
}

export default Implementer

export const query = graphql`
	query($path: String) {
		sitePage(path: { eq: $path }) {
			context {
				filename
				title
				implementerData
			}
		}
		allRules: allMarkdownRemark(
			sort: { fields: [frontmatter___name], order: ASC }
			filter: { fields: { markdownType: { eq: "rules" } } }
		) {
			totalCount
			edges {
				node {
					fields {
						fileName {
							relativePath
						}
						markdownType
						slug
						fastmatterAttributes
					}
					frontmatter {
						id
						name
						rule_type
					}
				}
			}
		}
	}
`

/**
 * Filter a given set of implementations based on consistency
 * @param {Array<Object>} items array of implementations
 * @param {Array<String>} values allowed values
 * @returns {Array<Object>}
 */
export function filterByConsistency(items, values) {
	return items.filter(({ consistency }) => {
		return values.includes(consistency)
	})
}
