import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql, Link } from 'gatsby'
import ReactMedia from 'react-media'

import Navigation from '../navigation'
import Footer from '../footer'

import 'normalize.css'
import './index.scss'

class Layout extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			showMenu: true,
		}
	}

	componentDidMount() {
		const { hash } = window.location
		if (!hash) {
			return
		}
		const el = document.getElementById(hash)
		if (!el) {
			return
		}
		el.scrollIntoView()
	}

	handleHideShowMenu() {
		this.setState(prevState => ({
			showMenu: !prevState.showMenu,
		}))
	}

	getListItemFromEdges(edges) {
		return edges.map(edge => {
			const { node } = edge
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

	render() {
		const { children } = this.props
		return (
			<StaticQuery
				query={graphql`
					query {
						getSiteTitle: site {
							siteMetadata {
								actRulesPackage
							}
						}
					}
				`}
				render={data => {
					const { getSiteTitle } = data
					const {
						author,
						repository: { url: actRulesRepoUrl },
					} = JSON.parse(getSiteTitle.siteMetadata.actRulesPackage)
					return (
						<section className="layout-container">
							{/* hide menu when width <= 600px */}
							<ReactMedia
								query="(max-width: 600px)"
								onChange={matches => matches && this.state.showMenu && this.handleHideShowMenu()}
							/>
							{/* show menu when width > 600px */}
							<ReactMedia
								query="(min-width: 601px)"
								onChange={matches => matches && !this.state.showMenu && this.handleHideShowMenu()}
							/>
							{/* side bar navigation  */}
							<Navigation logoName={author.name} logoNavigateTo={'/pages/about'} />
							{/* main content  */}
							<main>
								<section>{children}</section>
								<Footer actRulesRepoUrl={actRulesRepoUrl} />
							</main>
						</section>
					)
				}}
			/>
		)
	}
}

Layout.propTypes = {
	children: PropTypes.node.isRequired,
}

export default Layout
