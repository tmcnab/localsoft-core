import {bool, func, string} from 'propTypes'
import {Button, Col, Drawer, Row, Tooltip} from 'antd'
import React, {Component} from 'react'


export default class PageEditDrawer extends Component {

    static propTypes = {
        identifier: string,
        onClose: func.isRequired,
        visible: bool.isRequired,
    }

    state = {
        page: null,
    }

    title = () =>
        <Row>
            <Col span={8}>
                <h3 className='mb0'>{this.props.identifier ? 'Editing' : 'Creating'} Page</h3>
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

    componentDidMount = async () => {
        // TODO:
    }

    render = () =>
        <Drawer closable={false} onClose={this.props.onClose} maskClosable={false} placement='right' title={this.title()} visible={this.props.visible} width={1024}>
            <p>Editing Page here!</p>
        </Drawer>

}
