const outdent = require('outdent').default
const getChangelog = require('../get-changelog')

describe('taskforce-markdown', () => {
	describe('get-changelog', () => {
		it('returns a static changelog', () => {
			const log = getChangelog()
			expect(log).toBe(outdent`
        ## Changelog

        This is the first version of this ACT rule
      `)
		})
	})
})
