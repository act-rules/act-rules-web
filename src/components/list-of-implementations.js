import React from 'react'
import PropTypes from 'prop-types'
import TableTestcaseFindings from './table-testcase-findings'
import Note from './note'

const ListOfImplementations = ({ mapping = [], showIncomplete = false }) => {
	return (
		<div>
			{mapping.map(({ ruleId = '', ruleName = '', ruleType = '', implementations }) =>
				<div>{getPageContent(implementations, showIncomplete, ruleId)}</div>
			)}
		</div>
	)
}

ListOfImplementations.propTypes = {
	mapping: PropTypes.array.isRequired,
	showIncomplete: PropTypes.bool,
}

export default ListOfImplementations

/**
 *
 * @param {Object[]} implementations implementations
 * @param {Boolean} showIncomplete should show incomplete implementations
 * @param {String} ruleId rule id
 */
function getPageContent(implementations, showIncomplete, ruleId) {
	if (!implementations || !implementations.length) {
		return (
			<Note
				cls={`invalid`}
				title={`No Implementations`}
				body={`Feel free to submit an implementation for this rule.`}
			/>
		)
	}

	return (
		<>
			{showIncomplete ? (
				<>
					<Note
						cls={`invalid`}
						title={`Incomplete Implementation`}
						body={`Listed below are the incomplete assertions. Kindly submit an amended implementation report.`}
					/>
					<TableTestcaseFindings
						ruleId={ruleId}
						implementations={implementations}
						filter={({ consistency }) => consistency === `inconsistent`}
					/>
				</>
			) : (
					<TableTestcaseFindings
						ruleId={ruleId}
						implementations={implementations}
						filter={({ consistency }) => consistency !== `inconsistent`}
					/>
				)}
		</>
	)
}
