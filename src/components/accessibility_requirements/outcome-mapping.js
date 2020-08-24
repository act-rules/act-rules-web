import React from 'react'

export default function OutcomeMapping({
	failed = 'not satisfied',
	passed = 'further testing is needed',
	inapplicable = 'further testing is needed',
	requirementType = 'success criterion',
}) {
	return (
		<ul>
			<FailedItem requirementType={requirementType} outcome={failed} />
			<PassedItem requirementType={requirementType} outcome={passed} />
			<InapplicableItem requirementType={requirementType} outcome={inapplicable} />
		</ul>
	)
}

function FailedItem({ requirementType, outcome }) {
	return (
		<li>
			Any <code>failed</code> outcomes: {getMappingOutcomeSentence(requirementType, outcome)}.
		</li>
	)
}

function PassedItem({ requirementType, outcome }) {
	return (
		<li>
			All <code>passed</code> outcomes: {getMappingOutcomeSentence(requirementType, outcome)}.
		</li>
	)
}

function InapplicableItem({ requirementType, outcome }) {
	return (
		<li>
			An <code>inapplicable</code> outcome: {getMappingOutcomeSentence(requirementType, outcome)}.
		</li>
	)
}

/**
 * Conjugate outcome mapping
 * @param {String} requirementType requirement type eg: technique, requirement, success criterion
 * @param {String} outcome given string from accessibility requirement authored in frontmatte of the rule
 * @returns {String}
 */
const getMappingOutcomeSentence = (requirementType, outcome) => {
	const outcomeMap = {
		satisfied: 'is satisfied',
		'not satisfied': 'is not satisfied',
		'further testing needed': 'needs further testing',
	}

	let outcomeValue = ``
	if (outcomeMap[outcome]) {
		outcomeValue = outcomeMap[outcome]
	}

	return `${requirementType} ${outcomeValue}`
}
