import {Button, Tooltip} from 'antd'
import React, {Component} from 'react'


export default class HelpButton extends Component {

    render = () =>
        <Tooltip placement='bottomRight' title='View additional information about this feature.'>
            <Button icon='question' shape='circle' />
        </Tooltip>

}
