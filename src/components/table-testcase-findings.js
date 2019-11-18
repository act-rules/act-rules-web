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
					{implementations.map(({ implementationId }) => {
						return (
							<th width="100px" key={implementationId}>
								{implementationId}
							</th>
						)
					})}
				</tr>
			</thead>
			<tbody>
				{Object.values(groupFindingsOfImplementations(ruleId, implementations, filter)).map(
					({ testcase, url, relativeUrl, expected, actuals }) => {
						return (
							<tr key={url}>
								<td>
									<Link to={relativeUrl}>{testcase}</Link>
								</td>
								<td>{expected}</td>
								{implementations.map(({ implementationId }) => {
									return (
										<td width="100px" key={`${implementationId}-${url}`}>
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

	for (const { implementationId, findings } of implementations) {
		const filteredFindings = findings.filter(filter)

		for (const { url, testcase, expected, actual } of filteredFindings) {
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
