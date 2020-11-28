import { Layout } from 'antd'
import Head from 'next/head'
import { bool, string } from 'prop-types'

export default function PublicLayout ({children, title}) {
	return (
		<>
			<Head>
				<title>{title ? `${title} - Domain` : 'Domain'}</title>
			</Head>
			<Layout>
				<Layout.Header>
					Domain 
				</Layout.Header>
				<Layout.Content>
					{children}
				</Layout.Content>
				<Layout.Footer>
					Footer
				</Layout.Footer>
			</Layout>
		</>
	)
}

PublicLayout.defaultProps = {
	hero: true
}

PublicLayout.propTypes = {
	title: string,
}