import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Note from '../components/note'
import ListOfImplementations from '../components/list-of-implementations'
import { filterByConsistency } from './implementer'

import './implementer-incomplete.scss'

const ImplementerIncomplete = ({ location, data }) => {
	const { title, implementerData } = data.sitePage.context
	const implementerReport = JSON.parse(implementerData)
	const incompleteMaps = filterByConsistency(implementerReport.actMapping, ['inconsistent'])

	if (!incompleteMaps.length) {
		return (
			<Layout location={location}>
				<SEO title={title} />
				<section className="page-implementer-incomplete">
					<h1>{title}</h1>
					<Note cls={`valid`} title={`Well Done`} body={`All submitted implementation reports are complete.`} />
				</section>
			</Layout>
		)
	}

	return (
		<Layout location={location}>
			<SEO title={title} />
			<section className="page-container page-implementers">
				<h1>{title}</h1>
				<ListOfImplementations mapping={incompleteMaps} showIncomplete={true} />
			</section>
		</Layout>
	)
}

export default ImplementerIncomplete

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
