import React from 'react'
import glossaryUsages from './../../_data/glossary-usages.json'

export const getGlossaryUsed = (slug, allGlossary) => {
	const usedKeys = getGlossaryItemsUsedInRule(slug)
	// Always show the outcome definition:
	if (!usedKeys.includes('#outcome')) {
		usedKeys.push('#outcome')
	}
	const glossaries = allGlossary.edges.filter(({ node }) => {
		const {
			frontmatter: { key },
		} = node
		return usedKeys.includes(`#${key}`)
	})
	if (!glossaries.length) {
		return null
	}
	return (
		<>
			<a id="glossary-listing" href="#glossary-listing">
				<h2>Glossary</h2>
			</a>
			{glossaries.map(({ node }) => {
				const { frontmatter, html } = node
				const { key } = frontmatter
				return (
					<article key={node.id}>
						<a id={key} href={`#${key}`}>
							<h3>{frontmatter.title}</h3>
						</a>
						<div dangerouslySetInnerHTML={{ __html: html }} />
					</article>
				)
			})}
		</>
	)
}

export const getGlossaryItemsUsedInRule = slug => {
	const keys = []
	Object.keys(glossaryUsages).forEach(key => {
		glossaryUsages[key].forEach(({ slug: s }) => {
			if (s === slug && !keys.includes(key)) {
				keys.push(key)
			}
		})
	})
	return keys
}

export function getInputAspects(aspects, ruleFormatInputAspects) {
	if (!aspects) {
		return null
	}
	return (
		<>
			<span className="heading">Input Aspects:</span>
			<ul>
				{aspects.map(aspect => {
					const aHref = ruleFormatInputAspects[aspect]
						? ruleFormatInputAspects[aspect]
						: ruleFormatInputAspects['default']
					return (
						<li key={aspect}>
							<a className="sc-item block" href={aHref}>
								{aspect}
							</a>
						</li>
					)
				})}
			</ul>
		</>
	)
}

export function getInputRulesForRule(inputRules, allRules, stripBasePath = false) {
	if (!inputRules) {
		return null
	}
	return (
		<div className="side-notes">
			<div className="meta">
				<span className="heading">Input Rules</span>
				<ul>
					{inputRules.map(inputRuleId => {
						const atomicRule = allRules.find(rule => rule.node.frontmatter.id === inputRuleId)
						const aHref = stripBasePath
							? atomicRule.node.fields.slug.replace('rules/', '')
							: atomicRule.node.fields.slug
						const name = atomicRule.node.frontmatter.name
						return (
							<li key={inputRuleId}>
								<a className="sc-item block" href={aHref}>
									{name}
								</a>
							</li>
						)
					})}
				</ul>
			</div>
		</div>
	)
}
