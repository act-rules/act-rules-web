const fs = require('fs')
const yaml = require('js-yaml')

const implementers = require('../_data/implementers.json')
const getTemplate = require('./get-template')
const getHyphenatedString = require('../utils/get-hyphenated-string')

const createPageImplementerReport = ({ actions: { createPage } }) => {
	for (const impl of implementers) {
		const { organisation, toolName } = impl
		const filename = getHyphenatedString(toolName)
		const slug = `implementation/${filename}`

		/**
		 * Complete implementations page
		 */
		createPage({
			path: slug,
			component: getTemplate('implementer'),
			context: {
				slug,
				filename,
				title: `Implementation report of ${toolName} (${organisation})`,
				implementerData: JSON.stringify(impl),
			},
		})

		/**
		 * Incomplete implementations page
		 */
		createPage({
			path: `${slug}/incomplete`,
			component: getTemplate('implementerIncomplete'),
			context: {
				slug,
				filename,
				title: `Incomplete implementations report of ${toolName} (${organisation})`,
				implementerData: JSON.stringify(impl),
			},
		})
	}
}

module.exports = createPageImplementerReport
