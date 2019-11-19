import React from 'react'
import { filterByConsistency } from '../templates/implementer.js'
import implementationMetrics from '../../_data/implementation-metrics.json'

const CountImplementations = ({ ruleId = `` }) => {
	const metrics = implementationMetrics[ruleId] || []

	/**
	 * Get count of implementations which are either `consistent` or `partially-consistent`
	 */
	const count = metrics.filter(
		metric => filterByConsistency(metric.implementations, ['consistent', 'partially-consistent']).length > 0
	).length

	return (
		<div className="side-notes">
			<div className="meta">
				<span className="heading">Implementations: {count}</span>
			</div>
		</div>
	)
}

export default CountImplementations
