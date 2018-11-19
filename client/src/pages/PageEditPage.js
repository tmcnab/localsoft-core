import {Button} from 'antd'
import {ConfigButton, HelpButton, Page} from 'components'
import React from 'react'


export default class PagesEditPage extends Page {

    // TODO https://remark.js.org/

    onAbandonClick = () =>
        this.props.history.push('/pages')

    render = () =>
        <>
            <Page.Header title='Editing Page'>
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
