import { Avatar, Layout, Menu, PageHeader } from 'antd'
import { ClusterOutlined, ShopOutlined } from '@ant-design/icons'
import Head from 'next/head'

export default function CustomLayout ({ children, ...props }) {
	return (
		<>
			<style type='text/css'>
			{`
				#__next, #__next .ant-layout#root {
					height: 100vh;
				}
			`}
			</style>
			<Head>
				<title>{props.title}</title>
			</Head>
			<Layout id='root'>
				<Layout.Sider collapsible defaultCollapsed>
					<Avatar icon={<ShopOutlined />} shape='square' size='large' style={{margin: 20}} />
					<Menu mode='inline' theme='dark'>
						<Menu.Item icon={<ClusterOutlined />} key='/!/tenants'>Tenants</Menu.Item>
					</Menu>
				</Layout.Sider>
				<Layout>
					<Layout.Content>
						<PageHeader {...props}>
							{children}
						</PageHeader>
					</Layout.Content>
				</Layout>
			</Layout>
		</>
	)
}