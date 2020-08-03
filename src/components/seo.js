/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

function SEO({ title, lang = 'en' }) {
	const { getSiteMetaData } = useStaticQuery(
		graphql`
			query {
				getSiteMetaData: site {
					siteMetadata {
						actRulesPackage
					}
				}
			}
		`
	)

	const {
		siteMetadata: { actRulesPackage },
	} = getSiteMetaData
	const { author, description, keywords } = JSON.parse(actRulesPackage)

	const metaKeywords =
		keywords.length > 0
			? {
					name: `keywords`,
					content: keywords.join(`, `),
			  }
			: []

	const metaTags = [
		{ name: `description`, content: description },
		{ property: `og:title`, content: author.name },
		{ property: `og:description`, content: description },
		{ property: `og:type`, content: `website` },
	].concat(metaKeywords)

	return (
		<Helmet title={`${title} | ${author.name}`} meta={metaTags}>
			{/* html attributes */}
			<html lang={lang} />
			{/* Busting cache as advised by Gatsby  */}
			<meta httpEquiv="Cache-Control" content="public, max-age=0, must-revalidate" />
			<meta httpEquiv="Pragma" content="no-cache" />
			<meta httpEquiv="Expires" content="0" />
		</Helmet>
	)
}

export default SEO
