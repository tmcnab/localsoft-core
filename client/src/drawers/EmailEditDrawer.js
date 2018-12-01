import {bool, func, string} from 'propTypes'
import {Drawer} from 'antd'
import React, {Component} from 'react'


export default class EmailEditDrawer extends Component {

    static propTypes = {
        identifier: string,
        onClose: func.isRequired,
        visible: bool.isRequired,
    }

    state = {
        email: null,
    }

    title = `${this.props.identifier ? 'Editing' : 'Creating'} Email`

    render = () =>
        <Drawer onClose={this.props.onClose} placement='right' title={this.title} visible={this.props.visible} width={768}>
            <p>Editing File here!</p>
        </Drawer>

}
