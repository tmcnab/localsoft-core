import { ContactsFilled } from '@ant-design/icons'
import { Layout, Menu, PageHeader } from 'antd'
import Head from 'next/head'
import Link from 'next/link'

export default function PrivateLayout ({children, title, ...pageheaderProps}) {
    return (
        <>
            <Head>
                <title>{title ? `${title} - Domain` : 'Domain'}</title>
            </Head>
            <Layout>
                <Layout.Sider defaultCollapsed collapsible>
                    <Menu theme='dark'>
                        <Menu.Item href='/people' key='people' icon={<ContactsFilled />}>People</Menu.Item>
                    </Menu>
                </Layout.Sider>
                <Layout.Content>
                    <PageHeader ghost={false} title={title} {...pageheaderProps} />
                    {children}
                </Layout.Content>
            </Layout>
        </>
    )
}