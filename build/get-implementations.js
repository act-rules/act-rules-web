const fs = require('fs')
const assert = require('assert')
const program = require('commander')
const yaml = require('js-yaml')
const { exec } = require('child_process')

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
	.catch(e => {
		console.error(e)
		process.exit(1)
	})
	.finally(() => console.info('Completed'))

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

	for (const impl of implementations) {
		const { toolName, organisation } = impl
		const command = Object.entries(impl).reduce((out, [key, value]) => {
			const argument = `--${key} "${value}"`
			return `${out} ${argument}`
		}, ``)

		try {
			await execCommand(`act-map-generator ${command}`)
			console.info(`Generated implementations for ${toolName} from ${organisation}`)
		} catch (error) {
			throw error
		}
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
