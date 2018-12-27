import {bool, func, string} from 'propTypes'
import {Button, Checkbox, Col, Drawer, Form, Input, message, Row, Select, Tooltip} from 'antd'
import {cloneDeep, get, set} from 'lodash'
import {DrawerTitle} from 'components'
import gql from 'gql'
import React, {Component} from 'react'

const EMPTY_INPUT = Object.freeze({
    additionalName: '',
    address: {
        addressCountry: '',
        addressLocality: '',
        addressRegion: '',
        postalCode: '',
        streetAddress: '',
    },
    email: '',
    familyName: '',
    givenName: '',
    preferences: {
        email: true,
        telephone: true,
    },
    role: 'ANONYMOUS',
    tags: [],
    telephone: '',
})

export default class PersonEditDrawer extends Component {

    static propTypes = {
        identifier: string,
        onClose: func.isRequired,
        visible: bool.isRequired,
    }

    placeholders = {
        'additionalName': 'Additional',
        'address.addressCountry': 'Country',
        'address.addressLocality': 'Town / City',
        'address.addressRegion': 'Province/State',
        'address.postalCode': 'Postal Code / ZIP',
        'address.streetAddress': 'Street',
        'email': 'Email: user@domain.tld',
        'familyName': 'Given',
        'givenName': 'Given',
        'preferences.email': 'Contact via Email',
        'preferences.telephone': 'Contact via Telephone',
        'telephone': 'Phone +1 (123) 456-7890',
    }

    state = {
        input: cloneDeep(EMPTY_INPUT),
        saving: false,
        suggestedTags: [],
    }

    types = {
        email: 'email',
        telephone: 'tel',
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.identifier !== prevProps.identifier) {
            if (this.props.identifier) {
                this.query()
            } else {
                this.setState({input: cloneDeep(EMPTY_INPUT)})
            }
        }
    }

    mutate = async () => {
        this.setState({saving: true})
        const {savePerson} = await gql(`
            mutation ($input: PersonInput) {
                savePerson(input: $input)
            }
        `, {input: this.state.input})

        this.setState({saving: false}, () => {
            if (savePerson) {
                this.props.onClose(true)
            } else {
                message.error('There was an error saving.')
            }
        })
    }

    onClickSave = () =>
        this.setState({saving: true}, this.mutate)

    query = async () => {
        this.setState({saving: true})
        const {input, suggestedTags} = await gql(`
            query ($identifier: ID!) {
                input: person(identifier: $identifier) {
                    additionalName
                    address {
                        addressCountry
                        addressLocality
                        addressRegion
                        postalCode
                        streetAddress
                    }
                    email
                    familyName
                    givenName
                    identifier
                    preferences {
                        email
                        telephone
                    }
                    role
                    tags
                    telephone
                }
                suggestedTags: peopleTags
            }
        `, {identifier: this.props.identifier})

        this.setState({input, saving: false, suggestedTags})
    }

    title = () =>
        <DrawerTitle title={`${this.props.identifier ? 'Editing' : 'Creating'} Person`}>
            <Tooltip placement='left' title='Save'>
                <Button className='mr1' icon='check' onClick={this.onClickSave} shape='circle' type='primary' />
            </Tooltip>
            <Tooltip placement='bottom' title='Abandon'>
                <Button icon='cross' onClick={() => this.props.onClose(false)} shape='circle' type='danger' />
            </Tooltip>
        </DrawerTitle>

    checkboxFor = (path) => {
        const checked = get(this.state.input, path, false)
        const label = this.placeholders[path]
        const onChange = ({target}) => this.update(path, target.checked)
        return <Checkbox checked={checked} onChange={onChange}>{label}</Checkbox>
    }

    inputFor = (path) => {
        const onChange = ({target}) => this.update(path, target.value)
        const placeholder = this.placeholders[path]
        const type = this.types[path] || 'text'
        const value = get(this.state.input, path, '')
        return <Input name={path} onChange={onChange} placeholder={placeholder} type={type} value={value} />
    }

    update = (path, value) => {
        const input = cloneDeep(this.state.input)
        set(input, path, value)
        this.setState({input})
    }

    render = () =>
        <Drawer closable={false} onClose={this.props.onClose} maskClosable={false} placement='right' title={this.title()} visible={this.props.visible} width={768}>
            <Form layout='vertical' onSubmit={this.onSubmit} ref={this.formRef}>
                <Form.Item label='Name'>
                    <Row gutter={8}>
                        <Col span={8}>{this.inputFor('givenName')}</Col>
                        <Col span={8}>{this.inputFor('additionalName')}</Col>
                        <Col span={8}>{this.inputFor('familyName')}</Col>
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
                        <Col span={12}>{this.inputFor('address.addressLocality')}</Col>
                        <Col span={12}>{this.inputFor('address.addressRegion')}</Col>
                    </Row>
                    <Row className='mt1' gutter={8}>
                        <Col span={12}>{this.inputFor('address.postalCode')}</Col>
                        {/* https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements */}
                        <Col span={12}>{this.inputFor('address.addressCountry')}</Col>
                    </Row>
                </Form.Item>
                <Row className='mt1' gutter={16}>
                    <Col span={6}>
                        <Form.Item label='Role'>
                            <Select name='role' onChange={value => this.update('role', value)} value={this.state.input.role}>
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
                            <Select mode='tags' onChange={value => this.update('tags', value)} value={this.state.input.tags}>
                                {this.state.suggestedTags.map(tag => <Select.Option key={tag}>{tag}</Select.Option>)}
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
