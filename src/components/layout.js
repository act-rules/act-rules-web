import React, { useLayoutEffect, useState } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import Navigation from './navigation'
import Header from './header'

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

	const [isMenuShown, setIsMenuShown] = useState(true)
	const onToggleMenu = (value = false) => setIsMenuShown(value || !isMenuShown)

	return (
		<section className={classnames('layoutContainer', { hasMenu: isMenuShown })}>
			<Navigation
				logoName={author.name}
				logoNavigateTo={'/pages/about'}
				isMenuShown={isMenuShown}
				onToggleMenu={onToggleMenu}
			/>
			<main>
				<Header actRulesRepoUrl={actRulesRepoUrl} onToggleMenu={onToggleMenu} />
				<section>{children}</section>
			</main>
		</section>
	)
}

Layout.propTypes = {
	children: PropTypes.node.isRequired,
}

export default Layout
