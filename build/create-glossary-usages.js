/**
 * Create glossary usages
 * -> for each glossary item (find references in each rule)
 * -> this is saved for later use in `pages/glossary`
 */
const assert = require('assert')
const program = require('commander')
const regexps = require('../utils/reg-exps')
const createFile = require('../utils/create-file')
const getAllMatchesForRegex = require('../utils/get-all-matches-for-regex')
const getMarkdownData = require('../utils/get-markdown-data')

/**
 * Parse `args`
 */
program
	.option('-r, --rulesDir <rulesDir>', 'Directory containing rules markdown files')
	.option('-o, --outputDir <outputDir>', 'output directory to create the meta data')
	.parse(process.argv)

/**
 * Invoke
 */
init(program)
	.catch(e => {
		console.error(e)
		process.write(1)
	})
	.finally(() => console.info('Completed'))

/**
 * Init
 */
async function init({ rulesDir, outputDir }) {
	/**
	 * assert `args`
	 */
	assert(rulesDir, '`rulesDir` is required')
	assert(outputDir, '`outputDir` is required')

	/**
	 * Get all rules `markdown` data
	 */
	const rulesData = getMarkdownData(rulesDir)

	/**
	 * Eg:
	 * {
	 *  `non-empty`: [
	 *    { name: `aria valid ...`, slug: `rules/XXXXX` },
	 *    ....
	 *  ]
	 *  ....
	 * }
	 */
	const glossaryUsages = {}

	rulesData.forEach(ruleData => {
		const { frontmatter, body } = ruleData
		const { id: ruleId, name: ruleName, accessibility_requirements: ruleAccessibilityRequirements } = frontmatter

		// Finding classical glossary usages: "this is a [link](key)"
		const glossaryMatches = getAllMatchesForRegex(regexps.glossaryReferenceInRules, body, false)

		glossaryMatches.forEach(glossaryItem => {
			const hasGlossaryKey = regexps.glossaryKey.test(glossaryItem.block)
			if (!hasGlossaryKey) {
				return
			}

			const key = glossaryItem.block.match(regexps.glossaryKey)[1]
			if (!key) {
				return
			}

			const usage = {
				name: ruleName,
				slug: `rules/${ruleId}`,
			}
			if (!glossaryUsages[key]) {
				glossaryUsages[key] = [usage]
				return
			}

			const exists = glossaryUsages[key].some(u => u.slug === usage.slug)
			if (exists) {
				return
			}

			glossaryUsages[key] = glossaryUsages[key].concat(usage)
		})

		// Finding internal ref glossary usage: "[refname]: key"
		const glossaryInlinedMatches = getAllMatchesForRegex(regexps.glossaryDefinitionInRules, body, false)

		glossaryInlinedMatches.forEach(glossaryDef => {
			const hasGlossaryKey = regexps.glossaryKeyInDefinition.test(glossaryDef.block)
			if (!hasGlossaryKey) {
				return
			}

			const key = glossaryDef.block.match(regexps.glossaryKeyInDefinition)[1]
			if (!key) {
				return
			}

			const usage = {
				name: ruleName,
				slug: `rules/${ruleId}`,
			}
			if (!glossaryUsages[key]) {
				glossaryUsages[key] = [usage]
				return
			}

			const exists = glossaryUsages[key].some(u => u.slug === usage.slug)
			if (exists) {
				return
			}

			glossaryUsages[key] = glossaryUsages[key].concat(usage)
		})
	})

	/**
	 * Create `glossary-usages.json`
	 */
	await createFile(`${outputDir}/glossary-usages.json`, JSON.stringify(glossaryUsages, undefined, 2))
}
