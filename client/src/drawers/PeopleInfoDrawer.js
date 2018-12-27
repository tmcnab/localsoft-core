import {bool, func} from 'propTypes'
import {Button, Drawer, Tooltip} from 'antd'
import {DrawerTitle} from 'components'
import {Roles} from 'enums'
import React, {Component} from 'react'


export default class PeopleInfoDrawer extends Component {

    static propTypes = {
        onClose: func.isRequired,
        visible: bool.isRequired,
    }

    state = {
        loading: false,
        role: Roles.ANONYMOUS,
    }

    title = () =>
        <DrawerTitle title='Info: People'>
            <Tooltip placement='left' title='Close'>
                <Button icon='right' loading={this.state.loading} onClick={() => this.props.onClose(false)} shape='circle' />
            </Tooltip>
        </DrawerTitle>

    render = () =>
        <Drawer closable={false} onClose={this.props.onClose} placement='right' title={this.title()} visible={this.props.visible} width={512}>
            <p>
                This section allows you to manage your organization contacts.
            </p>
            <br />
        {this.state.role === Roles.ADMINISTRATOR ? (
            <>
                <h3>Site Settings</h3>
                <ul>
                    <li>Can users manage their own contact data? y/N</li>
                </ul>

            </>
        ) : null}
        </Drawer>

}
