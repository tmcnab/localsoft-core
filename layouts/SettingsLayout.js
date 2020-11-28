import { ClusterOutlined, DesktopOutlined, IdcardOutlined, LockOutlined } from '@ant-design/icons'
import { Layout, Menu, PageHeader } from 'antd'
import { MehOutlined } from '@ant-design/icons'
import Head from 'next/head'
import { useRouter } from 'next/router'


const borderBottom = '1px solid rgb(240, 242, 245)'

export default function SettingsLayout ({ actions, children, title }) {
	const router = useRouter()
	const onClick = ({key}) => router.push(`/settings/${key}`)

	return (
		<>
			<Head>
				<title>{title ? `${title} - Domain` : 'Domain'}</title>
			</Head>
			<Layout>
				<Layout.Sider defaultCollapsed>
					<div style={{ backgroundColor: 'white',  borderBottom, padding: 25, textAlign: 'center' }}>
						<MehOutlined />
					</div>
					<Menu onClick={onClick} selectable={false} style={{height: '100%'}}>
						<Menu.Item key='users' icon={<LockOutlined />}>
							Users
						</Menu.Item>
						<Menu.Item key='tenants' icon={<ClusterOutlined />}>
							Tenants
						</Menu.Item>
					</Menu>
				</Layout.Sider>
				<Layout.Content style={{backgroundColor: 'white'}}>
					<PageHeader extra={actions} ghost={false} style={{borderBottom}} title={title} />
					<div style={{padding: '16px 24px'}}>
						{children}
					</div>
				</Layout.Content>
			</Layout>
		</>
	)
}