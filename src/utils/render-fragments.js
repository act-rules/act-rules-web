import React from 'react'
import { Link } from 'gatsby'
import glossaryUsages from './../../_data/glossary-usages.json'
import implementationMetrics from './../../_data/implementation-metrics.json'
import rulesUsages from './../../_data/rules-usages.json'

export const getImplementationsTabulation = (implementers, cls = 'compact', ruleId) => {
	return (
		<table className={cls}>
			<thead>
				<tr>
					<th>Tool Name</th>
					<th>Created By</th>
					<th>Report</th>
				</tr>
			</thead>
			<tbody>
				{implementers.map(row => {
					const { organisation, tool } = row
					const filename = tool
						.split(' ')
						.join('-')
						.toLowerCase()
					const reportUrl = ruleId ? `/implementation/${filename}#${ruleId}` : `/implementation/${filename}`
					return (
						<tr key={tool}>
							<td>{tool}</td>
							<td>{organisation}</td>
							<td>
								<a href={reportUrl}>View Report</a>
							</td>
						</tr>
					)
				})}
			</tbody>
		</table>
	)
}

const getCompleteImplementations = metrics => {
	return metrics.filter(metric => {
		const implementation = metric.implementation[0]
		const { complete, incorrect } = implementation
		return !!complete && !incorrect.length
	})
}

export const getImplementationsLink = slug => {
	const ruleId = slug.replace('rules/', '')
	const metrics = implementationMetrics[ruleId]
	if (!metrics) {
		return null
	}
	return (
		<li>
			<a href="#implementation-metrics">Implementations ({getCompleteImplementations(metrics).length})</a>
		</li>
	)
}

export const getImplementations = slug => {
	const ruleId = slug.replace('rules/', '')
	const metrics = implementationMetrics[ruleId]
	if (!metrics) {
		return null
	}
	return (
		<>
			<a id="implementation-metrics" href="#implementation-metrics">
				<h2>Implementations</h2>
			</a>
			{getImplementationsTabulation(getCompleteImplementations(metrics), 'compact', ruleId)}
		</>
	)
}

export const getImplementationsCount = slug => {
	const ruleId = slug.replace('rules/', '')
	const metrics = implementationMetrics[ruleId]
	if (!metrics) {
		return null
	}
	return (
		<div className="side-notes">
			<div className="meta">
				<span className="heading">Implementations: {getCompleteImplementations(metrics).length}</span>
			</div>
		</div>
	)
}

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
						<i>
							key: <u>{key}</u>
						</i>
						<div dangerouslySetInnerHTML={{ __html: html }} />
					</article>
				)
			})}
		</>
	)
}

export const getGlossaryUsedLink = (slug, allGlossary) => {
	const usedKeys = getGlossaryItemsUsedInRule(slug)
	if (!usedKeys) {
		return null
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
		<li>
			<a href="#glossary-listing">Glossary</a>
		</li>
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

export function getRuleType(rule_type) {
	if (!rule_type) {
		return null
	}
	return (
		<li>
			<span className="heading">Rule Type</span>
			<span>{rule_type}</span>
		</li>
	)
}

export function getInputAspects(aspects, ruleFormatInputAspects) {
	if (!aspects) {
		return null
	}
	return (
		<>
			<span className="heading">Input Aspects</span>
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

export function getRuleUsageInRules(ruleId) {
	const usages = rulesUsages[ruleId]
	if (!usages) {
		return null
	}
	return (
		<div className="side-notes">
			<div className="meta">
				<span className="heading">Used in rules</span>
				<ul>
					{usages.map(usage => (
						<li key={usage.slug}>
							<Link key={usage.slug} to={usage.slug}>
								{usage.name}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

/**
 * Get formatted date from unix timestamp
 * @param {String} unixtimestamp UNIX timestamp
 */
export function getDateTimeFromUnixTimestamp(unixtimestamp) {
	const months_arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	const date = new Date(unixtimestamp * 1000)
	const year = date.getFullYear()
	const month = months_arr[date.getMonth()]
	const day = date.getDate()

	return `${month} ${day}, ${year}`
}
