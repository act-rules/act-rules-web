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
	const preferredAcknowledgementsOrder = ['authors', 'previous_authors', 'reviewers', 'funding']

	const otherItems = Object.keys(items).reduce((out, key) => {
		if (!preferredAcknowledgementsOrder.includes(key)) {
			out[key] = items[key]
		}
		return out
	}, {})

	const curatedItems = {
		Authors: items['authors'],
		'Previous Authors': items['previous_authors'],
		Reviewers: items['reviewers'],
		funding: items['funding'],
		...otherItems,
	}

	return (
		<>
			<a id={scrollLinkId} href={`#${scrollLinkId}`}>
				<h2>Acknowledgements</h2>
			</a>
			{Object.keys(curatedItems).map(key => {
				const values = curatedItems[key] || []

				if (!values || !values.length) {
					return null
				}
				return (
					<div className="meta" key={key}>
						<h3 className="heading">{key.split('_').join(' ')}</h3>
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
