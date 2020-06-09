import React from 'react'
import PropTypes from 'prop-types'

const ListWithHeading = ({ cls, headingTemplate, itemTemplate, items = [] }) => {
	return (
		<div className={cls}>
			{/* title  */}
			{headingTemplate()}
			{/* when there are no items, show a no data note  */}
			{(!items || !items.length) && <div className="note">No Data</div>}
			{/* render items if they exist  */}
			{items.length > 0 && <ul>{items.map(item => itemTemplate(item))}</ul>}
		</div>
	)
}

ListWithHeading.propTypes = {
	cls: PropTypes.string,
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
