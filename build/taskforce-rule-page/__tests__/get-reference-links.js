const outdent = require('outdent').default
const parsePage = require('../../../utils/parse-page')
const getReferenceLinks = require('../get-reference-links')

describe('taskforce-markdown', () => {
	describe('get-reference-links', () => {
		it('returns a string', () => {
			const rulePage = parsePage(outdent`
        [hello][], [w3c][]

        [hello]: #hello
        [w3c]: //w3.org 'W3C website'
      `)

			const referenceLinks = getReferenceLinks(rulePage, [])
			expect(referenceLinks).toBe(outdent`
        [hello]: #hello
        [w3c]: //w3.org 'W3C website'
      `)
		})
	})
})
