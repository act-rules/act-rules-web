const fs = require('fs')
const assert = require('assert')
const program = require('commander')
const yaml = require('js-yaml')
const { exec } = require('child_process')
const { actMapGenerator, loadJson } = require('act-rules-implementation-mapper')
const createFile = require('../utils/create-file')

/**
 * Parse `args`
 */
program
	.option('-i, --implementationsFile <implementationsFile>', 'File containing implementations meta data')
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
async function init({ implementationsFile }) {
	/**
	 * assert `args`
	 */
	assert(implementationsFile, '`implementationsFile` is required')

	const implementations = yaml.safeLoad(fs.readFileSync(implementationsFile, 'utf8'))
	// create implementations directory, as `act-map-generator` fails if directory does not exist
	execCommand(`mkdir -p "./_data/implementations"`)

	for (const { organisation, toolName, jsonReports, testcases: actTestcases, output, description } of implementations) {
		const earlReports = await loadJson(jsonReports)
		const [testcases] = await loadJson(actTestcases)
		const mapping = await actMapGenerator(earlReports, testcases, { organisation, toolName })
		const result = {
			...mapping,
			description,
		}
		await createFile(output, JSON.stringify(result, undefined, 2))
		console.info(`Generated implementations for ${toolName} from ${organisation}`)
	}
}

/**
 * Helper fn to execute `exec` asynchronously
 * @param {String} command command
 */
function execCommand(command) {
	return new Promise((resolve, reject) => {
		exec(command, err => {
			if (err) {
				reject(err)
			}
			resolve()
		})
	})
}
