import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import RuleCard from '../components/rule-card'

import './rules.scss'

export default ({ location, data }) => {
	const { rules, allRules } = data

	return (
		<Layout location={location}>
			<SEO title="Rules" />
			<section className="page-rules">
				{/* Heading */}
				<h1>Rules</h1>
				{/* Table of rules */}
				<section>
					{rules.edges.map(({ node }) => {
						const { frontmatter, fields } = node
						return (
							<RuleCard
								key={frontmatter.id}
								id={frontmatter.id}
								name={frontmatter.name}
								description={frontmatter.description}
								accessibilityRequirements={JSON.parse(fields.fastmatterAttributes).accessibility_requirements}
								inputRules={frontmatter.input_rules}
								allRules={allRules}
							/>
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
						id
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
