const scUrls = require('../../_data/sc-urls.json')

const requirementType = 'success criterion'
const latestWcagVersion = '2.1'
const highestLevel = 'AAA'

// For WCAG SC. Title, URL and more is grabbed from data fetched during build.
function getWcagCriterion(scNumber) {
	if (!scUrls[scNumber]) {
		return fallbackCriterion(scNumber)
	}

	const { num, url, handle, wcagType, level } = scUrls[scNumber]
	return {
		requirementType,
		conformanceLevel: getConformanceLevel(wcagType, level),
		title: `${num} ${handle} (Level ${level})`,
		shortTitle: `${num} ${handle}`,
		url,
	}
}

function getConformanceLevel(wcagVersion, level) {
	let conformanceLevel = `WCAG ${wcagVersion}`
	if (wcagVersion !== latestWcagVersion) {
		conformanceLevel += ' and later'
	}
	conformanceLevel += ` on level ${level}`
	if (level !== highestLevel) {
		conformanceLevel += ' and higher'
	}
	return conformanceLevel
}

function fallbackCriterion(scNumber) {
	return {
		requirementType,
		title: `${scNumber} Unknown success criterion`,
		url: 'https://www.w3.org/TR/WCAG21/',
	}
}

module.exports = { getWcagCriterion }
