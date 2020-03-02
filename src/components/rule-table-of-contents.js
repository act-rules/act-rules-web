import React, { useState } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import ReactMedia from 'react-media'

import './rule-table-of-contents.scss'

const RuleTableOfContents = ({ toc }) => {
	const [isShown, setIsShown] = useState(true)

	return (
		<section className={classnames('tableOfContents', { hide: !isShown })}>
			<ReactMedia queries={{ large: '(min-width: 1200px)' }} onChange={matches => setIsShown(matches.large)} />
			<span role="heading" aria-level="1" className="heading">
				Table of Contents
			</span>
			<div dangerouslySetInnerHTML={{ __html: toc }} />
			<ul>
				<li>
					<a href="#glossary-listing">Glossary</a>
				</li>
				<li>
					<a href="#useful-links">Useful Links</a>
				</li>
				<li>
					<a href="#implementation-metrics">Implementations</a>
				</li>
				<li>
					<a href="#acknowledgments">Acknowledgments</a>
				</li>
			</ul>
		</section>
	)
}

RuleTableOfContents.propTypes = {
	toc: PropTypes.string.isRequired,
}

export default RuleTableOfContents
