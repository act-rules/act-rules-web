const outdent = require('outdent').default
const getAcknowledgements = require('../get-acknowledgements')

describe('taskforce-markdown', () => {
	describe('get-acknowledgements', () => {
		const acknowledgements = {
			beans: ['great'],
			Assets: ['Some text', 'Some other text'],
			previous_authors: ['Audrey Maniez', 'Random Person'],
			authors: ['Wilco Fiers'],
		}

		it('returns a string', () => {
			const frontmatter = { acknowledgements }
			const ackn = getAcknowledgements({ frontmatter })
			expect(ackn).toBe(outdent`
        ## Acknowledgements
        
        This rule was written in the [ACT Rules community group](https://w3.org/community/act-r/), 
        with the support of the EU-funded [WAI-Tools Project](https://www.w3.org/WAI/about/projects/wai-tools/).
        
        ### Authors
        
        - [Wilco Fiers](https://github.com/wilcofiers)
        
        ### Previous Authors
        
        - [Audrey Maniez](https://github.com/audreymaniez)
        - Random Person
        
        ### Assets
        
        - Some text
        - Some other text
        
        ### Beans
        
        - great
			`)
		})
	})
})
