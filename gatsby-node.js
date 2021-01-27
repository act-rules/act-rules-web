const { copy, writeFile } = require('fs-extra')
const onCreateNode = require('./gatsby/on-create-node')
const createPages = require('./gatsby/create-pages')

exports.onPreBootstrap = async () => {
	await copy('./_data/testcases', 'public')
	await copy('./build/earl-context.json', 'public/earl-context.json')

	// Simple package.json file so that #master can be installed with NPM
	const packageJson = JSON.stringify(
		{
			name: 'act-rules.github.io',
			version: '1.0.0',
			main: 'testcases.json'
		},
		null,
		2
	)
	await writeFile('public/package.json', packageJson)
}

exports.onCreateNode = onCreateNode
exports.createPages = createPages
