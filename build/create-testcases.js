const assert = require('assert')
const program = require('commander')
const { copy } = require('fs-extra')
const objectHash = require('object-hash')
const codeBlocks = require('gfm-code-blocks')
const createFile = require('../utils/create-file')
const regexps = require('../utils/reg-exps')
const getAllMatchesForRegex = require('../utils/get-all-matches-for-regex')
const createTestcasesJson = require('./testcases/create-testcases-json')
const createTestcasesOfRuleOfEmReportTool = require('./testcases/create-testcases-of-rule-of-em-report-tool')
const getMarkdownData = require('../utils/get-markdown-data')

/**
 * Parse `args`
 */
program
	.option('-r, --rulesDir <rulesDir>', 'Directory containing rules markdown files')
	.option('-t, --testAssetsDir <testAssetsDir>', 'Test assets directory')
	.option('-t, --actRulesCommunityPkgJson <actRulesCommunityPkgJson>', 'Package json file of act rules community')
	.option('-o, --outputDir <outputDir>', 'output directory to create the meta data')
	.parse(process.argv)

/**
 * Invoke
 */
init(program)
	.catch(e => {
		console.error(e)
		process.write(1)
	})
	.finally(() => console.info('Completed'))

/**
 * Create test case files & other meta-data  from test case in each rule.
 * -> create test cases files into `_data` directory
 * -> copy test assets into `_data` directory
 * -> create `testcases.json`
 * These files will be copied into `public` directory during gatsby `preBootstrap` hook/ build
 */
async function init(program) {
	const { rulesDir, testAssetsDir, outputDir, actRulesCommunityPkgJson } = program

	/**
	 * assert `args`
	 */
	assert(rulesDir, '`rulesDir` is required')
	assert(testAssetsDir, 'testAssetsDir is required')
	assert(actRulesCommunityPkgJson, 'actRulesCommunityPkgJson is required')
	assert(outputDir, '`outputDir` is required')

	const actRulesCommunityPkg = require(actRulesCommunityPkgJson)

	/**
	 * Get all rules `markdown` data
	 */
	const rulesData = getMarkdownData(rulesDir)

	let allRulesTestcases = []

	/**
	 * iterate all rule pages
	 * -> get code snippets
	 * -> and their relevant titles
	 */
	for (const { frontmatter, body } of rulesData) {
		const { id: ruleId, name: ruleName, accessibility_requirements: ruleAccessibilityRequirements } = frontmatter

		/**
		 * get all titles of test case examples (eg: #### Failed Example 1)
		 */
		const codeTitles = getAllMatchesForRegex(regexps.testcaseTitle, body)

		/**
		 * get code blocks in markdown body
		 */
		const codeSnippets = codeBlocks(body)

		if (codeTitles.length !== codeSnippets.length) {
			throw new Error(
				`Number of matching titles for code snippets is wrong. Check markdown '${ruleName}' for irregularities.`
			)
		}

		/**
		 * iterate each code snippet
		 * -> create a testcase file
		 * -> and add meta of testcase to `testcases.json`
		 */
		const ruleTestcases = []

		for (const [index, codeSnippet] of codeSnippets.entries()) {
			const title = codeTitles[index]
			if (!title) {
				throw new Error('No title found for code snippet.')
			}

			const { block } = codeSnippet
			let { code, type = 'html' } = codeSnippet

			if (regexps.testcaseCodeSnippetTypeIsSvg.test(block.substring(0, 15))) {
				type = 'svg'
			}
			if (regexps.testcaseCodeSnippetTypeIsXhtml.test(block.substring(0, 15))) {
				type = 'xhtml'
			}

			const codeId = objectHash({ block, type, ruleId })

			const titleCurated = title.value.split(' ').map(t => t.toLowerCase())
			const testcaseFileName = `${ruleId}/${codeId}.${type}`
			const testcasePath = `testcases/${testcaseFileName}`

			if (type === 'html' && !/^\s*\<\!DOCTYPE\s/i.test(code)) {
				code = `<!DOCTYPE html> ${code}`
			}
			if (type === 'xhtml' && !/^\s*\<\!DOCTYPE\s/i.test(code)) {
				code = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd"> ${code}`
			}

			/**
			 * Create testcase file
			 */
			await createFile(`${outputDir}/rules-testcases/${testcasePath}`, code)

			/**
			 * Create meta data for testcase(s)
			 */
			const testcase = {
				testcaseId: codeId,
				testcaseTitle: title.value,
				url: `${actRulesCommunityPkg.www.url}/${testcasePath}`,
				relativePath: testcasePath,
				expected: titleCurated[0],
				ruleId,
				ruleName,
				rulePage: `${actRulesCommunityPkg.www.url}/rules/${ruleId}`,
				ruleAccessibilityRequirements,
			}
			ruleTestcases.push(testcase)
		}

		// add rule testcases to all testcases
		allRulesTestcases = allRulesTestcases.concat(ruleTestcases)

		/**
		 * Create test cases of rule for use with `em report tool`
		 */
		await createTestcasesOfRuleOfEmReportTool(
			{
				ruleId,
				ruleName,
				ruleTestcases,
				ruleAccessibilityRequirements,
			},
			actRulesCommunityPkg
		)
	}

	/**
	 * Copy test assets that are used by `testcases`
	 */
	const assetsDirName = testAssetsDir.split('/').pop()
	await copy(`${testAssetsDir}`, `${outputDir}/rules-testcases/${assetsDirName}`)

	/**
	 * Generate `testcases.json`
	 */
	await createTestcasesJson(allRulesTestcases, actRulesCommunityPkg)
}
