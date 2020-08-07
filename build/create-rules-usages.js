const program = require('commander')
const createFile = require('../utils/create-file')
const getMarkdownData = require('../utils/get-markdown-data')

program
	.requiredOption('-r, --rulesDir <rulesDir>', 'Directory containing rules markdown files')
	.requiredOption('-o, --outputDir <outputDir>', 'output directory to create the meta data')
	.parse(process.argv)

createRuleUsages(program)
	.then(() => {
		console.info('Completed create-rules-usages')
		process.exit()
	})
	.catch(e => {
		console.error(e)
		process.exit(1)
	})

async function createRuleUsages({ rulesDir, outputDir }) {
	const rulesData = getMarkdownData(rulesDir)
	let rulesUsages = {}

	rulesData.forEach(ruleData => {
		const { id: ruleId, name: ruleName, input_rules: inputRules } = ruleData.frontmatter
		if (!inputRules) {
			return
		}
		const usage = {
			name: ruleName,
			slug: `rules/${ruleId}`,
		}

		inputRules.forEach(key => (rulesUsages[key] = rulesUsages[key] ? rulesUsages[key].concat(usage) : [usage]))
	})

	await createFile(`${outputDir}/rules-usages.json`, JSON.stringify(rulesUsages, undefined, 2))
}
