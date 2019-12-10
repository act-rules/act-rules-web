import React, { useState } from 'react'

const RulesFilter = props => {
	const [value, setValue] = useState(``)

	return (
		<form
			onSubmit={e => {
				e.preventDefault()
			}}
		>
			<input
				type="text"
				value={value}
				onChange={e => {
					e.preventDefault()
					setValue(e.target.value)
					props.onFilter(value)
				}}
			/>
		</form>
	)
}

export default RulesFilter
