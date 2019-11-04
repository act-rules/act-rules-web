import React from 'react'
import PropTypes from 'prop-types'

const ListWithHeading = props => {
	const { cls, heading, items = [] } = props
	return (
		<div className={cls}>
			{/* title  */}
			<h3>
				{heading} ({items.length}):
			</h3>
			{/* when there are no items, show a no data note  */}
			{(!items || !items.length) && <div className="note">No Data</div>}
			{/* render items if they exist  */}
			{items.length > 0 && (
				<ul>
					{items.map(usage => (
						<li key={usage.slug}>
							<a href={`/${usage.slug}`}>{usage.name}</a>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

ListWithHeading.propTypes = {
	cls: PropTypes.string,
	heading: PropTypes.string.isRequired,
	items: PropTypes.array,
}

ListWithHeading.defaultProps = {
	cls: ``,
	heading: ``,
	items: [],
}

export default ListWithHeading
