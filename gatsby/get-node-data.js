const fs = require('fs')
const axios = require('axios')
const fastmatter = require('fastmatter')
const { createFilePath } = require('gatsby-source-filesystem')

/**
 * Get node data, to enhance metadata of pages
 *
 * @param {Object} options options passed by gatsby node callback
 */
const getNodeData = async options => {
	const { node, getNode } = options
	const fileNode = getNode(node.parent)
	const { sourceInstanceName, relativePath, absolutePath } = fileNode
	const fileContents = fs.readFileSync(absolutePath, { encoding: 'utf-8' })
	const { attributes } = fastmatter(fileContents)
	const defaults = {
		sourceInstanceName: sourceInstanceName,
		markdownType: getMarkdownType(relativePath, sourceInstanceName),
		fileName: relativePath,
		fastmatterAttributes: JSON.stringify(attributes),
	}

	switch (sourceInstanceName) {
		case 'rules': {
			const { id } = attributes
			const path = `${sourceInstanceName}/${id}`
			const gitUrl = `https://api.github.com/repos/act-rules/act-rules.github.io/commits?path=_rules/${relativePath}`
			const logs = await getGitLog(gitUrl)

			return {
				...defaults,
				path,
				changelog: JSON.stringify(logs),
			}
		}
		default:
			return {
				...defaults,
				path: `${sourceInstanceName}${createFilePath({ node, getNode })}`,
			}
	}
}

module.exports = getNodeData

/**
 * Get markdown type
 *
 * @param {String} path path
 * @param {String} sourceInstanceName file system plugin instance name
 */
function getMarkdownType(path, sourceInstanceName) {
	if (sourceInstanceName === 'rules') {
		return 'rules'
	}
	if (/glossary/.test(path)) {
		return 'glossary'
	}
	if (/implementations/.test(path)) {
		return 'implementations'
	}
	if (/design/.test(path) || /structure/.test(path)) {
		return 'documentation'
	}
	return 'default'
}

/**
 * get git log of a given file
 * @param {string} url
 */
async function getGitLog(url) {
	if (!process.env.GITHUB_USER_PERSONAL_ACCESS_TOKEN) {
		console.warn(`Please set up github access token as environment variable`)
		return []
	}

	const result = []
	const { data } = await axios.get(url, {
		headers: {
			Authorization: `Bearer ${process.env.GITHUB_USER_PERSONAL_ACCESS_TOKEN}`,
			'Content-Type': 'application/json',
		},
	})

	if (!data || !data.length) {
		return result
	}

	for (const { sha, html_url, commit } of data) {
		// ignore when no commit or  `chore` and `test` commits
		if (!commit || /^chore|test/i.test(commit.message)) {
			continue
		}

		const log = {
			date: commit.committer.date,
			message: commit.message,
			sha: sha,
			htmlUrl: html_url,
		}
		result.push(log)
	}

	return result
}
