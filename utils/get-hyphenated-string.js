const getHyphenatedString = (givenString, lowercase = true) => {
	const result = givenString.split(' ').join('-')

	if (!lowercase) {
		return result
	}

	return result.toLowerCase()
}

module.exports = getHyphenatedString
