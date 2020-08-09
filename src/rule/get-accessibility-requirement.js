import wcagListing from './get-wcag-criterion'
import techniqueListing from './get-wcag-technique'

const accessibilityDocs = {
	aria11: {
		conformanceLevel: 'WAI-ARIA 1.1 author requirements',
		baseURL: 'https://www.w3.org/TR/wai-aria-1.1/#',
		requirementType: 'WAI-ARIA requirement',
	},
	'using-aria': {
		baseURL: 'https://www.w3.org/TR/using-aria/#',
		requirementType: 'WAI-ARIA rule',
	},
}

export default function getAccessibilityRequirement({ requirementId, title, shortTitle }) {
	shortTitle = shortTitle || title
	const [accDocument, accRequirement] = requirementId.toLowerCase().split(':')

	if (accDocument.substr(0, 5) === 'wcag2') {
		return wcagListing(accRequirement)
	} else if (['technique', 'wcag-technique'].includes(accDocument)) {
		return techniqueListing(accRequirement)
	} else if (accessibilityDocs[accDocument]) {
		const { baseURL, conformanceLevel, requirementType } = accessibilityDocs[accDocument]
		return {
			requirementType,
			conformanceLevel,
			title,
			shortTitle,
			url: `${baseURL}${accRequirement}`,
		}
	}
}
