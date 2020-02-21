const assert = require('assert')
const program = require('commander')
const createFile = require('../utils/create-file')
const getMarkdownData = require('../utils/get-markdown-data')
const actRulesCommunityRulesDir = 'node_modules/act-rules-community/_rules'

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
		process.exit(1)
	})
	.finally(() => console.info('Completed'))

/**
 * Create coverage list for wcag sc
 */
async function init(program) {
	const { rulesDir, outputDir } = program

	/**
	 * assert `args`
	 */
	assert(rulesDir, '`rulesDir` is required')
	assert(outputDir, '`outputDir` is required')

	const rulesData = getMarkdownData(actRulesCommunityRulesDir)
	const scs = {}
	for (const { frontmatter } of rulesData) {
		const { id: ruleId, name: ruleName, accessibility_requirements: ruleAccessibilityRequirements } = frontmatter
		if (ruleAccessibilityRequirements) {
			Object.keys(ruleAccessibilityRequirements)
				.filter(r => r.includes('wcag'))
				.forEach(r => {
					if (ruleAccessibilityRequirements[r].forConformance) {
						if (!scs[r]) {
							scs[r] = []
						}
						const rule = `[${ruleId}]: ${ruleName}`
						if (!scs[r].includes(rule)) {
							scs[r].push(rule)
						}
					}
				})
		}
	}
	const res = []
	Object.keys(scs).forEach(k => {
		res.push({
			sc: k,
			rules: scs[k],
		})
	})
	res.sort((a, b) => (a.sc > b.sc ? 1 : -1))

	const out = {}
	res.forEach(r => (out[r.sc] = r.rules))

	await createFile(`${outputDir}/sc-coverage.json`, JSON.stringify(out, null, 2))
}
