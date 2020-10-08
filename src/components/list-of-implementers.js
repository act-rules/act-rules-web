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

	const ruleMappings = implementers.reduce((out, { toolName, actMapping }) => {
		const impl = actMapping.find(impl => impl.ruleId === ruleId)
		if (!impl) {
			return out
		}

		const reportUrl = `/implementation/${getHyphenatedString(toolName)}#id-${ruleId}`
		out.push({
			toolName,
			consistency: impl.consistency,
			complete: impl.complete,
			reportUrl,
		})

		return out
	}, [])

	const sortedRuleMappings = ruleMappings.sort((a, b) => {
		if (a.consistency !== b.consistency) {
			return a.consistency === 'consistent' ? -1 : 1 // ascending with consistent followed by others
		}
		if (a.complete !== b.complete) {
			return a.complete ? -1 : 1 // ascending with complete followed by others
		}
		return a.toolName.localeCompare(b.toolName) //sort alphabetically as fallback
	})

	return (
		<table className={cls}>
			<thead>
				<tr>
					<th>Tool</th>
					<th>Consistency</th>
					<th>Complete</th>
					<th>Report</th>
				</tr>
			</thead>
			<tbody>
				{sortedRuleMappings.map(({ toolName, consistency, complete, reportUrl }) => {
					return (
						<tr key={toolName}>
							<td>{toolName}</td>
							<td className="capitalize">{consistency}</td>
							<td>{complete ? `Yes` : `No`}</td>
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
