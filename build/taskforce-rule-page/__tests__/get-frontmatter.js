const getFrontmatter = require('../get-frontmatter')
const yaml = require('js-yaml')

function stripDashes(str) {
	return str.replace(/---/g, '')
}

describe('taskforce-markdown', () => {
	const filenameNoExt = 'hello-world-198j8j'
	const ruleData = {
		filename: `${filenameNoExt}.md`,
		frontmatter: {
			name: 'hello world',
		},
	}

	describe('get-frontmatter', () => {
		it('starts and ends with a line of "---"', () => {
			const lines = getFrontmatter(ruleData).split('\n')
			expect(lines[0]).toBe('---')
			expect(lines[lines.length - 1]).toBe('---')
		})

		it('returns valid yaml between the "---"s', () => {
			const frontmatter = getFrontmatter(ruleData)
			const frontmatterData = stripDashes(frontmatter)
			expect(() => {
				yaml.safeLoad(frontmatterData)
			}).not.toThrow()
		})

		it('has the appropriate data in the yaml', () => {
			const frontmatter = getFrontmatter(ruleData)
			const frontmatterData = stripDashes(frontmatter)
			const data = yaml.safeLoad(frontmatterData)

			expect(data).toEqual({
				title: ruleData.frontmatter.name,
				permalink: `/standards-guidelines/act/rules/${filenameNoExt}/`,
				ref: `/standards-guidelines/act/rules/${filenameNoExt}/`,
				lang: 'en',
				github: {
					repository: `w3c/wcag-act-rules`,
					path: `content/${ruleData.filename}`,
				},
			})
		})

		it('does not include markdown in the title', () => {
			const frontmatter = getFrontmatter({
				filename: `${filenameNoExt}.md`,
				frontmatter: {
					name: '`*Hello*` **world, welcome** to _ACT_taskforce_ **',
				},
			})
			const frontmatterData = stripDashes(frontmatter)
			const data = yaml.safeLoad(frontmatterData)

			expect(data).toHaveProperty('title', '*Hello* world, welcome to ACT_taskforce **')
		})
	})
})
