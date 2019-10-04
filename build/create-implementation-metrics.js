const assert = require('assert')
const program = require('commander')
const globby = require('globby')
const readFile = require('../utils/read-file')
const createFile = require('../utils/create-file')

/**
 * Parse `args`
 */
program
	.option('-i, --implementations <implementations>', 'JSON files containing implementations')
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
async function init({ implementations, outputDir }) {
	/**
	 * assert `args`
	 */
	assert(implementations, '`implementations` is required')
	assert(outputDir, '`outputDir` is required')

	/**
	 * Get all implementation reports
	 */
	const reports = globby.sync(implementations).map(reportPath => {
		const fileContent = readFile(reportPath)
		return JSON.parse(fileContent)
	})

	const implementers = []
	const implementationsGroupedByRuleId = {}

	reports.forEach(report => {
		const { tool, organisation, mapping } = report

		/**
		 * Create data that can be used in `src/templates/coverage.js`
		 */
		implementers.push(report)

		/**
		 * Iterate each implementation & group by rule id
		 */
		mapping.forEach(({ ruleId, implementation }) => {
			if (!implementation || !implementation.length) {
				return
			}

			if (!implementationsGroupedByRuleId[ruleId]) {
				implementationsGroupedByRuleId[ruleId] = []
			}

			implementationsGroupedByRuleId[ruleId].push({
				organisation,
				tool,
				implementation,
			})
		})
	})

	/**
	 * Create `implementations.json`
	 */
	await createFile(`${outputDir}/implementers.json`, JSON.stringify(implementers, null, 2))

	/**
	 * Create `implementation-metrics.json`
	 */
	await createFile(`${outputDir}/implementation-metrics.json`, JSON.stringify(implementationsGroupedByRuleId, null, 2))
}
