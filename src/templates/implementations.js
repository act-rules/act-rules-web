import React from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import SEO from '../components/seo'
import implementers from './../../_data/implementers'
import { getImplementationsTabulation } from './../utils/render-fragments'

export default ({ location, data }) => {
	const { markdownRemark } = data
	const { html, frontmatter } = markdownRemark

	return (
		<Layout location={location}>
			<SEO title={frontmatter.title} />
			<section className="page-container">
				<h1>{frontmatter.title}</h1>
				<section>
					<h2>Implementation Overview</h2>
					{getImplementationsTabulation(implementers)}
				</section>
				<div dangerouslySetInnerHTML={{ __html: html }} />
			</section>
		</Layout>
	)
}

export const query = graphql`
	query($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			html
			frontmatter {
				title
			}
		}
	}
`
