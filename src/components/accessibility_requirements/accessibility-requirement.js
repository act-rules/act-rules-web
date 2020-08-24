import React from 'react'
import OutcomeMapping from './outcome-mapping'

export default function AccessibilityRequirementsListing({
	listType,
	title,
	shortTitle,
	conformanceLevel,
	url,
	mapping,
	requirementType,
}) {
	if (listType === 'text') {
		return (
			<li>
				<ExternalLink href={url} text={title} />
			</li>
		)
	}

	return (
		<li>
			<details>
				<summary>{title}</summary>
				<ul>
					<li>
						<ExternalLink href={url} text={`Learn More about ${shortTitle}`} />
					</li>
					<li>
						<ConformanceRequirement conformanceLevel={conformanceLevel} />
					</li>
					<li>
						Outcome mapping:
						<OutcomeMapping
							requirementType={requirementType}
							failed={mapping.failed}
							passed={mapping.passed}
							inapplicable={mapping.inapplicable}
						/>
					</li>
				</ul>
			</details>
		</li>
	)
}

function ConformanceRequirement({ conformanceLevel }) {
	return conformanceLevel ? (
		<>
			<strong>Required for conformance</strong> to {conformanceLevel}.
		</>
	) : (
		`Not required to conformance to any W3C accessibility recommendation.`
	)
}

function ExternalLink({ href, text }) {
	return (
		<a href={href} className="sc-item" target="_blank" rel="noopener noreferrer">
			{text}
		</a>
	)
}
