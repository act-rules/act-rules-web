import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import showdown from 'showdown'
import { getInputRulesForRule } from './../utils/render-fragments'
import AccessibilityRequirements from '../components/accessibility_requirements'
import CountImplementations from '../components/count-implementations'

export default ({ location, data }) => {
	const { rules, allRules } = data
	const converter = new showdown.Converter()

	return (
		<Layout location={location}>
			<SEO title="Rules" />
			<section className="page-container page-rules">
				{/* Heading */}
				<h1>Rules</h1>
				{/* Table of rules */}
				<section className="rules-listing">
					{rules.edges.map(({ node }) => {
						const { frontmatter, id, fields } = node
						const { name, description, input_rules } = frontmatter
						const { slug, fastmatterAttributes } = fields
						const { accessibility_requirements } = JSON.parse(fastmatterAttributes)
						return (
							<article key={id}>
								<section>
									{/* rule id */}
									<a href={slug.replace('rules/', '')}>
										<h2
											dangerouslySetInnerHTML={{
												__html: converter.makeHtml(name),
											}}
										/>
									</a>
									{/* rule sc's */}
									<AccessibilityRequirements accessibility_requirements={accessibility_requirements} type="text" />
									{/* input rules */}
									{getInputRulesForRule(input_rules, allRules.edges, true)}
									{/* implementation count */}
									<CountImplementations ruleId={slug.replace('rules/', '')} />
									{/* rule description */}
									<div
										dangerouslySetInnerHTML={{
											__html: converter.makeHtml(description),
										}}
									/>
								</section>
							</article>
						)
					})}
				</section>
			</section>
		</Layout>
	)
}

export const query = graphql`
	query {
		rules: allMarkdownRemark(
			sort: { fields: [frontmatter___name], order: ASC }
			filter: { fields: { markdownType: { eq: "rules" } } }
		) {
			totalCount
			edges {
				node {
					fileAbsolutePath
					id
					frontmatter {
						name
						description
						rule_type
						input_rules
					}
					fields {
						markdownType
						fastmatterAttributes
						slug
					}
				}
			}
		}
		allRules: allMarkdownRemark(filter: { fields: { markdownType: { eq: "rules" } } }) {
			totalCount
			edges {
				node {
					fields {
						fileName {
							relativePath
						}
						markdownType
						slug
					}
					frontmatter {
						id
						name
					}
				}
			}
		}
	}
`
