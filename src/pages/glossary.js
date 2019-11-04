import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout/'
import SEO from '../components/seo'
import { getGlossaryUsageInRules } from './../utils/render-fragments'
import glossaryUsages from './../../_data/glossary-usages.json'

export default ({ data, location }) => {
	const { glossaryData } = data
	const { edges } = glossaryData

	return (
		<Layout location={location}>
			<SEO title="Glossary" />
			<section className="page-container page-glossary">
				<h1>Glossary</h1>
				<section className="listing">
					{edges.map(({ node }) => {
						const { frontmatter, html } = node
						const { key } = frontmatter
						const usedInRules = glossaryUsages[`#${key}`]
						return (
							<article key={key}>
								<section>
									<Link id={key} to={`#${key}`}>
										<h2>{frontmatter.title}</h2>
									</Link>
									<i>key: {key}</i>
									<div dangerouslySetInnerHTML={{ __html: html }} />
								</section>
								{getGlossaryUsageInRules(usedInRules)}
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
