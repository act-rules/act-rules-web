import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import './logo.scss'

const Logo = props => {
	const { name, navigateTo } = props
	return (
		<div className="appLogo">
			<Link to={navigateTo}>
				<h1>{name}</h1>
			</Link>
		</div>
	)
}

Logo.propTypes = {
	name: PropTypes.string,
	navigateTo: PropTypes.string,
}

Logo.defaultProps = {
	name: ``,
	navigateTo: ``,
}

export default Logo
