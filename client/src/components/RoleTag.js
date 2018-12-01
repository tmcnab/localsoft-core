import {bool, role} from 'propTypes'
import {Roles} from 'enums'
import {Tag} from 'antd'
import React, {Component} from 'react'


export default class RoleTag extends Component {

    static defaultProps = {
        closable: false,
    }

    static propTypes = {
        closable: bool,
        role: role.isRequired,
    }

    colors = {
        [Roles.ANONYMOUS]: 'red',
        [Roles.ADMINISTRATOR]: 'blue',
        [Roles.MEMBER]: 'gold',
        [Roles.STAFF]: 'green'
    }

    labels = {
        [Roles.ANONYMOUS]: 'None',
        [Roles.ADMINISTRATOR]: 'Admin',
        [Roles.MEMBER]: 'Members',
        [Roles.STAFF]: 'Staff'
    }


    render = () =>
        <Tag {...this.props} color={this.colors[this.props.role]}>
            {this.labels[this.props.role]}
        </Tag>

}
