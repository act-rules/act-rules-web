const outdent = require('outdent').default
const parsePage = require('../utils/parse-page')

function createGlossary(dfnObj) {
	const dfnEntries = Object.entries(dfnObj)
	const dfnStrings = dfnEntries.map(dfnFileContent)
	return dfnStrings.map(parsePage)
}

function dfnFileContent([term, content]) {
	const title = term[0].toUpperCase() + term.substr(1)
	return outdent`
    ---
    title: ${title}
    key: ${term}
    ---
    ${content}
  `
}

module.exports = {
	dfnFileContent,
	createGlossary,
}
