import {Calendar} from 'antd'
import {ConfigButton, HelpButton, Page} from 'components'
import React from 'react'


export default class EventsPage extends Page {

    render = () =>
        <>
            <Page.Header title='Events'>
                <ConfigButton />
                <HelpButton />
            </Page.Header>
            <Calendar />
        </>

}
