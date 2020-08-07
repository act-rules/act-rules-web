const program = require('commander')
const getMarkdownData = require('../utils/get-markdown-data')
const getMarkdownAstNodesOfType = require('../utils/get-markdown-ast-nodes-of-type')
const isUrl = require('is-url')
const fs = require('fs-extra')

program
	.requiredOption('-r, --rulesDir <rulesDir>', 'Directory containing rules markdown files')
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

async function createGlossaryUsage({ rulesDir, outputDir }) {
	const rulesData = getMarkdownData(rulesDir)
	const glossaryUsages = getGlossaryUsage(rulesData)

	const filePath = `${outputDir}/glossary-usages.json`
	await fs.ensureFile(filePath)
	await fs.writeJson(filePath, glossaryUsages, { spaces: 2 })
}

function getGlossaryUsage(rulesData) {
	const glossaryUsages = {}

	rulesData.forEach(({ frontmatter, markdownAST }) => {
		// get all links -> eg: [Alpha](https://....) or [Beta](#semantic-role)
		const pageLinks = getMarkdownAstNodesOfType(markdownAST, 'link').map(({ url }) => url)
		// get all definition links  -> eg: [alpha]: https:// 'Link to something' or [beta]: #some-glossary 'Def to some glossary'
		const definitionLinks = getMarkdownAstNodesOfType(markdownAST, 'definition').map(({ url }) => url)
		// unique links and filter out url links
		const glossaryRefs = [...new Set([...pageLinks, ...definitionLinks])].filter(link => !isUrl(link))

		glossaryRefs.forEach(key => {
			const usage = {
				name: frontmatter.name,
				slug: `rules/${frontmatter.id}`,
			}
			if (!glossaryUsages[key]) {
				glossaryUsages[key] = [usage]
				return
			}
			const exists = glossaryUsages[key].some(u => u.slug === usage.slug)
			if (exists) {
				return
			}
			glossaryUsages[key] = glossaryUsages[key].concat(usage)
		})
	})
	return glossaryUsages
}
