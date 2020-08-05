import React from 'react'
import PropTypes from 'prop-types'
import showdown from 'showdown'

import AccessibilityRequirements from './accessibility_requirements'
import CountImplementations from './count-implementations'
import ListWithHeading from './list-with-heading'

import './rule-card.scss'
import RuleHeader from './rule-header'

const RuleCard = ({ id = '', name = '', description = '', accessibilityRequirements, inputRules, allRules }) => {
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
				{inputRules && (
					<ListWithHeading
						cls={`meta`}
						headingTemplate={() => <span className="heading">Input Rules:</span>}
						itemTemplate={inputRuleId => {
							const atomicRule = allRules.edges.find(rule => rule.node.frontmatter.id === inputRuleId)
							const aHref = atomicRule.node.fields.slug.replace('rules/', '')
							const name = atomicRule.node.frontmatter.name
							return (
								<li key={inputRuleId}>
									<a
										className="sc-item block"
										href={aHref}
										dangerouslySetInnerHTML={{
											__html: converter.makeHtml(name),
										}}
									></a>
								</li>
							)
						}}
						items={inputRules}
					/>
				)}
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
