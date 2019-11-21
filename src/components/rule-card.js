import React from 'react'
import PropTypes from 'prop-types'
import showdown from 'showdown'

import AccessibilityRequirements from './accessibility_requirements'
import CountImplementations from './count-implementations'

import { getInputRulesForRule } from '../utils/render-fragments'

import './rule-card.scss'

const RuleCard = ({ id = '', name = '', description = '', accessibilityRequirements, inputRules, allRules }) => {
	const converter = new showdown.Converter()

	return (
		<article className="ruleCard">
			<section>
				{/* rule id */}
				<a href={id}>
					<h2
						dangerouslySetInnerHTML={{
							__html: converter.makeHtml(name),
						}}
					/>
				</a>
				{/* rule sc's */}
				<AccessibilityRequirements accessibility_requirements={accessibilityRequirements} type="text" />
				{/* input rules */}
				{getInputRulesForRule(inputRules, allRules.edges, true)}
				{/* implementation count */}
				<CountImplementations ruleId={id} />
				{/* rule description */}
				<div
					dangerouslySetInnerHTML={{
						__html: converter.makeHtml(description),
					}}
				/>
			</section>
		</article>
	)
}

RuleCard.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	description: PropTypes.array.isRequired,
	accessibilityRequirements: PropTypes.object,
	inputRules: PropTypes.array,
	allRules: PropTypes.array,
}

export default RuleCard
