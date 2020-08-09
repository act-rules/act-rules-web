const fs = require('fs-extra')
const program = require('commander')
const yaml = require('js-yaml')
const { actMapGenerator, loadJson } = require('act-rules-implementation-mapper')
const createFile = require('../utils/create-file')

program
	.option(
		'-i, --implementationsFile <implementationsFile>',
		'File containing implementations meta data',
		'./implementations.yml'
	)
	.parse(process.argv)

getImplementations(program)
	.then(() => {
		console.info('Completed get-implementations')
		process.exit()
	})
	.catch(e => {
		console.error(e)
		process.exit(1)
	})

async function getImplementations({ implementationsFile }) {
	const implementations = yaml.safeLoad(fs.readFileSync(implementationsFile, 'utf8'))
	await fs.ensureDir('./_data/implementations')

	for (const implementation of implementations) {
		const { organisation, toolName, output } = implementation
		const result = await createReport(implementation)

		await createFile(output, JSON.stringify(result, undefined, 2))
		console.info(`Generated implementations for ${toolName} from ${organisation}`)
	}
}

async function createReport(implementation) {
	const { organisation, toolName, jsonReports, testcases, description } = implementation

	const earlReports = await loadJson(jsonReports)
	const [testcaseContents] = await loadJson(testcases)
	const mapping = await actMapGenerator(earlReports, testcaseContents, { organisation, toolName })
	return {
		...mapping,
		description,
	}
}
