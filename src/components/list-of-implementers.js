import React from 'react'
import PropTypes from 'prop-types'
import getHyphenatedString from '../../utils/get-hyphenated-string'

const ListOfImplementers = ({ items = [], type = ``, ruleId = `` }) => {
	return (
		<table className={type}>
			<thead>
				<tr>
					<th>Organisation</th>
					<th>Tool Name</th>
					<th>Report</th>
				</tr>
			</thead>
			<tbody>
				{items.map(({ organisation, toolName }) => {
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
	items: PropTypes.array.isRequired,
	type: PropTypes.string,
	ruleId: PropTypes.string,
}

export default ListOfImplementers
