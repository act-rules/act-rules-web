import React from 'react'
import { filterByConsistency } from '../templates/implementer.js'
import implementationMetrics from '../../_data/implementation-metrics.json'

const CountImplementations = ({ ruleId = `` }) => {
	const metrics = implementationMetrics[ruleId] || []

	/**
	 * Get count of implementations which are only `consistent`
	 */
	const count = metrics.filter(metric => filterByConsistency(metric.implementations, ['consistent']).length > 0).length

	return (
		<div className="side-notes">
			<div className="meta">
				<span className="heading">Complete Implementations: {count}</span>
			</div>
		</div>
	)
}

export default CountImplementations
