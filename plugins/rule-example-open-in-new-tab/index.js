const visit = require('unist-util-visit')

module.exports = ({ markdownAST, markdownNode }, pluginOptions) => {
	const { matchPath, headingDepth, title, testcases } = pluginOptions
	const {
		frontmatter: { id: ruleId },
		fields: { slug },
	} = markdownNode
	const rulesTestcases = JSON.parse(testcases)

	/**
	 * Only run on markdown paths that match a given path as option
	 */
	if (!new RegExp(matchPath).test(slug)) {
		return markdownAST
	}

	visit(markdownAST, 'heading', node => {
		if (!node || !node.children || node.depth !== headingDepth) {
			return
		}
		const testcaseHeading = node.children[0].value
		if (!testcaseHeading) {
			return
		}

		const id = testcaseHeading
			.split(' ')
			.map(t => t.toLowerCase())
			.join('-')
		const testcase = rulesTestcases.find(tc => {
			return tc.testcaseTitle === testcaseHeading && tc.ruleId === ruleId
		})

		if (!testcase) {
			return
		}

		/**
		 * Mutate the node
		 */
		node.type = 'html'
		node.value = `
		<div class="open-ex-new-tab-wrapper">
			<h4 
				id="${id}" 
				style="position:relative;">
				<a 
					href="#${id}" 
					aria-label="${testcaseHeading} permalink" 
					class="anchor before">
					<svg 
						aria-hidden="true" 
						focusable="false" 
						height="16" 
						version="1.1" 
						viewBox="0 0 16 16" 
						width="16">
						<path 
							fill-rule="evenodd" 
							d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z">
						</path>
					</svg>
				</a>
				${testcaseHeading}
			</h4>
			<a 
				target="_blank"
				rel="noopener noreferrer"
				href="${testcase.url}"
				aria-label="Open ${testcaseHeading} in a new tab">
				${title}
			</a>
		</div>
		`
	})

	return markdownAST
}
