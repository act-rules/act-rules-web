import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDebounce } from 'react-use'

import './rules-filter.scss'

const RulesFilter = ({ onFilter, debounceTime = 400, minimumFilterTextLength = 3 }) => {
	const [filterText, setFilterText] = useState(``)

	useDebounce(
		() => {
			if (filterText.length < minimumFilterTextLength) {
				return
			}
			onFilter(filterText)
		},
		debounceTime,
		[filterText]
	)

	return (
		<form onSubmit={e => e.preventDefault()} className="rulesFilter">
			<div className="filterTextInputGroup">
				<label htmlFor="filterTextInput">Filter Rules:</label>
				<input
					id="filterTextInput"
					type="text"
					placeholder={`Enter more than ${minimumFilterTextLength} characters...`}
					value={filterText}
					onChange={e => {
						e.preventDefault()
						setFilterText(e.target.value)
					}}
				/>
				<small>Supports id, name, description or type</small>
			</div>
		</form>
	)
}

RulesFilter.propTypes = {
	debounceTime: PropTypes.number,
	onFilter: PropTypes.func.isRequired,
	minimumFilterTextLength: PropTypes.number,
}

export default RulesFilter
