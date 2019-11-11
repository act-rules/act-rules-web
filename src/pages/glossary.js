import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Layout from '../components/layout/'
import SEO from '../components/seo'
import glossaryUsages from './../../_data/glossary-usages.json'
import ListWithHeading from '../components/list-with-heading'

const Glossary = ({ location }) => {
	const { glossaryData } = useStaticQuery(
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
			}
		`
	)

	return (
		<Layout location={location}>
			<SEO title="Glossary" />
			<section className="page-container page-glossary">
				<h1>Glossary</h1>
				<section className="listing">
					{glossaryData.edges.map(({ node }) => {
						const { frontmatter, html } = node

						return (
							<article key={frontmatter.key}>
								<section>
									<a id={frontmatter.key} href={`#${frontmatter.key}`}>
										<h2>{frontmatter.title}</h2>
									</a>
									<i>key: {frontmatter.key}</i>
									<div dangerouslySetInnerHTML={{ __html: html }} />
								</section>
								<ListWithHeading
									cls={`used-rules`}
									heading={`Used In Rules`}
									items={glossaryUsages[`#${frontmatter.key}`]}
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
