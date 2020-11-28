import { ContactsFilled, LockOutlined } from '@ant-design/icons'
import { Layout, Menu, PageHeader } from 'antd'
import { MehOutlined } from '@ant-design/icons'
import Head from 'next/head'
import { useRouter } from 'next/router'


const borderBottom = '1px solid rgb(240, 242, 245)'

export default function SettingsLayout ({ actions, children, title }) {
	const router = useRouter()
	const onBack = () => router.push('/settings')
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
						<Menu.Item key='people' icon={<ContactsFilled />}>People</Menu.Item>
						<Menu.Item key='users' icon={<LockOutlined />}>Users</Menu.Item>
					</Menu>
				</Layout.Sider>
				<Layout.Content>
					<PageHeader ghost={false} onBack={onBack} style={{borderBottom}} title={title} />
					{children}
				</Layout.Content>
			</Layout>
		</>
	)
}