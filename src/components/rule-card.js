import React from 'react'
import PropTypes from 'prop-types'
import showdown from 'showdown'

import AccessibilityRequirements from './accessibility_requirements'
import CountImplementations from './count-implementations'

import { getInputRulesForRule } from '../utils/render-fragments'

import './rule-card.scss'
import RuleHeader from './rule-header'

const RuleCard = ({
	id = '',
	name = '',
	type = '',
	description = '',
	accessibilityRequirements,
	inputRules,
	allRules,
}) => {
	const converter = new showdown.Converter()

	return (
		<article className="ruleCard">
			<section>
				{/* header  */}
				<RuleHeader ruleId={id} ruleName={name} />
				{/* rule description */}
				<div
					dangerouslySetInnerHTML={{
						__html: converter.makeHtml(description),
					}}
				/>
				{/* rule sc's */}
				<AccessibilityRequirements accessibility_requirements={accessibilityRequirements} type="text" />
				{/* input rules */}
				{getInputRulesForRule(inputRules, allRules.edges, true)}
				{/* implementation count */}
				<CountImplementations ruleId={id} />
			</section>
		</article>
	)
}

RuleCard.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	accessibilityRequirements: PropTypes.object,
	inputRules: PropTypes.array,
	allRules: PropTypes.object,
}

export default RuleCard
