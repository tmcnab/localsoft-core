import {bool, func, instanceOf, string} from 'propTypes'
import {Drawer} from 'antd'
import React, {Component} from 'react'


export default class EventEditDrawer extends Component {

    static defaultProps = {
        date: new Date(),
    }

    static propTypes = {
        date: instanceOf(Date),
        identifier: string,
        onClose: func.isRequired,
        visible: bool.isRequired,
    }

    state = {
        event: null,
    }

    title =
        `${this.props.identifier ? 'Editing' : 'Creating'} Event`

    render = () =>
        <Drawer onClose={this.props.onClose} placement='right' title={this.title} visible={this.props.visible} width={768}>
            <p>Editing Event here!</p>
        </Drawer>

}
