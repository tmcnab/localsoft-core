import { Button, Card, Col, Form, Input, Row } from 'antd'
import { gql, useApolloClient, useMutation } from '@apollo/client'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import { useState } from 'react'
import PublicLayout from 'layouts/PublicLayout'

export default function SignIn () {
    const client = useApolloClient()
    const errorState = useState()
    const router = useRouter()
    const [signIn] = useMutation(gql`
        mutation ($email: String!, $password: String!) {
            signIn (email: $email, password: $password) {
                id
            }
        }
    `)

    const onFinish = async (variables) => {
        try {
            await client.resetStore()
            const result = await signIn({ variables })            
            console.dir('SignIn:onFinish', result)
        } catch (error) {
            console.error('SignIn:onFinish:catch', error)
        }
    }

	return (
		<PublicLayout title='Sign In'>
            <Row>
                <Col />
                <Col>
                    <Card title='Sign In'>
                        <Form colon={false} layout='vertical' onFinish={onFinish} requiredMark='optional'>
                            <Form.Item label='Email Address' name='email' rules={[{ required: true }]}>
                                <Input placeholder='user@domain.tld' prefix={<MailOutlined />} type='email' />
                            </Form.Item>
                            <br />
                            <Form.Item label='Password' name='password' rules={[{ required: true }]}>
                                <Input placeholder='••••••••' prefix={<LockOutlined />} type='password' />
                            </Form.Item>
                            <br />
                            <Form.Item>
                                <Button htmlType='submit' type='primary'>Submit</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
                <Col />
            </Row>
		</PublicLayout>
	)
}