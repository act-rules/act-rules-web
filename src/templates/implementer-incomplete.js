import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import ListOfImplementations from '../components/list-of-implementations'
import { filterByConsistency } from './implementer'
import AccessibilityRequirements from '../components/accessibility_requirements'
import RuleHeader from '../components/rule-header'
import Badge from '../components/badge'

import './implementer-incomplete.scss'

const ImplementerIncomplete = ({ location, data }) => {
	const { implementerData } = data.sitePage.context
	const { organisation, toolName, actMapping, description } = JSON.parse(implementerData)

	const title = `Incomplete implementations report of ${toolName} (${organisation})`
	const completeMaps = filterByConsistency(actMapping, ['consistent', 'partially-consistent'])
	const incompleteMaps = filterByConsistency(actMapping, ['inconsistent'])

	return (
		<Layout location={location}>
			<SEO title={title} />
			<section className="page-implementer-incomplete">
				{/* title  */}
				<h1>{title}</h1>
				{/* desc  */}
				{description && <p>{description}</p>}
				{/* impl  */}
				{data.allRules.edges.map(({ node }) => {
					const {
						frontmatter: { id, name, rule_type },
						fields: { fastmatterAttributes },
					} = node
					const { accessibility_requirements } = JSON.parse(fastmatterAttributes)
					const ruleScs = Object.keys(accessibility_requirements || {})
						.filter(key => key.includes('wcag20') || key.includes('wcag21'))
						.map(key => key.split(':').pop())
						.map(sc => 'wcag' + sc.replace(/\./g, ''))
					const completeImpl = completeMaps.find(({ ruleId }) => ruleId === id)
					const impl = incompleteMaps.find(({ ruleId }) => ruleId === id)

					if (completeImpl) {
						return null
					}

					/**
					 * When there is no complete implementation & SC's are not WCAG, list the accessibility requirements
					 */
					if (!ruleScs.length) {
						return (
							<div className="cardItem" key={id} data-rule-id={id}>
								<RuleHeader ruleId={id} ruleName={name}>
									<Badge title={`Id:`} value={id} />
									<Badge title={`Type:`} value={rule_type} />
								</RuleHeader>
								<AccessibilityRequirements accessibility_requirements={accessibility_requirements} type="text" />
							</div>
						)
					}

					if (!impl) {
						return (
							<div className="cardItem" key={id} data-rule-id={id}>
								<RuleHeader ruleId={id} ruleName={name}>
									<Badge title={`Id:`} value={id} />
									<Badge title={`Type:`} value={rule_type} />
								</RuleHeader>
								<AccessibilityRequirements accessibility_requirements={accessibility_requirements} type="text" />
							</div>
						)
					}

					/**
					 * show incomplete implementation tabulation
					 */
					return (
						<div className="cardItem" key={id} data-rule-id={id}>
							<RuleHeader ruleId={id} ruleName={name}>
								<Badge title={`Id:`} value={id} />
								<Badge title={`Type:`} value={rule_type} />
								<Badge title={`Consistency:`} value={impl.consistency} />
							</RuleHeader>
							<ListOfImplementations mapping={[impl]} showIncomplete={true} />
						</div>
					)
				})}
			</section>
		</Layout>
	)
}

export default ImplementerIncomplete

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
