import {Card, Col, Divider, Row} from 'antd'
import {string} from 'prop-types'
import React, {Component} from 'react'


export default class Page extends Component {

    static propTypes = {
        title: string,
    }

    constructor (props) {
        super(props)

        // TODO get intance name from settings
        const {pageTitle} = this.constructor
        if (pageTitle) {
            document.title = `${pageTitle} • instance name`
        } else {
            document.title = `instance name`
        }
    }

    static Header = class Header extends Component {

        static displayName = 'Page.Header'

        static propTypes = {
            title: string.isRequired,
        }

        render = () =>
            <>
                <Row>
                    <Col span={12}>
                        <h1 className='mb0'>{this.props.title}</h1>
                    </Col>
                    <Col className='align-r' span={12}>
                        {this.props.children}
                    </Col>
                </Row>
                <Divider />
            </>

    }

    static NotImplemented = class NotImplemented extends Component {

        static displayName = 'Page.NotImplemented'

        render = () =>
            <Row>
                <Col span={8} />
                <Col span={8}>
                    <Card title='Heads Up!'>
                        <p>This page hasn't yet been implemented. We'll let you know when it'll be ready as soon as possible!</p>
                        <p>&raquo; localsoft dev team</p>
                    </Card>
                </Col>
                <Col span={8} />
            </Row>

    }

}
