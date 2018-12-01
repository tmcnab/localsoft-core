import {bool, func, string} from 'propTypes'
import {Button, Checkbox, Col, Drawer, Form, Input, Row, Select, Tooltip} from 'antd'
import {cloneDeep, get, set} from 'lodash'
import gql, {patch} from 'gql'
import React, {Component} from 'react'


const BLANK_RECORD = Object.seal({
    address: {
        country: '',
        locality: '',
        postalCode: '',
        region: '',
        streetAddress: '',
    },
    affiliation: [],
    email: '',
    name: {
        additional: '',
        family: '',
        given: '',
    },
    preferences: {
        email: true,
        telephone: true,
    },
    role: 'ANONYMOUS',
    tags: [],
    telephone: '',
})

const PLACEHOLDERS = {
    'address.country': 'Country',
    'address.locality': 'Town / City',
    'address.postalCode': 'Postal Code / ZIP',
    'address.region': 'Province/State',
    'address.streetAddress': 'Street',
    'email': 'Email: user@domain.tld',
    'name.additional': 'Additional',
    'name.family': 'Given',
    'name.given': 'Given',
    'preferences.email': 'Contact via Email',
    'preferences.telephone': 'Contact via Telephone',
    'telephone': 'Phone +1 (123) 456-7890',
}

const INPUT_TYPES = {
    email: 'email',
    telephone: 'tel',
}

export default class PersonEditDrawer extends Component {

    static propTypes = {
        identifier: string,
        onClose: func.isRequired,
        visible: bool.isRequired,
    }

    constructor (props) {
        super(props)
        this.state = {
            person: cloneDeep(BLANK_RECORD),
            saving: false,
        }
        this.state.person.identifier = props.identifier
    }

    title = () =>
        <Row>
            <Col span={8}>
                <h3 className='mb0'>{this.props.identifier ? 'Editing' : 'Creating'} Person</h3>
            </Col>
            <Col className='align-r' span={16}>
                <Tooltip placement='left' title='Save'>
                    <Button className='mr1' icon='check' onClick={this.onClickSave} shape='circle' type='primary' />
                </Tooltip>
                <Tooltip placement='bottom' title='Abandon'>
                    <Button icon='cross' onClick={this.props.onClose} shape='circle' type='danger' />
                </Tooltip>
            </Col>
        </Row>

    checkboxFor = (path) => {
        const checked = get(this.state.person, path, false)
        const label = PLACEHOLDERS[path]
        const onChange = ({target}) => this.update(path, target.checked)
        return <Checkbox checked={checked} onChange={onChange}>{label}</Checkbox>
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.identifier !== prevProps.identifier) {
            if (this.props.identifier) {
                this.retrieve()
            }
        }
    }

    inputFor = (path) => {
        const onChange = ({target}) => this.update(path, target.value)
        const placeholder = PLACEHOLDERS[path]
        const type = INPUT_TYPES[path] || 'text'
        const value = get(this.state.person, path, '')
        return <Input name={path} onChange={onChange} placeholder={placeholder} type={type} value={value} />
    }

    onClickSave = async () => {
        await patch('people', this.state.person)
        this.props.onClose()
    }

    retrieve = async () => {
        const {person} = await gql(`{
            person(identifier:"${this.props.identifier}") {
                address {
                    country
                    locality
                    postalCode
                    region
                    streetAddress
                }
                email
                identifier
                name {
                    additional
                    family
                    given
                }
                preferences {
                    email
                    telephone
                }
                role
                tags
                telephone
            }
        }`)
        this.setState({person})
    }

    update = (path, value) => {
        const person = cloneDeep(this.state.person)
        set(person, path, value)
        this.setState({person})
    }

    render = () =>
        <Drawer closable={false} onClose={this.props.onClose} maskClosable={false} placement='right' title={this.title()} visible={this.props.visible} width={768}>
            <Form layout='vertical' onSubmit={this.onSubmit} ref={this.formRef}>
                <Form.Item label='Name'>
                    <Row gutter={8}>
                        <Col span={8}>{this.inputFor('name.given')}</Col>
                        <Col span={8}>{this.inputFor('name.additional')}</Col>
                        <Col span={8}>{this.inputFor('name.family')}</Col>
                    </Row>
                </Form.Item>
                <Form.Item label='Contacts'>
                    <Row gutter={8}>
                        <Col span={12}>{this.inputFor('email')}</Col>
                        <Col span={12}>{this.inputFor('telephone')}</Col>
                    </Row>
                </Form.Item>
                <Form.Item label='Address'>
                    {this.inputFor('address.streetAddress')}
                    <Row className='mt1' gutter={8}>
                        <Col span={12}>{this.inputFor('address.locality')}</Col>
                        <Col span={12}>{this.inputFor('address.region')}</Col>
                    </Row>
                    <Row className='mt1' gutter={8}>
                        <Col span={12}>{this.inputFor('address.postalCode')}</Col>
                        <Col span={12}>{this.inputFor('address.country')}</Col>
                    </Row>
                </Form.Item>
                <Row className='mt1' gutter={16}>
                    <Col span={6}>
                        <Form.Item label='Role'>
                            <Select name='role' onChange={value => this.update('role', value)} value={this.state.person.role}>
                                <Select.Option value='ANONYMOUS'>
                                    None
                                </Select.Option>
                                <Select.Option value='MEMBER'>
                                    Member
                                </Select.Option>
                                <Select.Option value='STAFF'>
                                    Staff
                                </Select.Option>
                                <Select.Option value='ADMINISTRATOR'>
                                    Administrator
                                </Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={18}>
                        <Form.Item label='Tags'>
                            <Select mode='tags' onChange={value => this.update('tags', value)} value={this.state.person.tags}>
                                {this.state.person.tags.map(tag => <Select.Option key={tag}>{tag}</Select.Option>)}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item label='Preferences'>
                    <Row className='mt1' gutter={8}>
                        <Col span={12}>{this.checkboxFor('preferences.email')}</Col>
                        <Col span={12}>{this.checkboxFor('preferences.telephone')}</Col>
                    </Row>
                </Form.Item>
                {this.props.identifier ? (
                <Form.Item label='Actions'>
                    <Button className='mr1' disabled onClick={this.onClickResetPassword}>Reset Password</Button>
                    <Button disabled onClick={this.onClickDelete} type='danger'>Delete Person</Button>
                </Form.Item>
                ) : null}
            </Form>
        </Drawer>

}
