const outdent = require('outdent').default
const parsePage = require('../../../utils/parse-page')
const getReferenceLinks = require('../get-reference-links')
const { createGlossary } = require('../../__test-utils')

describe('taskforce-markdown', () => {
	const glossaryBase = {
		hello: outdent`
      Hello [world][]

      [world]: #world
      [w3c]: //w3.org
    `,
		world: outdent`
      World of the [ACT-rules community]

      [act-rules community]: //act-rules.github.io
    `,
		outcome: `All good.`,
	}
	const glossary = createGlossary(glossaryBase)

	describe('get-reference-links', () => {
		it('returns a string', () => {
			const rulePage = parsePage(outdent`
        [hello][], [w3c][]

        [hello]: #hello
        [w3c]: //w3.org 'W3C website'
      `)

			const referenceLinks = getReferenceLinks(rulePage, glossary)
			expect(referenceLinks).toBe(outdent`
        [act-rules community]: //act-rules.github.io
        [hello]: #hello
        [w3c]: //w3.org 'W3C website'
        [world]: #world
      `)
		})
	})
})
