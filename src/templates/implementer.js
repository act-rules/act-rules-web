import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import ListOfImplementations from '../components/list-of-implementations'
import AccessibilityRequirements from '../components/accessibility_requirements'
import RuleHeader from '../components/rule-header'

import './implementer.scss'

const Implementer = ({ location, data }) => {
	const { title, implementerData } = data.sitePage.context
	const { actMapping } = JSON.parse(implementerData)
	const completeMaps = filterByConsistency(actMapping, ['consistent', 'partially-consistent'])
	const incompleteMaps = filterByConsistency(actMapping, ['inconsistent'])

	return (
		<Layout location={location}>
			<SEO title={title} />
			<section className="page-implementer">
				<h1>{title}</h1>
				{
					data.allRules.edges
						.map(({ node }) => {
							const { frontmatter: { id, name, rule_type }, fields: { fastmatterAttributes } } = node
							const { accessibility_requirements } = JSON.parse(fastmatterAttributes)
							const ruleScs = Object.keys(accessibility_requirements || {})
								.filter(key => key.includes('wcag20') || key.includes('wcag21'))
								.map(key => key.split(':').pop())
								.map(sc => 'wcag' + sc.replace(/\./g, ''))

							const impl = completeMaps.find(({ ruleId }) => ruleId === id)
							const isIncomplete = incompleteMaps.find(({ ruleId }) => ruleId === id)


							if (!impl && isIncomplete) {
								return null
							}

							/**
							 * When there is no complete implementation & SC's are not WCAG, list the accessibility requirements
							 */
							if (!ruleScs.length) {
								return (
									<div
										className='cardItem'
										key={id}
										data-rule-id={id}>
										<RuleHeader
											ruleId={id}
											ruleType={rule_type}
											ruleName={name}>
										</RuleHeader>
										<AccessibilityRequirements
											accessibility_requirements={accessibility_requirements}
											type='text' />
									</div>
								)
							}

							if (!impl) {
								return null
							}

							/**
							 * show complete implementation tabulation
							 */
							return (
								<div
									className='cardItem'
									key={id}
									data-rule-id={id}>
									<RuleHeader
										ruleId={id}
										ruleType={rule_type}
										ruleName={name}>
									</RuleHeader>
									<ListOfImplementations
										mapping={[
											{
												...impl,
												ruleType: rule_type
											}
										]}
										showIncomplete={false} />
								</div>
							)
						})
				}
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
