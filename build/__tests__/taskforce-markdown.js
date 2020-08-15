const outdent = require('outdent').default
const parsePage = require('../../utils/parse-page')
const { createGlossary } = require('../__test-utils')
const { getRuleContents } = require('../taskforce-markdown')

describe('getRuleContents', () => {
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
		const rulePage = parsePage(outdent`
      ---
      id: 123abc
      name: Hello world
      rule_type: atomic
      description: hello world
      acknowledgements:
        authors:
          - Wilco Fiers
      ---
      [hello][], [w3c][]

      [hello]: #hello
      [w3c]: //w3.org 'W3C website'
    `)
		const taskforceMarkdown = getRuleContents({ filename: '123abc.md', ...rulePage }, glossary)

		expect(taskforceMarkdown).toBe(outdent`
      ---
      title: "Hello world"
      permalink: /standards-guidelines/act/rules/123abc/
      ref: /standards-guidelines/act/rules/123abc/
      lang: en
      github:
        repository: w3c/wcag-act-rules
        path: content/123abc.md
      # footer: > # Text in footer in HTML
      #   <p> This is the text in the footer </p>
      ---
      
      Rule Type:
      :   atomic
      
      Rule ID:
      :   123abc
      
      Last Modified:
      :   TODO (format Sep 25, 2019)
      
      ## Description
      
      hello world
      
      [hello][], [w3c][]
      
      ## Glossary
      
      ### Hello
      
      Hello [world][]
      
      ### Outcome
      
      All good.
      
      ### World
      
      World of the [ACT-rules community]
      
      ## Acknowledgements
      
      ### Authors

      - [Wilco Fiers](https://github.com/wilcofiers)
      
      [act-rules community]: //act-rules.github.io
      [hello]: #hello
      [w3c]: //w3.org 'W3C website'
      [world]: #world
    `)
	})
})
