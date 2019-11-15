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
		process.write(1)
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

	for (const impl of implementations) {
		const { toolName, organisation } = impl

		const command = Object.entries(impl).reduce((out, [key, value]) => {
			const argument = `--${key} ${value}`
			return `${out} ${argument}`
		}, ``)

		await executeActMapGenerator(command)
		console.info(`Generated implementations for ${toolName} from ${organisation}`)
	}
}

/**
 * Helper fn to execute `act-map-generator`
 * @param {String} command args passed to act-map-generator
 */
function executeActMapGenerator(command) {
	return new Promise((resolve, reject) => {
		exec(`act-map-generator ${command}`, err => {
			if (err) {
				reject(err)
			}
			resolve()
		})
	})
}
