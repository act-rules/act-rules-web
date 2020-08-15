const outdent = require('outdent').default
const parsePage = require('../../../utils/parse-page')
const getGlossary = require('../get-glossary')
const { createGlossary } = require('../../__test-utils')

describe('taskforce-markdown', () => {
	describe('get-glossary', () => {
		const glossaryBase = {
			hello: 'Hello [world](#world).',
			world: 'World!',
			outcome: 'All good.',
		}
		const glossary = createGlossary(glossaryBase)

		it('includes the outcome', () => {
			const rulePage = parsePage('Without definitions [w3](//w3.org)')
			const ruleGlossary = getGlossary(rulePage, glossary)

			expect(ruleGlossary).toBe(['## Glossary', '### Outcome', glossaryBase.outcome].join('\n\n'))
		})

		it('sorts definitions in alphabetic order', () => {
			const rulePage = parsePage(`[hello](#hello), [world](#world)`)
			const ruleGlossary = getGlossary(rulePage, glossary)
			expect(ruleGlossary).toBe(
				[
					'## Glossary',
					'### Hello',
					glossaryBase.hello,
					'### Outcome',
					glossaryBase.outcome,
					'### World',
					glossaryBase.world,
				].join('\n\n')
			)
		})

		it('includes nested definitions', () => {
			const rulePage = parsePage('[hello](#hello)')
			const ruleGlossary = getGlossary(rulePage, glossary)
			expect(ruleGlossary).toBe(
				[
					'## Glossary',
					'### Hello',
					glossaryBase.hello,
					'### Outcome',
					glossaryBase.outcome,
					'### World',
					glossaryBase.world,
				].join('\n\n')
			)
		})

		it('includes footnote links', () => {
			const rulePage = parsePage(outdent`
        [hello][] [world][]

        [hello]: #hello
        [world]: #world
      `)
			const ruleGlossary = getGlossary(rulePage, glossary)
			expect(ruleGlossary).toBe(
				[
					'## Glossary',
					'### Hello',
					glossaryBase.hello,
					'### Outcome',
					glossaryBase.outcome,
					'### World',
					glossaryBase.world,
				].join('\n\n')
			)
		})
	})
})
