const fs = require('fs')
const globby = require('globby')
const path = require('path')
const fastmatter = require('fastmatter')
const remark = require('remark')

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
		const markdownAST = remark.parse(fileContents)
		const { attributes: frontmatter, body } = fastmatter(fileContents)
		return {
			filename,
			frontmatter,
			body,
			markdownAST,
		}
	})
}

module.exports = getMarkdownData
