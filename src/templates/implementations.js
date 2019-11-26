import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import ListOfImplementers from '../components/list-of-implementers'

import implementers from './../../_data/implementers'

import './implementations.scss'

const Implementations = ({ location, data }) => {
	const { html, frontmatter } = data.markdownRemark

	return (
		<Layout location={location}>
			<SEO title={frontmatter.title} />
			<section className="page-implementations">
				<h1>{frontmatter.title}</h1>

				{/* Inject list of implementations table  */}
				<section>
					<h2>Implementation Overview</h2>
					<ListOfImplementers implementers={implementers} />
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
