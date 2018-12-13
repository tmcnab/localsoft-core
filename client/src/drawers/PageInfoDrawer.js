import {Col, Drawer, Progress, Row} from 'antd'
import {bool, func} from 'propTypes'
import {Formatter} from 'components'
import {get} from 'lodash'
import gql from 'gql'
import React, {Component} from 'react'


export default class PageInfoDrawer extends Component {

    static propTypes = {
        onClose: func.isRequired,
        visible: bool.isRequired,
    }

    render = () =>
        <Drawer onClose={this.props.onClose} placement='right' title='Info: Pages' visible={this.props.visible} width={768}>
            TODO
        </Drawer>

}
