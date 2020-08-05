const { copy } = require('fs-extra')
const onCreateNode = require('./gatsby/on-create-node')
const createPages = require('./gatsby/create-pages')

exports.onPreBootstrap = async () => {
	await copy('./_data/testcases', 'public')
	await copy('./build/earl-context.json', 'public/earl-context.json')
}

exports.onCreateNode = onCreateNode
exports.createPages = createPages
