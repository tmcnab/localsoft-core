import {Button} from 'antd'
import {ConfigButton, HelpButton, Page} from 'components'
import React from 'react'


export default class PersonListPage extends Page {

    render = () =>
        <>
            <Page.Header title='People'>
                <Button className='mr1' icon='plus' onClick={this.onClickCreatePageButton} type='primary'>
                    Add Person
                </Button>
                <ConfigButton />
                <HelpButton />
            </Page.Header>
            <Page.NotImplemented />
        </>

}
