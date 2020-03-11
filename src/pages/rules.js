import React, { useState } from 'react'
import { graphql } from 'gatsby'
import classnames from 'classnames'
import ReactMedia from 'react-media'

import Layout from '../components/layout'
import SEO from '../components/seo'
import RuleCard from '../components/rule-card'
import FuzzySearch from 'fuzzy-search'
import RulesFilter from '../components/rules-filter'

import './rules.scss'

export default ({ location, data }) => {
	const { rules, allRules } = data

	const [isSmallViewport, setIsSmallViewport] = useState(false)
	const [renderedRules, setRenderedRules] = useState(rules.edges)

	const minimumFilterTextLength = 3
	const onFilter = value => {
		if (value.length < minimumFilterTextLength) {
			setRenderedRules(rules.edges)
			return
		}
		const fuzzy = new FuzzySearch(rules.edges, [
			'node.frontmatter.id',
			'node.frontmatter.name',
			'node.frontmatter.description',
			'node.frontmatter.rule_type',
		])
		const results = fuzzy.search(value)
		setRenderedRules(results)
	}

	return (
		<Layout location={location}>
			<ReactMedia queries={{ small: '(max-width: 599px)' }} onChange={matches => setIsSmallViewport(matches.small)} />
			<SEO title="Rules" />
			<section className={classnames(`page-rules`, { sm: isSmallViewport })}>
				{/* title and filter  */}
				<header className="titleAndFilter">
					<h1>Rules</h1>
					{/* filter input  */}
					<RulesFilter onFilter={onFilter} minimumFilterTextLength={minimumFilterTextLength} />
				</header>
				{/* Rules list */}
				<section className="content">
					{renderedRules
						.sort((a, b) => {
							/**
							 * Remove markdown backticks for sort comparison
							 */
							const nameOfA = a.node.frontmatter.name.replace(/`/g, '').toLowerCase()
							const nameOfB = b.node.frontmatter.name.replace(/`/g, '').toLowerCase()
							// Reference - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
							return nameOfA.localeCompare(nameOfB)
						})
						.map(({ node }) => {
							const { frontmatter, fields } = node
							return (
								<RuleCard
									key={frontmatter.id}
									id={frontmatter.id}
									name={frontmatter.name}
									type={frontmatter.rule_type}
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
