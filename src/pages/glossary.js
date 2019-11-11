import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Layout from '../components/layout/'
import SEO from '../components/seo'
import glossaryUsages from './../../_data/glossary-usages.json'
import ListWithHeading from '../components/list-with-heading'

export default ({ data, location }) => {
	const { glossaryData } = data
	const { edges } = glossaryData

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
