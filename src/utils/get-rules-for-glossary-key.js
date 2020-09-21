import glossaryUsages from '../../_data/glossary-usages.json'

export const getRulesForGlossaryKey = key => {
	const result = []
	for (const [ruleId, glossaryKeys] of Object.entries(glossaryUsages)) {
		if (glossaryKeys.includes(key)) {
			result.push(ruleId)
		}
	}
	return result
}
