import '../styles/PrivateLayout.less'
import { Layout, Menu } from 'antd'
import { UserOutlined } from '@ant-design/icons'

export default function PrivateLayout ({children}) {
    return (
        <Layout>
            <Layout.Sider defaultCollapsed collapsible>
                <Menu theme='dark'>
                    <Menu.Item key='people' icon={<UserOutlined />}>People</Menu.Item>
                </Menu>
            </Layout.Sider>
            <Layout.Content>
                {children}
            </Layout.Content>
        </Layout>
    )
}