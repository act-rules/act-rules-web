import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Note from '../components/note'
import ListOfImplementations from '../components/list-of-implementations'
import { filterByConsistency } from './implementer'
import AccessibilityRequirements from '../components/accessibility_requirements'
import RuleHeader from '../components/rule-header'
import Badge from '../components/badge'

import './implementer-incomplete.scss'

const ImplementerIncomplete = ({ location, data }) => {
	const { title, implementerData } = data.sitePage.context
	const { actMapping } = JSON.parse(implementerData)
	const completeMaps = filterByConsistency(actMapping, ['consistent', 'partially-consistent'])
	const incompleteMaps = filterByConsistency(actMapping, ['inconsistent'])

	if (!incompleteMaps.length) {
		return (
			<Layout location={location}>
				<SEO title={title} />
				<section className="page-implementer-incomplete">
					<h1>{title}</h1>
					<Note cls={`valid`} title={`Well Done`} body={`All submitted implementation reports are complete.`} />
				</section>
			</Layout>
		)
	}

	return (
		<Layout location={location}>
			<SEO title={title} />
			<section className="page-implementer-incomplete">
				<h1>{title}</h1>
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

					if (completeImpl || !ruleScs.length) {
						return null
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
