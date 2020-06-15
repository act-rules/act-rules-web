import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'

const NotFoundPage = ({ location }) => (
	<Layout location={location}>
		<SEO title="404: Not found" />
		<section className="page-default">
			<h1>Page Not Found</h1>
			<p>
				The page you are looking for does not exist.
				<br />
				<Link to="/" title="go back to the home page">
					Go back to the home page
				</Link>
			</p>
		</section>
	</Layout>
)

export default NotFoundPage
