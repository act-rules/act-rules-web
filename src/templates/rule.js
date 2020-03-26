import React from 'react'
import { graphql } from 'gatsby'
import showdown from 'showdown'

import SEO from '../components/seo'
import Layout from '../components/layout'
import Acknowledgments from '../components/acknowledgments'
import AccessibilityRequirements from '../components/accessibility_requirements'
import ListOfImplementers from '../components/list-of-implementers'
import RuleTableOfContents from '../components/rule-table-of-contents'

import curateGitUrl from '../../utils/curate-git-url'
import {
	getGlossaryUsed,
	getRuleUsageInRules,
	getInputRulesForRule,
	getInputAspects,
	getDateTimeFromUnixTimestamp,
} from './../utils/render-fragments'

import implementers from '../../_data/implementers.json'

import './rule.scss'

export default ({ location, data }) => {
	const { rule, allRules, allGlossary, site } = data
	const { html, frontmatter, tableOfContents, fields } = rule
	const { slug, fastmatterAttributes, changelog, fileName } = fields
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
							{ruleChangelog && ruleChangelog.length ? getDateTimeFromUnixTimestamp(ruleChangelog[0].date) : '-'
							// todo: auto play audio rule merge fails getting git logs, to be investigated
							}
						</span>
					</li>
					<li>
						<AccessibilityRequirements accessibility_requirements={parsedFrontmatter.accessibility_requirements} />
					</li>
					<li>{getRuleUsageInRules(ruleId)}</li>
					<li>{getInputAspects(frontmatter.input_aspects, ruleFormatInputAspects)}</li>
					<li>{getInputRulesForRule(frontmatter.input_rules, allRules.edges, true)}</li>
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
				{getGlossaryUsed(slug, allGlossary)}
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
