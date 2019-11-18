import React from 'react'
import PropTypes from 'prop-types'

const Note = ({ cls = ``, title = ``, body = `` }) => {
	return (
		<div className={cls}>
			<b>{title}</b>
			<br />
			{body}
		</div>
	)
}

Note.propTypes = {
	cls: PropTypes.string,
	title: PropTypes.string.isRequired,
	body: PropTypes.string.isRequired,
}

export default Note
