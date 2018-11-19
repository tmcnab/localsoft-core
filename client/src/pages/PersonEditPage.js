import {Button} from 'antd'
import {ConfigButton, HelpButton, Page} from 'components'
import React from 'react'


export default class PersonEditPage extends Page {

    state = {
        person: null,
    }

    onAbandonClick = () =>
        this.props.history.push('/people/')

    render = () =>
        <>
            <Page.Header title='Editing Person'>
                <Button className='mr1' icon='check' type='primary'>
                    Save
                </Button>
                <Button className='mr1' icon='stop' onClick={this.onAbandonClick} type='danger'>
                    Abandon
                </Button>
                <ConfigButton />
                <HelpButton />
            </Page.Header>
        </>

}
