import {bool, func, string} from 'propTypes'
import {Col, Divider, Drawer, Form, Input, Row} from 'antd'
import {cloneDeep} from 'lodash'
import {get, set} from 'lodash'
import React, {Component} from 'react'


const EMPTY_PERSON = Object.seal({
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
    },
    role: 'ANONYMOUS',
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

    state = {
        edited: null,
        record: null,
    }

    title = 'Editing Person'

    onClose = () => {
        this.props.onClose(true)
    }

    onInputChange = (event) => {
        console.log(event.target)
        // TODO
    }

    componentDidMount = async () => {
        if (this.props.identifier) {
            // TODO use gql query here
        } else {
            this.setState({
                edited: cloneDeep(EMPTY_PERSON),
                record: cloneDeep(EMPTY_PERSON),
            })
        }
    }

    inputFor = (name) => {
        const onChange = ({target}) => this.setState({edited: set(this.state.edited, name, target.value)})
        const placeholder = PLACEHOLDERS[name]
        const type = INPUT_TYPES[name] || 'text'
        const value = get(this.state.edited, name, '')
        return <Input name={name} onChange={onChange} placeholder={placeholder} type={type} value={value} />
    }

    render = () =>
        <Drawer onClose={this.onClose} placement='right' title={this.title} visible={this.props.visible} width={768}>
            <Form layout='vertical' onSubmit={this.onSubmit}>
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
                <Divider />
                <Form.Item label='Access'>
                    <Row gutter={8}>
                        <Col span={12}>{this.inputFor('role')}</Col>
                    </Row>
                </Form.Item>
                <Form.Item label='Preferences'>
                    <p>Preferences TODO</p>
                </Form.Item>
                <Form.Item label='Categories'>
                    Tags input here
                </Form.Item>
            </Form>
        </Drawer>

}
