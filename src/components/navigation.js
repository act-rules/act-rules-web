import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql, Link } from 'gatsby'
import ReactMedia from 'react-media'

import Logo from './logo'

import './navigation.scss'

const Navigation = ({ name, navigateTo, isMenuShown, onToggleMenu }) => {
	const data = useStaticQuery(
		graphql`
			query {
				getTopLevelNavigation: allSitePage(
					sort: { fields: [context___title], order: ASC }
					filter: { path: { regex: "/^((?!examples).)*$/" }, context: { markdownType: { eq: "default" } } }
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

	const { getTopLevelNavigation, getNonRulesNavigation } = data

	return (
		<aside className={classnames('navigation', { hide: !isMenuShown })}>
			{/* hide menu when width <= 600px */}
			<ReactMedia queries={{ small: '(max-width: 599px)' }} onChange={matches => onToggleMenu(!matches.small)} />
			{/* Logo  */}
			<Logo name={name} navigateTo={navigateTo} />
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
	name: PropTypes.string.isRequired,
	navigateTo: PropTypes.string.isRequired,
	isMenuShown: PropTypes.bool.isRequired,
	onToggleMenu: PropTypes.func.isRequired,
}

Logo.defaultProps = {
	name: ``,
	navigateTo: ``,
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
