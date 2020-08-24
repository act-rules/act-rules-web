import React from 'react'
import PropTypes from 'prop-types'
import { getAcknowledgements } from '../rule/get-acknowledgements'

/**
 * Component to render [key,value] pairs, where
 * - `key` is a string
 * - `value` is an array of items
 *
 * This is usually derived from a rule frontmatter, structure of which is as below:
 * acknowledgements:
 *   authors:
 *     - Jey Nandakumar
 *   previous_authors:
 *     - Annika Nietzio
 *
 * @param {Object} props Props
 */
const Acknowledgments = ({ scrollLinkId, items, contributors }) => {
	const acknowledgements = getAcknowledgements(items, contributors)
	return (
		<>
			<a id={scrollLinkId} href={`#${scrollLinkId}`}>
				<h2>Acknowledgments</h2>
			</a>
			{acknowledgements.map(({ title, items }) => {
				if (!items || !items.length) {
					return null
				}

				return (
					<div className="meta" key={title}>
						<h3 className="heading">{title}</h3>
						<ul>
							{items.map(({ text, url }) => (
								<AcknItem url={url} text={text} key={text} />
							))}
						</ul>
					</div>
				)
			})}
		</>
	)
}

Acknowledgments.propTypes = {
	scrollLinkId: PropTypes.string.isRequired,
	items: PropTypes.object.isRequired,
	contributors: PropTypes.array.isRequired,
}

Acknowledgments.defaultProps = {
	scrollLinkId: ``,
	items: {
		authors: [],
		previous_authors: [],
		reviewers: [],
	},
	contributors: [],
}

function AcknItem({ text, url }) {
	if (!url) {
		return <li>{text}</li>
	}

	return (
		<li>
			<a className="sc-item block" target="_blank" rel="noopener noreferrer" href={url}>
				{text}
			</a>
		</li>
	)
}

export default Acknowledgments
