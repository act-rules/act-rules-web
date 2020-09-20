const program = require('commander')
const getMarkdownData = require('../utils/get-markdown-data')
const getMarkdownAstNodesOfType = require('../utils/get-markdown-ast-nodes-of-type')
const isUrl = require('is-url')
const fs = require('fs-extra')

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
	const rulesData = getMarkdownData(rulesDir)
	const glossaryData = getMarkdownData(glossaryDir)

	const glossaryUsedInRules = getGlossaryReferencedInRules(rulesData)
	await createGlossaryData(outputDir, 'glossary-used-in-rules.json', glossaryUsedInRules)

	const glossaryUsedInGlossary = getGlossaryReferencedInGlossary(glossaryData)
	await createGlossaryData(outputDir, 'glossary-used-in-glossary.json', glossaryUsedInGlossary)
}

async function createGlossaryData(outputDir, fileName, data) {
	const filePath = `${outputDir}/${fileName}`
	await fs.ensureFile(filePath)
	await fs.writeJson(filePath, data, { spaces: 2 })
}

function getGlossaryReferencedInGlossary(glossaryData) {
	return glossaryData.reduce((out, { frontmatter, markdownAST }) => {
		const links = getGlossaryLinks(markdownAST)
		if (!links || !links.length) {
			return out
		}
		const key = `#${frontmatter.key}`
		if (!out[key]) {
			out[key] = []
		}
		out[key] = out[key].concat(links)
		return out
	}, {})
}

function getGlossaryReferencedInRules(rulesData) {
	return rulesData.reduce((out, { frontmatter, markdownAST }) => {
		const links = getGlossaryLinks(markdownAST)
		if (!links || !links.length) {
			return out
		}
		links.forEach(key => {
			const usage = {
				name: frontmatter.name,
				slug: `rules/${frontmatter.id}`,
			}
			if (!out[key]) {
				out[key] = [usage]
				return
			}
			const exists = out[key].some(u => u.slug === usage.slug)
			if (exists) {
				return
			}
			out[key] = out[key].concat(usage)
		})
		return out
	}, {})
}

function getGlossaryLinks(markdownAST) {
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
