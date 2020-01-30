const createFile = require('../../utils/create-file')

/**
 * Create `testcases.json`
 */
const createTestcasesJson = async (testcases, actRulesCommunityPkg, outputDir) => {
	const {
		www: { url },
		author,
		description,
	} = actRulesCommunityPkg
	const AllTestcasesData = {
		name: `${author.name} test cases`,
		website: url,
		license: `${url}/pages/license/`,
		description,
		count: testcases.length,
		testcases,
	}

	await createFile(`${outputDir}/testcases.json`, JSON.stringify(AllTestcasesData, undefined, 2))
}

module.exports = createTestcasesJson
