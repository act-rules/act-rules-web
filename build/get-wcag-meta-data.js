/**
 * Get meta data of all WCAG success criteria
 * -> Output file: -> `./_data/sc-urls.json`
 * -> This is later used for hyperlinking SC of rules to respective specifications

 * Get titles of all WCAG techniques used in SC
 * -> Output file: -> ./_data/techniques-titles.json
 * -> This is later used for outputting the correct title of the technique
 */
const assert = require('assert')
const program = require('commander')
const axios = require('axios')
const createFile = require('../utils/create-file')

/**
 * Parse `args`
 */
program
	.option('-u, --url <url>', 'URL from which WCAG meta data should be fetched and constructed')
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
async function init({ url, outputDir }) {
	/**
	 * assert `args`
	 */
	assert(url, '`url` is required')
	assert(outputDir, '`outputDir` is required')

	/**
	 * Create a list of success criteria meta data
	 */
	const [scMetaData, techniqueTitles] = await getWaiWcagReferenceData(url)
	await createFile(`${outputDir}/sc-urls.json`, JSON.stringify(scMetaData, undefined, 2))
	await createFile(
		`${outputDir}/techniques-titles.json`,
		JSON.stringify(techniqueTitles, Object.keys(techniqueTitles).sort(), 2)
	)

	/**
	 * Create wcag em report tool friendly audit result array
	 */
	const scEmReportAuditResult = Object.values(scMetaData).map(data => {
		return {
			type: 'Assertion',
			test: data.test,
			assertedBy: '_:evaluator',
			subject: '_:website',
			result: {
				outcome: 'earl:inapplicable',
				description: '',
				date: '',
			},
			mode: 'earl:manual',
			hasPart: [],
		}
	})
	await createFile(`${outputDir}/sc-em-report-audit-result.json`, JSON.stringify(scEmReportAuditResult, undefined, 2))
}

/**
 * Determine if a given success criteria is 2.0
 * @param {Object} sc success criterion
 */
function isScWcag20(sc) {
	const is20 = !(sc.versions && sc.versions.length === 1 && sc.versions.includes('2.1'))
	return is20
}

/**
 * Get enhanced meta data of success criterion
 * @param {Object} sc success criteria
 */
function getMetaData(sc) {
	const urlPrefix = `https://www.w3.org/TR/WCAG21`
	const is20 = isScWcag20(sc)
	const wcagSuffix = is20 ? '20' : '21'
	const path = sc.id.split(':').reverse()[0]
	const url = `${urlPrefix}/#${path}`
	const howToMeetUrl = `https://www.w3.org/WAI/WCAG21/quickref/#${path}`
	const understandingUrl = `https://www.w3.org/WAI/WCAG21/Understanding/${path}.html`
	/**
	 * Construct `test` - used by `wcag em report tool`
	 */
	const testPrefix = sc.id.split(':').shift()
	const testName = sc.alt_id && sc.alt_id.length > 0 ? sc.alt_id : sc.id
	return {
		num: sc.num,
		url,
		scId: sc.id,
		scAltId: sc.alt_id,
		test: `${testPrefix}:${testName}`,
		howToMeetUrl,
		understandingUrl,
		handle: sc.handle,
		level: sc.level,
		wcagType: wcagSuffix.split('').join('.'),
	}
}

/**
 * Get all techniques referenced in a WCAG SC
 * This gets messy because of various ways they are nested in the meta data
 * We just naively and recursively gather all (id, title) pairs where the id starts by "TECH"
 * @param {Object} techs list of techniques used by a SC
 */
function getTechniquesTitles(techs) {
	const techniquesTitles = []
	if (techs && techs.id && techs.id.split(':')[0] === 'TECH' && techs.id !== 'TECH:text' && techs.id !== 'TECH:text1') {
		// We've likely found an actual technique!
		techniquesTitles.push({ id: techs.id, title: techs.title })
	}

	// In any cases, we want to go down to all attributes.
	if (techs instanceof Array) {
		// it's an array of stuff
		techs.forEach(val => techniquesTitles.push(...getTechniquesTitles(val)))
	}
	if (techs instanceof Object) {
		// It can be a nested object, stupidly go down on all keys
		for (const prop in techs) {
			techniquesTitles.push(...getTechniquesTitles(techs[prop]))
		}
	}

	return techniquesTitles
}

/**
 * Get all WCAG SC reference data
 * @param {String} url URL
 */
async function getWaiWcagReferenceData(url) {
	const {
		data: { principles },
	} = await axios.get(url)

	const scMetaData = {}
	const techniquesTitles = []
	principles.forEach(p =>
		p.guidelines.forEach(g =>
			g.successcriteria.forEach(sc => {
				scMetaData[sc.num] = getMetaData(sc)
				techniquesTitles.push(...getTechniquesTitles(sc.techniques))
			})
		)
	)

	// Aggressively cleaning up duplicates. We assume the same key (G10, …) always has the same title.
	const techniques = {}
	techniquesTitles.forEach(({ id, title }) => (techniques[id.split(':')[1]] = title))

	return [scMetaData, techniques]
}
