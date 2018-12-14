import {bool, func} from 'propTypes'
import {Drawer} from 'antd'
import React, {Component} from 'react'


export default class PageInfoDrawer extends Component {

    static propTypes = {
        onClose: func.isRequired,
        visible: bool.isRequired,
    }

    render = () =>
        <Drawer onClose={this.props.onClose} placement='right' title='Info: Pages' visible={this.props.visible} width={768}>
            <p>Help section up top.</p>
            <hr />
            <p>Configuration section down here</p>
            <ul>
                <li></li>
            </ul>
        </Drawer>

}
