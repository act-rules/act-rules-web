import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import './note.scss'

const Note = ({ cls = '', title = '', body = '' }) => {
	return (
		<div className={classnames('note', cls)}>
			<b>{title}</b>
			<p>{body}</p>
		</div>
	)
}

Note.propTypes = {
	cls: PropTypes.string,
	title: PropTypes.string.isRequired,
	body: PropTypes.string.isRequired,
}

export default Note
