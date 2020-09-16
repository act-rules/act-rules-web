const { getWcagCriterion } = require('./get-wcag-criterion')
const { getWcagTechnique } = require('./get-wcag-technique')

const accessibilityDocs = {
	aria11: {
		conformanceLevel: 'WAI-ARIA 1.1 author requirements',
		baseURL: 'https://www.w3.org/TR/wai-aria-1.1/#',
		requirementType: 'WAI-ARIA requirement',
	},
	'dpub-aria': {
		conformanceLevel: 'WAI-ARIA Digital Publishing Module 1.0 author requirements',
		baseURL: 'https://www.w3.org/TR/dpub-aria-1.0/#',
		requirementType: 'WAI-ARIA Digital Publishing Module requirement',
	},
	'graphics-aria': {
		conformanceLevel: 'WAI-ARIA Graphics Module 1.0 author requirements',
		baseURL: 'https://www.w3.org/TR/graphics-aria-1.0/#',
		requirementType: 'WAI-ARIA Graphics Module requirement',
	},
	'using-aria': {
		baseURL: 'https://www.w3.org/TR/using-aria/#',
		requirementType: 'WAI-ARIA rule',
	},
	'wcag-text': {
		conformanceLevel: 'WCAG 2.1',
		baseURL: 'https://www.w3.org/TR/WCAG21/#',
		requirementType: 'WCAG 2 conformance requirement',
	},
}

function getAccessibilityRequirement({ requirementId, title, shortTitle, forConformance }) {
	shortTitle = shortTitle || title
	const [accDocument, accRequirement] = requirementId.toLowerCase().split(':')

	if (accDocument.substr(0, 5) === 'wcag2') {
		return getWcagCriterion(accRequirement)
	} else if (['technique', 'wcag-technique'].includes(accDocument)) {
		return getWcagTechnique(accRequirement)
	} else if (accessibilityDocs[accDocument]) {
		const { baseURL, conformanceLevel, requirementType } = accessibilityDocs[accDocument]
		return {
			requirementType,
			conformanceLevel: forConformance ? conformanceLevel : null,
			title,
			shortTitle,
			url: `${baseURL}${accRequirement}`,
		}
	}
}

module.exports = { getAccessibilityRequirement }
