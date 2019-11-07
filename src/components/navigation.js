import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql, Link } from 'gatsby'
import ReactMedia from 'react-media'

import Logo from './logo'

const Navigation = props => {
	const data = useStaticQuery(
		graphql`
			query {
				getTopLevelNavigation: allSitePage(
					sort: { fields: [context___title], order: ASC }
					filter: { context: { markdownType: { eq: "default" } } }
				) {
					group(field: context___markdownType) {
						fieldValue
						totalCount
						edges {
							node {
								path
								context {
									sourceInstanceName
									title
									markdownType
								}
							}
						}
					}
				}
				getNonRulesNavigation: allSitePage(
					sort: { fields: [context___title], order: ASC }
					filter: { context: { markdownType: { nin: ["default", "rules", "glossary"] } } }
				) {
					group(field: context___markdownType) {
						fieldValue
						totalCount
						edges {
							node {
								path
								context {
									title
									markdownType
								}
							}
						}
					}
				}
			}
		`
	)

	const { logoName, logoNavigateTo } = props
	const { getTopLevelNavigation, getNonRulesNavigation } = data

	const [isMenuShown, setIsMenuShown] = useState(true)
	const onMediaQueryChange = matches => setIsMenuShown(!matches.small)

	return (
		<aside className={isMenuShown ? 'show' : 'hide'}>
			{/* hide menu when width <= 600px */}
			<ReactMedia queries={{ small: '(max-width: 599px)' }} onChange={onMediaQueryChange} />
			{/* toggle menu  */}
			<button
				className="nav-hide-show-menu"
				onClick={e => {
					e.preventDefault()
					setIsMenuShown(!isMenuShown)
				}}
			>
				☰
			</button>
			{/* Logo  */}
			<Logo name={logoName} navigateTo={logoNavigateTo} />
			{/* Nav  */}
			<nav className="navigation">
				<ul>
					{/* Top level Navigation */}
					{getTopLevelNavigation.group.map(({ edges }) => getListItems(edges))}
					<li>
						<hr />
					</li>
					{/* Rules */}
					<li key="rules">
						<Link to="/rules/" activeClassName="active">
							Rules
						</Link>
					</li>
					{/* Glossary */}
					<li key="glossary">
						<Link to="/glossary/" activeClassName="active">
							Glossary
						</Link>
					</li>
					<li>
						<hr />
					</li>
					{/* Other Navigation */}
					{getNonRulesNavigation.group.map((item, index) => {
						const { totalCount, edges, fieldValue } = item
						if (totalCount <= 0) {
							return null
						}
						const groupKey = `${fieldValue}-${index}`
						return (
							<li key={groupKey}>
								<p className="parent-item">{fieldValue}</p>
								<ul>{getListItems(edges)}</ul>
								<hr />
							</li>
						)
					})}
				</ul>
			</nav>
		</aside>
	)
}

Navigation.propTypes = {
	logoName: PropTypes.string.isRequired,
	logoNavigateTo: PropTypes.string.isRequired,
}

Logo.defaultProps = {
	logoName: ``,
	logoNavigateTo: ``,
}

export default Navigation

/**
 * Given an arrray of items, get list items to render
 * @param {Object[]} items array of items to be rendered as menu items
 */
function getListItems(items) {
	return items.map(({ node }) => {
		const { path, context } = node
		if (!context || !context.title) {
			return null
		}

		const key = `${context.title}${path}`
		return (
			<li key={key}>
				<Link activeClassName="active" to={path}>
					{context.title}
				</Link>
			</li>
		)
	})
}
