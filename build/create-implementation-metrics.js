const program = require('commander')
const globby = require('globby')
const readFile = require('../utils/read-file')
const createFile = require('../utils/create-file')

program
	.option(
		'-i, --implementations <implementations>',
		'JSON files containing implementations',
		'./_data/implementations/*.json'
	)
	.option('-o, --outputDir <outputDir>', 'output directory to create the meta data', './_data')
	.parse(process.argv)

createImplementationMetrics(program)
	.then(() => {
		console.info('Completed create-implementation-metrics')
		process.exit()
	})
	.catch(e => {
		console.error(e)
		process.exit(1)
	})

async function createImplementationMetrics({ implementations, outputDir }) {
	const reports = globby.sync(implementations).map(reportPath => {
		const fileContent = readFile(reportPath)
		return JSON.parse(fileContent)
	})

	const implementers = []
	const implementationsGroupedByRuleId = {}

	reports.forEach(report => {
		const { organisation, toolName, actMapping, description } = report

		implementers.push(report)
		actMapping.forEach(({ ruleId, implementations }) => {
			if (!implementations || !implementations.length) {
				return
			}

			if (!implementationsGroupedByRuleId[ruleId]) {
				implementationsGroupedByRuleId[ruleId] = []
			}

			implementationsGroupedByRuleId[ruleId].push({
				organisation,
				toolName,
				implementations,
				description,
			})
		})
	})

	await createFile(`${outputDir}/implementers.json`, JSON.stringify(implementers, null, 2))
	await createFile(`${outputDir}/implementation-metrics.json`, JSON.stringify(implementationsGroupedByRuleId, null, 2))
}
