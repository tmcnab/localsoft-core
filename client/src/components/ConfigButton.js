import {Button, Tooltip} from 'antd'
import React, {Component} from 'react'


export default class ConfigButton extends Component {

    render = () =>
        <Tooltip placement='right' title='View additional configuration options.'>
            <Button className='mr1' icon='setting' shape='circle' />
        </Tooltip>

}
