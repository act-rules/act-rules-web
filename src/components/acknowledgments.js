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
const Acknowledgments = ({ scrollLinkId, items, contributors }) => {
	const preferredAcknowledgmentsOrder = ['authors', 'previous_authors', 'reviewers', 'funding']

	const otherItems = Object.keys(items).reduce((out, key) => {
		if (!preferredAcknowledgmentsOrder.includes(key)) {
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
				<h2>Acknowledgments</h2>
			</a>
			{Object.entries(curatedItems).map(([key, values]) => {
				if (!values || !values.length) {
					return null
				}

				const heading = key.split('_').join(' ')
				return (
					<div className="meta" key={key}>
						<h3 className="heading">{heading}</h3>
						<ul>
							{values.map(value => {
								// only if acknowledgement is of type authors, get author name & url from contributors
								if (['Previous Authors', 'Authors'].includes(key)) {
									const contributor = contributors.find(({ name }) => name.toLowerCase() === value.toLowerCase())
									if (!contributor) {
										console.warn(`${value}, not in contributor list.`)
										return <li key={value}>{value}</li>
									}
									return (
										<li key={contributor.name}>
											<a className="sc-item block" target="_blank" rel="noopener noreferrer" href={contributor.url}>
												{contributor.name}
											</a>
										</li>
									)
								}
								return <li key={value}>{value}</li>
							})}
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

export default Acknowledgments
