/**
 * Create rule usages
 * -> for each (atomic) rule (find references in each (composite) rule)
 * -> this is saved in `_data` which is later used in `template/rule.js`
 */
const assert = require('assert')
const program = require('commander')
const createFile = require('../utils/create-file')
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
	.then(() => console.info('Completed'))
	.catch(e => {
		console.error(e)
		process.exit(1)
	})

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

	let rulesUsages = {}

	rulesData.forEach(ruleData => {
		const { id: ruleId, name: ruleName, input_rules: inputRules } = ruleData.frontmatter

		if (inputRules) {
			const usage = {
				name: ruleName,
				slug: `rules/${ruleId}`,
			}

			inputRules.forEach(key => (rulesUsages[key] = rulesUsages[key] ? rulesUsages[key].concat(usage) : [usage]))
		}
	})

	/**
	 * Create rules-usages.json
	 */
	await createFile(`${outputDir}/rules-usages.json`, JSON.stringify(rulesUsages, undefined, 2))
}
