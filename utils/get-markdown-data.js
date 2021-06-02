const fs = require('fs')
const globby = require('globby')
const path = require('path')
const parsePage = require('./parse-page')

/**
 * Parse all markdown files in a given directory and construct metadata of each markdown file
 *
 * @param {String} dir path to directory containing markdown files
 * @returns {Object}
 */
const getMarkdownData = dir => {
	return globby.sync(`${dir}/**/*.md`).map(markdownPath => {
		const filename = path.parse(markdownPath).base
		const fileContents = fs.readFileSync(markdownPath, { encoding: 'utf-8' })
		return { filename, ...parsePage(fileContents) }
	})
}

module.exports = getMarkdownData
