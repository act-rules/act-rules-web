import React from 'react'
import PropTypes from 'prop-types'

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
const Acknowledgements = ({ scrollLinkId, items, contributors }) => {
	return (
		<>
			<a id={scrollLinkId} href={`#${scrollLinkId}`}>
				<h2>Acknowledgements</h2>
			</a>
			{Object.keys(items).map(key => {
				const values = items[key] || []
				const heading = key.split('_').join(' ')

				if (!values || !values.length) {
					return null
				}
				return (
					<div className="meta" key={key}>
						<h3 className="heading">{heading}</h3>
						<ul>
							{values.map(value => {
								const data = contributors.find(({ name }) => name.toLowerCase() === value.toLowerCase())
								if (!data) {
									console.warn(`${data}, not in contributor list.`)
									return null
								}
								return (
									<li key={data.name}>
										<a className="sc-item block" target="_blank" rel="noopener noreferrer" href={data.url}>
											{data.name}
										</a>
									</li>
								)
							})}
						</ul>
					</div>
				)
			})}
		</>
	)
}

Acknowledgements.propTypes = {
	scrollLinkId: PropTypes.string.isRequired,
	items: PropTypes.object.isRequired,
	contributors: PropTypes.array.isRequired,
}

Acknowledgements.defaultProps = {
	scrollLinkId: ``,
	items: {
		authors: [],
		previous_authors: [],
		reviewers: [],
	},
	contributors: [],
}

export default Acknowledgements
