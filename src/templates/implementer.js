import React from 'react'
import { graphql } from 'gatsby'
import queryString from 'query-string'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Note from '../components/note'
import ListOfImplementations from '../components/list-of-implementations'

const Implementer = ({ location, data }) => {
	const { title, implementerData } = data.sitePage.context
	const implementerReport = JSON.parse(implementerData)

	const areAllMappingsIncomplete = implementerReport.actMapping.every(({ complete }) => complete === false)
	const showIncomplete = getShowIncomplete(location.search)

	return (
		<Layout location={location}>
			<SEO title={title} />
			<section className="page-container page-implementers">
				<h1>{title}</h1>
				{areAllMappingsIncomplete && !showIncomplete ? (
					<Note
						cls={`invalid`}
						title={`Incomplete Implementation`}
						body={`All implementations provided are incomplete. Kindly submit an amended implementation report.`}
					/>
				) : (
					<>{getPageContent(implementerReport.actMapping, showIncomplete)}</>
				)}
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
 * Get page content
 * @param {Array<Object>} mapping actMapping
 * @param {Boolean} showIncomplete should show incomplete assertions
 */
function getPageContent(mapping, showIncomplete) {
	if (showIncomplete) {
		const incompleteMaps = filterByConsistency(mapping, ['inconsistent'])
		if (!incompleteMaps.length) {
			return <Note cls={`valid`} title={`Well Done`} body={`All submitted implementation reports are complete.`} />
		}
		return <ListOfImplementations mapping={incompleteMaps} showIncomplete={showIncomplete} />
	}

	const completeMaps = filterByConsistency(mapping, ['consistent', 'partially-consistent'])
	return <ListOfImplementations mapping={completeMaps} showIncomplete={showIncomplete} />
}

/**
 * Parse query params to determine of `incomplete` implementations should be shown
 * @param {String} search search string from `location` object
 * @returns {Boolean}
 */
function getShowIncomplete(search) {
	if (!search) {
		return false
	}

	const parsedSearch = queryString.parse(search)
	const { incomplete = false } = parsedSearch
	return incomplete === 'true'
}

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
