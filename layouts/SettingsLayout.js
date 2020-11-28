import { ClusterOutlined, DesktopOutlined, IdcardOutlined, LockOutlined } from '@ant-design/icons'
import { Layout, Menu, PageHeader } from 'antd'
import { MehOutlined } from '@ant-design/icons'
import Head from 'next/head'
import { useRouter } from 'next/router'


const borderBottom = '1px solid rgb(240, 242, 245)'

export default function SettingsLayout ({ actions, children, title }) {
	const router = useRouter()
	
	// We don't want to show the back arrow on the root settings page.
	const onBack = router.pathname.startsWith('/settings/') ? () => router.push('/settings') : null
	
	const onSelect = ({key}) => router.push(`/settings/${key}`)

	return (
		<>
			<Head>
				<title>{title ? `${title} - Domain` : 'Domain'}</title>
			</Head>
			<Layout>
				<Layout.Sider defaultCollapsed collapsible>
					<div style={{ backgroundColor: 'white',  borderBottom, padding: 25, textAlign: 'center' }}>
						<MehOutlined />
					</div>
					<Menu onClick={onSelect} selectable={false} style={{height: '100%'}}>
						<Menu.Item key='pages' icon={<DesktopOutlined />}>
							Pages
						</Menu.Item>
						<Menu.Item key='people' icon={<IdcardOutlined />}>
							People
						</Menu.Item>
						<Menu.Item key='domains' icon={<ClusterOutlined />}>
							Domains
						</Menu.Item>
						<Menu.Item key='users' icon={<LockOutlined />}>
							Users
						</Menu.Item>
					</Menu>
				</Layout.Sider>
				<Layout.Content>
					<PageHeader extra={actions} ghost={false} onBack={onBack} style={{borderBottom}} title={title} />
					{children}
				</Layout.Content>
			</Layout>
		</>
	)
}