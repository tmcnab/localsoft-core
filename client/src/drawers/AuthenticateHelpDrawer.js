import {bool, func} from 'propTypes'
import {Drawer} from 'antd'
import React, {Component} from 'react'


// TODO: this should actually be the sign in page instead of a full page [tmcnab]
export default class FilesHelpDrawer extends Component {

    static propTypes = {
        onClose: func.isRequired,
        visible: bool.isRequired,
    }

    render = () =>
        <Drawer onClose={this.props.onClose} placement='right' title='Help: Signing In' visible={this.props.visible} width={768}>
            <p>To sign in we require your email address and a password you have previously set or had set for you. If
            you have issues signing in please contact your administrator(s).</p>
        </Drawer>

}
