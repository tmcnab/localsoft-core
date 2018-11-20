import {Button} from 'antd'
import {ConfigButton, HelpButton, Page} from 'components'
import React from 'react'


export default class ChatPage extends Page {

    render = () =>
        <>
        <Page.Header title='Conversations'>
            <ConfigButton />
            <HelpButton />
        </Page.Header>
            <Page.NotImplemented />
        </>

}
