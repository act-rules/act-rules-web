const implementers = require('../_data/implementers.json')
const getTemplate = require('./get-template')
const getHyphenatedString = require('../utils/get-hyphenated-string')

const createPageImplementerReport = ({ actions: { createPage } }) => {
	for (const impl of implementers) {
		const { organisation, toolName } = impl

		const filename = getHyphenatedString(toolName)
		const slug = `implementation/${filename}`

		createPage({
			path: slug,
			component: getTemplate('implementer'),
			context: {
				slug,
				filename,
				title: `Implementation Report of ${toolName} (${organisation})`,
				implementerData: JSON.stringify(impl),
			},
		})
	}
}

module.exports = createPageImplementerReport
