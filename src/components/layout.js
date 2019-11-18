import React, { useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import Navigation from './navigation'
import Footer from './footer'

import 'normalize.css'
import './layout.scss'

const Layout = ({ children, location }) => {
	const data = useStaticQuery(
		graphql`
			query {
				getSiteTitle: site {
					siteMetadata {
						actRulesPackage
					}
				}
			}
		`
	)

	useLayoutEffect(() => {
		/**
		 * Scroll to anchor if specified
		 */
		if (!location || !location.hash) {
			return
		}
		const el = document.querySelector(location.hash)
		if (!el) {
			return
		}
		el.scrollIntoView()
	})

	const { getSiteTitle } = data
	const { author, repository } = JSON.parse(getSiteTitle.siteMetadata.actRulesPackage)
	const { url: actRulesRepoUrl } = repository

	return (
		<section className="layout-container">
			{/* side bar navigation  */}
			<Navigation logoName={author.name} logoNavigateTo={'/pages/about'} />
			{/* main content  */}
			<main>
				<section>{children}</section>
				<Footer actRulesRepoUrl={actRulesRepoUrl} />
			</main>
		</section>
	)
}

Layout.propTypes = {
	children: PropTypes.node.isRequired,
}

export default Layout
