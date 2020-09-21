import './glossary.scss'
import React, { useState } from 'react'
import classnames from 'classnames'
import { graphql, useStaticQuery } from 'gatsby'
import ReactMedia from 'react-media'
import Layout from '../components/layout'
import SEO from '../components/seo'
import ListWithHeading from '../components/list-with-heading'
import showdown from 'showdown'
import { getRulesForGlossaryKey } from '../utils/get-rules-for-glossary-key'
const converter = new showdown.Converter()

const Glossary = ({ location }) => {
	const { glossaryData, allRules } = useStaticQuery(
		graphql`
			query {
				glossaryData: allMarkdownRemark(
					sort: { fields: [frontmatter___title], order: ASC }
					filter: { fields: { markdownType: { eq: "glossary" } } }
				) {
					edges {
						node {
							id
							html
							frontmatter {
								title
								key
							}
							fields {
								markdownType
							}
							excerpt
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
	)

	const [viewportSize, setViewportSize] = useState(``)
	const onMediaQueryChange = matches => {
		if (matches.small) {
			return setViewportSize(`sm`)
		}

		if (matches.medium) {
			return setViewportSize(`md`)
		}

		return setViewportSize(`lg`)
	}

	return (
		<Layout location={location}>
			<ReactMedia
				queries={{
					small: '(max-width: 599px)',
					medium: '(min-width: 600px) and (max-width: 1199px)',
					large: '(min-width: 1200px)',
				}}
				onChange={onMediaQueryChange}
			/>
			<SEO title="Glossary" />
			<section className="page-glossary">
				<h1>Glossary</h1>
				<section className={classnames('listing', viewportSize)}>
					{glossaryData.edges.map(({ node }) => {
						const { frontmatter, html } = node
						const ruleIdsUsingGlossaryKey = getRulesForGlossaryKey(`#${frontmatter.key}`)
						const items = allRules.edges.filter(rule => ruleIdsUsingGlossaryKey.includes(rule.node.frontmatter.id))
						return (
							<article key={frontmatter.key}>
								{/* glossary item  */}
								<section>
									<a id={frontmatter.key} href={`#${frontmatter.key}`}>
										<h2>{frontmatter.title}</h2>
									</a>
									<div dangerouslySetInnerHTML={{ __html: html }} />
								</section>
								{/* list of rules using glossary item  */}
								<ListWithHeading
									cls={`used-rules`}
									headingTemplate={() => <h3>Used In Rules: ({items ? items.length : '0'})</h3>}
									itemTemplate={item => (
										<li key={item.node.frontmatter.id}>
											<a href={`/rules/${item.node.frontmatter.id}`}>
												<span
													dangerouslySetInnerHTML={{
														__html: converter.makeHtml(item.node.frontmatter.name),
													}}
												/>
											</a>
										</li>
									)}
									items={items}
								/>
							</article>
						)
					})}
				</section>
			</section>
		</Layout>
	)
}

export default Glossary
