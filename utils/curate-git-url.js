/**
 * Curate a given URL with
 * @param {String} url given string/ url
 * @returns {String}
 *
 * Example:
 * 		curateGitUrl("git+https://github.com/act-rules/act-rules.github.io.git")
 * yeilds
 * 		"https://github.com/act-rules/act-rules.github.io"
 */
const curateGitUrl = url => {
	const regexToRemove = [/^git\+/, /\.git$/]

	let result = url
	for (const regex of regexToRemove) {
		result = result.replace(regex, '')
	}

	return result
}

module.exports = curateGitUrl
