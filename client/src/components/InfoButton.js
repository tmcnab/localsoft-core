import {Button, Tooltip} from 'antd'
import React, {Component} from 'react'


export default class InfoButton extends Component {

    render = () =>
        <Tooltip placement='bottomRight' title='View additional information about this feature.'>
            <Button icon='question' onClick={this.props.onClick} size='large' shape='circle' />
        </Tooltip>

}