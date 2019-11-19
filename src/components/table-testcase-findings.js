import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import getHyphenatedString from '../../utils/get-hyphenated-string'

const TableTestcaseFindings = ({ ruleId, implementations = [], filter = defaultFilter }) => {
	return (
		<table>
			<thead>
				<tr>
					<th>Testcase Url</th>
					<th width="100px">Expected</th>
					{implementations.map(({ implementationId }, index) => {
						return (
							<th width="100px" key={`${implementationId}- ${index}`}>
								{implementationId}
							</th>
						)
					})}
				</tr>
			</thead>
			<tbody>
				{Object.values(groupFindingsOfImplementations(ruleId, implementations, filter)).map(
					({ testcase, url, relativeUrl, expected, actuals }, index) => {
						return (
							<tr key={`${url}-${index}`}>
								<td>
									<Link to={relativeUrl}>{testcase}</Link>
								</td>
								<td>{expected}</td>
								{implementations.map(({ implementationId }, index) => {
									return (
										<td width="100px" key={`${implementationId}-${url}=${index}`}>
											{actuals[implementationId]}
										</td>
									)
								})}
							</tr>
						)
					}
				)}
			</tbody>
		</table>
	)
}

TableTestcaseFindings.propTypes = {
	ruleId: PropTypes.string.isRequired,
	implementations: PropTypes.array.isRequired,
	filter: PropTypes.func,
}

export default TableTestcaseFindings

/**
 * Group implmentation set data per testcase
 * @param {Array<Object>} implementations implementation set
 * @param {Function} filter filter fn
 * @returns {Object}
 */
function groupFindingsOfImplementations(ruleId, implementations, filter) {
	const result = {}

	const filteredImplementations = implementations.filter(filter)

	for (const { implementationId, findings } of filteredImplementations) {
		for (const { url, testcase, expected, actual } of findings) {
			if (!result[testcase]) {
				result[testcase] = {
					url,
					testcase,
					relativeUrl: `/rules/${ruleId}/#${getHyphenatedString(testcase)}`,
					expected,
					actuals: {
						[implementationId]: actual,
					},
				}
			} else {
				result[testcase] = {
					...result[testcase],
					actuals: {
						...result[testcase].actuals,
						[implementationId]: actual,
					},
				}
			}
		}
	}

	return result
}

/**
 * Default filter which returns everything
 */
function defaultFilter() {
	return true
}
