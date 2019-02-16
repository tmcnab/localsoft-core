import {Button, Col, Icon, Layout, Row} from 'antd'
import {FixedContainer} from 'components'
import React, {Component} from 'react'
import {role} from 'propTypes'
import {Roles} from 'enums'


export default class Topbar extends Component {

    static propTypes = {
        role: role.isRequired,
    }

    get logout () {
        return this.props.role === Roles.ANONYMOUS
            ? null
            : <Button ghost icon='logout' shape='circle' />
    }

    get notifications () {
        return this.props.role === Roles.ANONYMOUS ? null : (
            <Icon type="bell" />
        )
    }

    render = () =>
        <Layout.Header style={{backgroundColor: '#333'}}>
            <FixedContainer>
                <Row>
                    <Col span={4} style={{color: 'white', textAlign: 'right'}}>
                        localsoft
                    </Col>
                    <Col span={16} />
                    <Col span={4} style={{color: 'white'}}>
                        {this.notifications}
                        {this.logout}
                    </Col>
                </Row>
            </FixedContainer>
        </Layout.Header>

}
