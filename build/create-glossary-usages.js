const program = require('commander')
const getMarkdownData = require('../utils/get-markdown-data')
const getMarkdownAstNodesOfType = require('../utils/get-markdown-ast-nodes-of-type')
const isUrl = require('is-url')
const fs = require('fs-extra')
const path = require('path')

program
	.requiredOption('-r, --rulesDir <rulesDir>', 'Directory containing rules markdown files')
	.requiredOption('-r, --glossaryDir <glossaryDir>', 'Directory containing glossary markdown files')
	.requiredOption('-o, --outputDir <outputDir>', 'output directory to create the meta data')
	.parse(process.argv)

createGlossaryUsage(program)
	.then(() => {
		console.info('Completed create-glossary-usages')
		process.exit()
	})
	.catch(e => {
		console.error(e)
		process.exit(1)
	})

async function createGlossaryUsage({ rulesDir, glossaryDir, outputDir }) {
	const result = getGlossaryUsages(rulesDir, glossaryDir)
	const outputFile = path.join(outputDir, 'glossary-usages.json')
	await fs.ensureFile(outputFile)
	await fs.writeJson(outputFile, result, { spaces: 2 })
}

/**
 * Get a map of glossary keys used for each rule
 * eg: "59br37": ["#attribute-value","#clipped-by-overflow"]
 * @param {String} rulesDir
 * @param {String} glossaryDir
 */
function getGlossaryUsages(rulesDir, glossaryDir) {
	const rulesData = getMarkdownData(rulesDir)
	const glossaryData = getMarkdownData(glossaryDir)
	const recursiveGlossaryRefs = getResursiveGlossaryReferences(glossaryData)

	const result = new Map()

	for (const { frontmatter, markdownAST } of rulesData) {
		const glossaryKeys = getGlossaryKeysFromMarkdown(markdownAST)

		let recursiveKeys = []
		for (const key of glossaryKeys) {
			recursiveKeys = recursiveKeys.concat(recursiveGlossaryRefs.get(key))
		}
		const values = [...new Set([...glossaryKeys, ...recursiveKeys])].sort((a, b) => a.localeCompare(b))

		result.set(frontmatter.id, values)
	}

	return Object.fromEntries(result)
}

/**
 * Build a map of recursive references to glossary data
 * @param {Object} glossaryData
 */
function getResursiveGlossaryReferences(glossaryData) {
	const result = new Map()
	for (const { frontmatter, markdownAST } of glossaryData) {
		const glossaryKeys = getGlossaryKeysFromMarkdown(markdownAST)
		result.set(`#${frontmatter.key}`, glossaryKeys)
	}
	return result
}

/**
 * Walk the markdown tree and get all links that are glossary references
 * @param {Object} markdownAST
 */
function getGlossaryKeysFromMarkdown(markdownAST) {
	// get all links -> eg: [Alpha](https://....) or [Beta](#semantic-role)
	const pageLinks = getMarkdownAstNodesOfType(markdownAST, 'link').map(({ url }) => url)
	// get all definition links  -> eg: [alpha]: https:// 'Link to something' or [beta]: #some-glossary 'Def to some glossary'
	const definitionLinks = getMarkdownAstNodesOfType(markdownAST, 'definition').map(({ url }) => url)
	// unique links and filter out url links
	return [...new Set([...pageLinks, ...definitionLinks])].filter(link => {
		if (isUrl(link)) {
			return false
		}
		if (!link.trim().startsWith('#')) {
			return false
		}
		return true
	})
}
