import React, { useLayoutEffect, useState } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import ReactMedia from 'react-media'

import Navigation from './navigation'
import Header from './header'
import Footer from './footer'

import curateGitUrl from '../../utils/curate-git-url'

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
	const repositoryUrl = curateGitUrl(repository.url)

	const [isMenuShown, setIsMenuShown] = useState(true)
	const onToggleMenu = (value = false) => setIsMenuShown(value || !isMenuShown)

	return (
		<section className={classnames('layoutContainer', { hasMenu: isMenuShown })}>
			<Navigation
				name={author.name}
				navigateTo={'/pages/about'}
				isMenuShown={isMenuShown}
				onToggleMenu={onToggleMenu}
			/>
			<main>
				<Header
					name={author.name}
					navigateTo={'/pages/about'}
					actRulesRepoUrl={repositoryUrl}
					isMenuShown={isMenuShown}
					onToggleMenu={onToggleMenu}
				/>
				<section>{children}</section>

				{/* hide footer when width <= 600px */}
				<ReactMedia queries={{ small: '(max-width: 599px)' }}>
					{matches => {
						if (!matches || matches.small) {
							return null
						}
						return <Footer actRulesRepoUrl={repositoryUrl} />
					}}
				</ReactMedia>
			</main>
		</section>
	)
}

Layout.propTypes = {
	children: PropTypes.node.isRequired,
}

export default Layout
