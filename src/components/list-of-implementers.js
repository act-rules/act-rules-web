import React from 'react'
import PropTypes from 'prop-types'

import getHyphenatedString from '../../utils/get-hyphenated-string'

import Note from './note'

const ListOfImplementers = ({ implementers = [], cls = `compact`, ruleId = `` }) => {
	if (!implementers || !implementers.length) {
		return (
			<Note cls={``} title={`No Implementations`} body={`Implementation reports are not provided for this rule.`} />
		)
	}

	return (
		<table className={cls}>
			<thead>
				<tr>
					<th>Organisation</th>
					<th>Tool Name</th>
					<th>Report</th>
				</tr>
			</thead>
			<tbody>
				{implementers.map(({ organisation, toolName }) => {
					const filename = getHyphenatedString(toolName)
					const reportUrl = ruleId ? `/implementation/${filename}#${ruleId}` : `/implementation/${filename}`
					return (
						<tr key={toolName}>
							<td>{toolName}</td>
							<td>{organisation}</td>
							<td>
								<a href={reportUrl}>View Report</a>
							</td>
						</tr>
					)
				})}
			</tbody>
		</table>
	)
}

ListOfImplementers.propTypes = {
	implementers: PropTypes.array.isRequired,
	cls: PropTypes.string,
	ruleId: PropTypes.string,
}

export default ListOfImplementers
