import React from 'react'
import AccessibilityRequirement from './accessibility-requirement'
import { getAccessibilityRequirement } from '../../rule/get-accessibility-requirement'

export default function AccessibilityRequirements({ accessibility_requirements, type = 'details' }) {
	return (
		<div className="meta">
			<span className="heading">Accessibility Requirements Mapping:</span>
			<ul>{accRequirementItems(accessibility_requirements, type)}</ul>
		</div>
	)
}

function accRequirementItems(accRequirements, listType) {
	const accMapping = Object.entries(accRequirements || {})
	if (accMapping.length === 0) {
		return <li>This rule is not required for conformance.</li>
	}

	return accMapping.map(([requirementId, mapping], index) => {
		return <Requirement requirementId={requirementId} mapping={mapping} listType={listType} key={index} />
	})
}

function Requirement({ requirementId, mapping, listType }) {
	const accRequirement = getAccessibilityRequirement({
		requirementId,
		title: mapping.title,
	})
	if (!accRequirement) {
		return <li>Accessibility Requirements have no or unknown mapping.</li>
	}

	const { conformanceLevel, url, requirementType, title, shortTitle } = accRequirement

	return (
		<AccessibilityRequirement
			mapping={mapping}
			title={title || mapping.title}
			shortTitle={shortTitle}
			listType={listType}
			conformanceLevel={conformanceLevel}
			url={url}
			requirementType={requirementType}
		/>
	)
}
