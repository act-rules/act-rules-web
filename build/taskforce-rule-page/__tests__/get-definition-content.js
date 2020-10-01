const outdent = require('outdent').default
const { createGlossary } = require('../../__test-utils')
const getDefinitionContent = require('../get-definition-content')

describe('getDefinitionContent', () => {
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

	it('runs', () => {
		const taskforceMarkdown = getDefinitionContent('hello', glossary)

		expect(taskforceMarkdown).toBe(outdent`
      ### Hello {#hello}
      Hello [world][]

      [world]: #world
      [w3c]: //w3.org
    `)
	})
})
