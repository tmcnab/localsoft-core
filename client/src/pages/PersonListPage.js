import {Button} from 'antd'
import {ConfigButton, HelpButton, Page} from 'components'
import React from 'react'
import uuid from 'uuid'


export default class PersonListPage extends Page {

    onClickCreatePersonButton = () =>
        this.props.history.push(`/people/${uuid.v4()}`)

    render = () =>
        <>
            <Page.Header title='People'>
                <Button className='mr1' icon='plus' onClick={this.onClickCreatePersonButton} type='primary'>
                    Add Person
                </Button>
                <ConfigButton />
                <HelpButton />
            </Page.Header>
            <Page.NotImplemented />
        </>

}
