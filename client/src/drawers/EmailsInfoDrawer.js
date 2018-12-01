import {Drawer} from 'antd'
import {bool, func} from 'propTypes'
import React, {Component} from 'react'


export default class EmailsInfoDrawer extends Component {

    static propTypes = {
        onClose: func.isRequired,
        visible: bool.isRequired,
    }

    render = () =>
        <Drawer onClose={this.props.onClose} placement='right' title='Information: Emails' visible={this.props.visible} width={768}>
            <p>There will be some help and information here soon.</p>
        </Drawer>

}
