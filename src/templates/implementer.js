import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Note from '../components/note'
import ListOfImplementations from '../components/list-of-implementations'

import './implementer.scss'

const Implementer = ({ location, data }) => {
	const { title, implementerData } = data.sitePage.context
	const implementerReport = JSON.parse(implementerData)

	const areAllMappingsIncomplete = implementerReport.actMapping.every(({ complete }) => complete === false)
	const completeMaps = filterByConsistency(implementerReport.actMapping, ['consistent', 'partially-consistent'])

	if (areAllMappingsIncomplete) {
		return (
			<Layout location={location}>
				<SEO title={title} />
				<section className="page-implementer">
					<h1>{title}</h1>
					<Note
						cls={`invalid`}
						title={`Incomplete Implementation`}
						body={`All implementations provided are incomplete. Kindly submit an amended implementation report.`}
					/>
				</section>
			</Layout>
		)
	}

	return (
		<Layout location={location}>
			<SEO title={title} />
			<section className="page-implementer">
				<h1>{title}</h1>
				<ListOfImplementations mapping={completeMaps} showIncomplete={false} />
			</section>
		</Layout>
	)
}

export default Implementer

export const query = graphql`
	query($path: String) {
		sitePage(path: { eq: $path }) {
			context {
				filename
				title
				implementerData
			}
		}
	}
`

/**
 * Filter a given set of implementations based on consistency
 * @param {Array<Object>} items array of implementations
 * @param {Array<String>} values allowed values
 * @returns {Array<Object>}
 */
export function filterByConsistency(items, values) {
	return items.filter(({ consistency }) => {
		return values.includes(consistency)
	})
}
