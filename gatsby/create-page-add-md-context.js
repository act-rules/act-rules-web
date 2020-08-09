/**
 * Enhance markdown pages with more context
 * -> get all data necessary from `on-create-node` callback
 * -> extend `context` object on `markdown` pages
 */
const getTemplate = require('./get-template')

const allMarkdownRemarkQuery = `{
	allMarkdownRemark {
		edges {
			node {
				rawMarkdownBody
				fields {
					fileName {
						relativePath
					}
					slug
					sourceInstanceName
					markdownType
					fastmatterAttributes
					changelog
				}
				frontmatter {
					name
					title
					rule_type
				}
			}
		}
	}
}
`

const createPageAddMdContext = async ({ graphql, actions }) => {
	const { createPage } = actions
	const { errors, data } = await graphql(allMarkdownRemarkQuery)
	if (errors) {
		throw new Error('GraphQL error: ' + errors.join())
	}

	const { allMarkdownRemark } = data
	const { edges: rulesMarkdownPage } = allMarkdownRemark

	rulesMarkdownPage.forEach(({ node }) => {
		createPage(markdownPage(node))

		if (node.fields.markdownType === `rules`) {
			createPage(changelogPage(node))
		}
	})
}

function markdownPage({ fields, frontmatter }) {
	const { slug, markdownType, fastmatterAttributes, changelog, fileName, sourceInstanceName } = fields
	const title = frontmatter.name || frontmatter.title
	const ruleType = frontmatter.rule_type

	return {
		path: slug,
		component: getTemplate(markdownType, slug),
		context: {
			slug,
			fileName,
			sourceInstanceName,
			markdownType,
			fastmatterAttributes,
			changelog,
			title,
			ruleType,
		},
	}
}

function changelogPage({ fields, frontmatter }) {
	const { slug, changelog, fastmatterAttributes, fileName } = fields
	const title = `Changelog for Rule: ${frontmatter.name || frontmatter.title}`

	return {
		path: `${slug}/changelog`,
		component: getTemplate('changelog'),
		context: { slug, title, changelog, fastmatterAttributes, fileName },
	}
}

module.exports = createPageAddMdContext
