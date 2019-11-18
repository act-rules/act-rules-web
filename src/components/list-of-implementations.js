import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import Note from './note'
import TableTestcaseFindings from './table-testcase-findings'

const ListOfImplementations = ({ mapping = [], showIncomplete = false }) => {
	return (
		<div>
			{mapping.map(({ ruleId, ruleName, implementations }) => {
				return (
					<div key={ruleId}>
						<Link to={`/rules/${ruleId}`}>
							<h2 id={`#${ruleId}`}>{ruleName}</h2>
						</Link>
						{showIncomplete && (
							<Note
								cls={`invalid`}
								title={`Incomplete Implementation`}
								body={`Listed below are the incomplete assertions. Kindly submit an amended implementation report.`}
							/>
						)}
						{
							<TableTestcaseFindings
								ruleId={ruleId}
								implementations={implementations}
								filter={finding => {
									if (showIncomplete) {
										return finding.consistency === `inconsistent`
									}
									return finding.consistency !== `inconsistent`
								}}
							/>
						}
					</div>
				)
			})}
		</div>
	)
}

ListOfImplementations.propTypes = {
	mapping: PropTypes.array.isRequired,
	showIncomplete: PropTypes.bool,
}

export default ListOfImplementations
