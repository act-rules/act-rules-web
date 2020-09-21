import React from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import SEO from '../components/seo'

import './default.scss'

export default ({ location, data }) => {
	const { markdownRemark, site, glossaryData } = data
	const {
		www: { url },
	} = JSON.parse(site.siteMetadata.actRulesPackage)
	const { html, frontmatter } = markdownRemark

	const linkUpGlossaryTerms = (content, data) => {
		if (!data) {
			return content
		}
		const baseUrl = process.env.NODE_ENV === `development` ? window.location.origin : url
		return content.replace(/href="#(.*?)"/g, (match, key) => {
			const glossaryKey = `#${key.toLowerCase()}`
			if (!Object.keys(data).includes(glossaryKey)) {
				return match
			}

			const value = data[glossaryKey]
			if (typeof value === 'undefined') {
				return match
			}

			return `href=" ${baseUrl}/${value}"`
		})
	}

	const glossaryPaths = glossaryData.edges.reduce((out, { node }) => {
		const {
			frontmatter: { key },
		} = node
		out[key] = `glossary/#${key}`
		return out
	}, {})

	return (
		<Layout location={location}>
			<SEO title={frontmatter.title} />
			<section className="page-default">
				<h1>{frontmatter.title}</h1>
				<div
					dangerouslySetInnerHTML={{
						__html: linkUpGlossaryTerms(html, glossaryPaths),
					}}
				/>
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
		site {
			siteMetadata {
				actRulesPackage
			}
		}
	}
`
