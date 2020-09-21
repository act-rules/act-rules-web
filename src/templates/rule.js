import React from 'react'
import { graphql, Link } from 'gatsby'
import showdown from 'showdown'
import { format } from 'date-fns'
import SEO from '../components/seo'
import Layout from '../components/layout'
import Acknowledgments from '../components/acknowledgments'
import Glossary from '../components/glossary'
import AccessibilityRequirements from '../components/accessibility_requirements'
import ListOfImplementers from '../components/list-of-implementers'
import RuleTableOfContents from '../components/rule-table-of-contents'
import ListWithHeading from '../components/list-with-heading'
import rulesUsages from '../../_data/rules-usages.json'
import curateGitUrl from '../../utils/curate-git-url'
import implementers from '../../_data/implementers.json'

import './rule.scss'

export default ({ location, data }) => {
	const { rule, allRules, allGlossary, site } = data
	const { html, frontmatter, tableOfContents, fields } = rule
	const { fastmatterAttributes, changelog, fileName } = fields
	const { relativePath } = fileName
	const ruleChangelog = JSON.parse(changelog)
	const parsedFrontmatter = JSON.parse(fastmatterAttributes)
	const converter = new showdown.Converter()
	const { repository, config, contributors } = JSON.parse(site.siteMetadata.actRulesPackage)
	const repositoryUrl = curateGitUrl(repository.url)
	const ruleId = frontmatter.id
	const ruleTestcasesUrl = `/testcases/${ruleId}/rule-${ruleId}-testcases-for-em-report-tool.json`
	const proposeChangeUrl = `${repositoryUrl}/edit/develop/_rules/${relativePath}`
	const changelogUrl = `/rules/${ruleId}/changelog`
	const issuesUrl = `${repositoryUrl}/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+${ruleId}+`
	const ruleFormatInputAspects = config['rule-format-metadata']['input-aspects']
	const usedInRules = rulesUsages[ruleId]
	const validImplementers = implementers.filter(({ actMapping }) => {
		const validMappings = actMapping.filter(({ ruleId: mappedRuleId, consistency }) => {
			return mappedRuleId === ruleId && ['consistent', 'partially-consistent'].includes(consistency)
		})

		return validMappings.length > 0
	})

	return (
		<Layout location={location}>
			<SEO title={`Rule | ${frontmatter.name}`} />
			<section className="page-rule">
				{/* rule content */}
				<header>
					{/* title */}
					<h1
						dangerouslySetInnerHTML={{
							__html: converter.makeHtml(frontmatter.name),
						}}
					/>
				</header>
				{/* frontmatter */}
				<ul className="meta">
					{frontmatter.rule_type && (
						<li>
							<span className="heading">Rule Type:</span>
							<span>{frontmatter.rule_type}</span>
						</li>
					)}
					<li>
						<span className="heading">Rule Id:</span>
						<span> {ruleId}</span>
					</li>
					<li>
						<span className="heading">Last modified:</span>
						<span>
							{' '}
							{ruleChangelog && ruleChangelog.length ? format(new Date(ruleChangelog[0].date), 'MMM dd, yyyy') : '-'}
						</span>
					</li>
					<li>
						<AccessibilityRequirements accessibility_requirements={parsedFrontmatter.accessibility_requirements} />
					</li>
					{usedInRules && usedInRules.length > 0 && (
						<li>
							<ListWithHeading
								cls={`side-notes`}
								headingTemplate={() => <span className="heading">Used in rules:</span>}
								itemTemplate={item => (
									<li key={item.slug}>
										<Link to={`/${item.slug}`}>
											<span
												dangerouslySetInnerHTML={{
													__html: converter.makeHtml(item.name),
												}}
											/>
										</Link>
									</li>
								)}
								items={usedInRules}
							/>
						</li>
					)}
					{frontmatter.input_aspects && frontmatter.input_aspects.length && (
						<li>
							<ListWithHeading
								cls={`side-notes`}
								headingTemplate={() => <span className="heading">Input Aspects:</span>}
								itemTemplate={aspect => {
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
								}}
								items={frontmatter.input_aspects}
							/>
						</li>
					)}
					{frontmatter.input_rules && frontmatter.input_rules.length && (
						<li>
							<ListWithHeading
								cls={`side-notes`}
								headingTemplate={() => <span className="heading">Input Rules:</span>}
								itemTemplate={inputRuleId => {
									const atomicRule = allRules.edges.find(rule => rule.node.frontmatter.id === inputRuleId)
									const aHref = atomicRule.node.fields.slug.replace('rules/', '')
									const name = atomicRule.node.frontmatter.name
									return (
										<li key={inputRuleId}>
											<a
												className="sc-item block"
												href={aHref}
												dangerouslySetInnerHTML={{
													__html: converter.makeHtml(name),
												}}
											></a>
										</li>
									)
								}}
								items={frontmatter.input_rules}
							/>
						</li>
					)}
				</ul>
				<hr />
				{/* Description */}
				<h2 id="description">
					<a href="#description" aria-label="description permalink" className="anchor before">
						<svg aria-hidden="true" focusable="false" height="16" viewBox="0 0 16 16" width="16">
							<path
								fillRule="evenodd"
								d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
							></path>
						</svg>
					</a>
					Description
				</h2>
				<div
					dangerouslySetInnerHTML={{
						__html: converter.makeHtml(frontmatter.description),
					}}
				/>
				{/* html content */}
				<div
					dangerouslySetInnerHTML={{
						__html: html,
					}}
				/>
				<hr />
				{/* glossary */}
				<Glossary ruleId={ruleId} glossaryData={allGlossary} />
				<hr />
				{/* Useful links */}
				<a href="#useful-links" id="useful-links">
					<h2>Useful Links</h2>
				</a>
				<ul>
					<li>
						<a target="_blank" rel="noopener noreferrer" href={issuesUrl}>
							Github issues related to this rule
						</a>
					</li>
					<li>
						<a rel="noopener noreferrer" href={changelogUrl}>
							Changelog
						</a>
					</li>
					<li>
						<a target="_blank" rel="noopener noreferrer" href={proposeChangeUrl}>
							Propose a change to the rule
						</a>
					</li>
					<li>
						<a target="_blank" rel="noopener noreferrer" href={ruleTestcasesUrl}>
							Test case file for use in the WCAG-EM Report Tool
						</a>
					</li>
				</ul>
				<hr />
				{/* implementations */}
				<>
					<a id="implementation-metrics" href="#implementation-metrics">
						<h2>Implementations</h2>
					</a>
					<p>
						This section is not part of the official rule. It is populated dynamically and not accounted for in the
						change history or the last modified date. This section will not be included in the rule when it is published
						on the W3C website.
					</p>
					<ListOfImplementers implementers={validImplementers} ruleId={ruleId} />
				</>
				{/* Acknowledgments */}
				<Acknowledgments
					scrollLinkId={`acknowledgments`}
					items={parsedFrontmatter.acknowledgments || parsedFrontmatter.acknowledgements}
					contributors={contributors}
				/>
			</section>
			{/* Toc */}
			<RuleTableOfContents toc={tableOfContents} />
		</Layout>
	)
}

export const query = graphql`
	query($slug: String!) {
		rule: markdownRemark(fields: { slug: { eq: $slug } }) {
			html
			tableOfContents
			frontmatter {
				id
				name
				rule_type
				description
				input_aspects
				input_rules
			}
			fields {
				fileName {
					relativePath
				}
				slug
				fastmatterAttributes
				changelog
			}
		}
		allRules: allMarkdownRemark(filter: { fields: { markdownType: { eq: "rules" } } }) {
			totalCount
			edges {
				node {
					fields {
						fileName {
							relativePath
						}
						markdownType
						slug
					}
					frontmatter {
						id
						name
					}
				}
			}
		}
		allGlossary: allMarkdownRemark(
			sort: { fields: [frontmatter___title], order: ASC }
			filter: { fields: { markdownType: { eq: "glossary" } } }
		) {
			totalCount
			edges {
				node {
					id
					html
					frontmatter {
						title
						key
					}
					fields {
						markdownType
					}
					excerpt
				}
			}
		}
		site {
			siteMetadata {
				actRulesPackage
			}
		}
	}
`
