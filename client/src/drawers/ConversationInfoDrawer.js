import {Drawer} from 'antd'
import {bool, func} from 'propTypes'
import React, {Component} from 'react'


export default class ConversationInfoDrawer extends Component {

    static propTypes = {
        onClose: func.isRequired,
        visible: bool.isRequired,
    }

    render = () =>
        <Drawer
            onClose={this.props.onClose}
            placement='right'
            title='Information: Conversations'
            visible={this.props.visible}
            width={768}
        >
            <p>There will be some help and information here soon.</p>
            <hr />
            <div>
                <h3>Admin Options</h3>
                <ul>
                    <li>Can MEMBER roles create conversations (other than DMs/private conversations)</li>
                </ul>
            </div>
        </Drawer>

}
