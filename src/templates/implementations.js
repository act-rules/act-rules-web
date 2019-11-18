import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import ListOfImplementers from '../components/list-of-implementers'

import implementers from './../../_data/implementers'

const Implementations = ({ data }) => {
	const { html, frontmatter } = data.markdownRemark

	return (
		<Layout>
			<SEO title={frontmatter.title} />
			<section className="page-container">
				<h1>{frontmatter.title}</h1>

				{/* Inject list of implementations table  */}
				<section>
					<h2>Implementation Overview</h2>
					<ListOfImplementers items={implementers} />
				</section>

				{/* Render the rest of th page  */}
				<div dangerouslySetInnerHTML={{ __html: html }} />
			</section>
		</Layout>
	)
}

export default Implementations

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
