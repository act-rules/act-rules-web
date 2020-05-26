import React from 'react'
import PropTypes from 'prop-types'

const ListWithHeading = ({ cls, headingTemplate, itemKey, itemTemplate, items = [] }) => {
	return (
		<div className={cls}>
			{/* title  */}
			{headingTemplate()}
			{/* when there are no items, show a no data note  */}
			{(!items || !items.length) && <div className="note">No Data</div>}
			{/* render items if they exist  */}
			{items.length > 0 && (
				<ul>
					{items.map(item => (
						<li key={item[itemKey]}>{itemTemplate(item)}</li>
					))}
				</ul>
			)}
		</div>
	)
}

ListWithHeading.propTypes = {
	cls: PropTypes.string,
	itemKey: PropTypes.string,
	headingTemplate: PropTypes.func.isRequired,
	itemTemplate: PropTypes.func.isRequired,
	items: PropTypes.array,
}

ListWithHeading.defaultProps = {
	cls: ``,
	heading: ``,
	items: [],
}

export default ListWithHeading
