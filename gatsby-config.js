require('dotenv').config({
	path: `.env.${process.env.NODE_ENV}`,
})

const packageJson = require('./package.json')
const {
	config: { actRulesCommunityPkgJson, actRulesCommunityRulesDir, actRulesCommunityPagesDir },
} = packageJson
const actRulesPackageJson = require(`${__dirname}/${actRulesCommunityPkgJson}`)

module.exports = {
	siteMetadata: {
		actRulesPackage: JSON.stringify(actRulesPackageJson),
	},
	plugins: [
		{
			resolve: `gatsby-plugin-env-variables`,
			options: {
				whitelist: ['GITHUB_TOKEN'],
			},
		},
		`gatsby-plugin-react-helmet`,
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `gatsby-starter-default`,
				start_url: `/`,

				icon: `src/images/logo.png`,
			},
		},
		{
			resolve: `gatsby-plugin-prefetch-google-fonts`,
			options: {
				fonts: [
					{
						family: `Lora`,
						variants: [`400`, `700`],
					},
					{
						family: `Roboto`,
						variants: [`400`, `700`],
					},
				],
			},
		},
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				plugins: [
					{
						resolve: `modify-heading`,
						options: {
							matchPath: /pages\/glossary\//,
							matchHeadingDepths: [4],
							getHeading: (currentValue, frontmatter) => {
								return `${currentValue} for ${frontmatter.title}`
							},
						},
					},
					{
						resolve: `swap-heading-level`,
						options: {
							matchPath: /pages\/glossary\//,
							fromHeadingDepth: 4,
							toHeadingDepth: 3,
						},
					},

					`gatsby-remark-autolink-headers`,
					`gatsby-remark-copy-linked-files`,
					`gatsby-remark-prismjs`,
				],
			},
		},
		`gatsby-plugin-sass`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/images`,
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'rules',
				path: `${__dirname}/${actRulesCommunityRulesDir}`,
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'pages',
				path: `${__dirname}/${actRulesCommunityPagesDir}`,
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'data',
				path: `${__dirname}/_data`,
			},
		},
	],
}
