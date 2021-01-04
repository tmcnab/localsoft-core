import { Layout } from 'antd'

export default function CustomLayout ({ children }) {
	return (
		<>
			<style type='text/css'>
			{`
				#__next, #__next .ant-layout#root {
					height: 100vh;
				}
			`}
			</style>
			<Layout id='root'>
				<Layout.Sider>
					Sider
				</Layout.Sider>
				<Layout>
					<Layout.Content>
						{children}
					</Layout.Content>
					<Layout.Footer>
						Footer
					</Layout.Footer>
				</Layout>
			</Layout>
		</>
	)
}