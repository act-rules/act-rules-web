const techniquesTitles = require('../../_data/techniques-titles.json')

// For WCAG techniques. Title is grabbed from data fetched during build. URL is handcrafted.
function getWcagTechnique(tecuniqueId) {
	const techniqueId = tecuniqueId.toUpperCase()
	const techniqueName = techniquesTitles[techniqueId] || `Unknown technique`

	return {
		requirementType: 'technique',
		title: `${techniqueId}: ${techniqueName}`,
		shortTitle: `technique ${techniqueId}`,
		url: getTechniqueUrl(tecuniqueId),
	}
}

const technologyMap = {
	aria: 'aria',
	c: 'css',
	f: 'failures',
	flash: 'flash',
	g: 'general',
	h: 'html',
	pdf: 'pdf',
	scr: 'client-side-script',
	sl: 'silverlight',
	sm: 'smil',
	svr: 'server-side-script',
	t: 'text',
}

function getTechniqueUrl(techniqueId) {
	const baseUrl = `https://www.w3.org/WAI/WCAG21/Techniques/`
	techniqueId = techniqueId.toUpperCase()
	const prefix = techniqueId.replace(/[0-9]/g, '').toLowerCase()
	const techniqueType = technologyMap[prefix]

	if (!techniqueType) {
		return baseUrl
	}
	if (!techniquesTitles[techniqueId]) {
		return `${baseUrl}#${techniqueType}`
	}
	return `${baseUrl}${techniqueType}/${techniqueId}`
}

module.exports = { getWcagTechnique }
