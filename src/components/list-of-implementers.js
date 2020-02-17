import React from 'react'
import PropTypes from 'prop-types'

import getHyphenatedString from '../../utils/get-hyphenated-string'

import Note from './note'

const ListOfImplementers = ({ implementers = [], cls = ``, ruleId }) => {
	if (!implementers.length) {
		return (
			<Note cls={``} title={`No Implementations`} body={`Implementation reports are not provided for this rule.`} />
		)
	}

	if (!ruleId) {
		return (
			<table className={cls}>
				<thead>
					<tr>
						<th>Organisation</th>
						<th>Tool</th>
						<th>Report</th>
					</tr>
				</thead>
				<tbody>
					{implementers
						.sort((a, b) => a.organisation.localeCompare(b.organisation))
						.map(({ organisation, toolName }) => {
							const reportUrl = `/implementation/${getHyphenatedString(toolName)}`
							return (
								<tr key={toolName}>
									<td>{organisation}</td>
									<td>{toolName}</td>
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

	return (
		<table className={cls}>
			<thead>
				<tr>
					<th>Tool</th>
					<th>Consitency</th>
					<th>Complete</th>
					<th>Report</th>
				</tr>
			</thead>
			<tbody>
				{implementers
					.sort((a, b) => a.organisation.localeCompare(b.organisation))
					.map(({ toolName, actMapping }) => {
						const reportUrl = `/implementation/${getHyphenatedString(toolName)}#id-${ruleId}`
						const impl = actMapping.find(impl => impl.ruleId === ruleId)
						return (
							<tr key={toolName}>
								<td>{toolName}</td>
								<td className="capitalize">{impl.consistency}</td>
								<td>{impl.complete ? `Yes` : `No`}</td>
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
