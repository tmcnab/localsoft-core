import {Col, Row} from 'antd'
import React, {Component} from 'react'
import {string} from 'prop-types'


export default class DrawerTitle extends Component {

    static propTypes = {
        title: string.isRequired,
    }

    render = () =>
        <Row>
            <Col span={8}>
                <h3 className='mb0' style={{paddingTop: 6}}>
                    {this.props.title}
                </h3>
            </Col>
            <Col className='align-r' span={16}>
                {this.props.children}
            </Col>
        </Row>

}
