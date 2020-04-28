/**
 * Create glossary usages
 * -> for each glossary item (find references in each rule)
 * -> this is saved for later use in `pages/glossary`
 */
const assert = require('assert')
const program = require('commander')
const createFile = require('../utils/create-file')
const getMarkdownData = require('../utils/get-markdown-data')
const getMarkdownAstNodesOfType = require('../utils/get-markdown-ast-nodes-of-type')
const isUrl = require('is-url')

/**
 * Parse `args`
 */
program
	.option('-r, --rulesDir <rulesDir>', 'Directory containing rules markdown files')
	.option('-o, --outputDir <outputDir>', 'output directory to create the meta data')
	.parse(process.argv)

/**
 * Invoke
 */
init(program)
	.then(() => console.info('Completed'))
	.catch(e => {
		console.error(e)
		process.exit(1)
	})

/**
 * Init
 */
async function init({ rulesDir, outputDir }) {
	/**
	 * assert `args`
	 */
	assert(rulesDir, '`rulesDir` is required')
	assert(outputDir, '`outputDir` is required')

	/**
	 * Get all rules `markdown` data
	 */
	const rulesData = getMarkdownData(rulesDir)

	/**
	 * Eg:
	 * {
	 *  `non-empty`: [
	 *    { name: `aria valid ...`, slug: `rules/XXXXX` },
	 *    ....
	 *  ]
	 *  ....
	 * }
	 */
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

	/**
	 * Create `glossary-usages.json`
	 */
	await createFile(`${outputDir}/glossary-usages.json`, JSON.stringify(glossaryUsages, undefined, 2))
}
