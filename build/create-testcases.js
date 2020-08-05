const program = require('commander')
const { copy } = require('fs-extra')
const objectHash = require('object-hash')
const createFile = require('../utils/create-file')
const createTestcasesJson = require('./testcases/create-testcases-json')
const createTestcasesOfRuleOfEmReportTool = require('./testcases/create-testcases-of-rule-of-em-report-tool')
const getMarkdownData = require('../utils/get-markdown-data')
const getMarkdownAstNodesOfType = require('../utils/get-markdown-ast-nodes-of-type')

program
	.requiredOption('-r, --rulesDir <rulesDir>', 'Directory containing rules markdown files')
	.requiredOption('-t, --testAssetsDir <testAssetsDir>', 'Test assets directory')
	.requiredOption(
		'-t, --actRulesCommunityPkgJson <actRulesCommunityPkgJson>',
		'Package json file of act rules community'
	)
	.requiredOption('-o, --outputDir <outputDir>', 'output directory to create the meta data')
	.parse(process.argv)

createTestcases(program)
	.then(() => {
		console.info('Completed create-testcases')
	})
	.catch(e => {
		console.error(e)
		process.exit(1)
	})

async function createTestcases(program) {
	const { rulesDir, testAssetsDir, outputDir, actRulesCommunityPkgJson } = program
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
	for (const { frontmatter, markdownAST } of rulesData) {
		const { id: ruleId, name: ruleName, accessibility_requirements: ruleAccessibilityRequirements } = frontmatter

		/**
		 * get all titles of test case examples (eg: #### Failed Example 1)
		 */
		const testcaseTitles = getMarkdownAstNodesOfType(markdownAST, 'heading')
			.filter(({ depth, children }) => {
				return depth === 4 && children && children.length > 0
			})
			.map(({ children }) => {
				const [textNode] = children
				return textNode.value
			})

		/**
		 * get code blocks in markdown body
		 */
		const testcaseCodeSnippets = getMarkdownAstNodesOfType(markdownAST, 'code')
		if (testcaseTitles.length !== testcaseCodeSnippets.length) {
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

		for (const [index, codeSnippet] of testcaseCodeSnippets.entries()) {
			const title = testcaseTitles[index]
			const [expectedOutcome] = title.split(' ')

			const { lang = `html`, value: code } = codeSnippet
			const codeId = objectHash({ code, lang, ruleId })
			const testcasePath = `testcases/${ruleId}/${codeId}.${lang}`
			const codeWithDoctype = wrapCodeWithDoctype(lang, code)

			/**
			 * Create testcase file
			 */
			await createFile(`${outputDir}/${testcasePath}`, codeWithDoctype)

			/**
			 * Create meta data for testcase(s)
			 */
			const testcase = {
				testcaseId: codeId,
				testcaseTitle: title,
				url: `${actRulesCommunityPkg.www.url}/${testcasePath}`,
				relativePath: testcasePath,
				expected: expectedOutcome.toLowerCase(),
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
			actRulesCommunityPkg,
			outputDir
		)
	}

	/**
	 * Copy test assets that are used by `testcases`
	 */
	const assetsDirName = testAssetsDir.split('/').pop()
	await copy(`${testAssetsDir}`, `${outputDir}/${assetsDirName}`)

	/**
	 * Generate `testcases.json`
	 */
	await createTestcasesJson(allRulesTestcases, actRulesCommunityPkg, outputDir)
}

function wrapCodeWithDoctype(lang, code) {
	const doctypeMap = {
		html: `<!DOCTYPE html>`,
		xhtml: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">`,
	}

	if (Object.keys(doctypeMap).includes(lang)) {
		// if given code already containst doctype - return
		if (/<!doctype/i.test(code)) {
			return code
		}

		return `${doctypeMap[lang]} ${code}`
	}

	return code
}
