import {Button, Col, Input, Row, Select, Tooltip} from 'antd'
import {InfoButton, Page} from 'components'
import React from 'react'
import {Roles} from '../enums'

// TODO: ACL for who can create conversations with 'create conversation button'
export default class ConversationsPage extends Page {

    state = {
        collapsed: false,
        conversations: [{
            description: 'A general channel for chatting',
            identifier: '343424221412',
            name: 'General',
        }, {
            description: 'Private planning channel',
            identifier: '12312131231',
            name: 'Planning',
        }],
        messages: [],
        selectedConversation: '343424221412',

        get canCreateConversations () {
            return true
        },
    }

    render = () =>
        <main>
            <Page.Header title='Conversations'>
                <Select
                    className='mr1'
                    loading={this.state.loading}
                    size='large'
                    style={{width: '250px'}}
                    value={this.state.selectedConversation}
                >
                {this.state.conversations.map(conversation =>
                    <Select.Option value={conversation.identifier}>
                        {conversation.name}
                    </Select.Option>
                )}
                </Select>
            {this.state.canCreateConversations ? (
                <Tooltip placement='bottom' title='Start a new conversation'>
                    <Button className='mr1' icon='plus' onClick={this.onClickAdd} size='large' shape='circle' type='primary' />
                </Tooltip>
            ) :null}
                <InfoButton onClick={this.onClickInfo} />
            </Page.Header>
            <div style={{height: '83vh'}}>
                Conversations Content
            </div>
            <Input autoFocus placeholder='Write your message here' size='large' />
        </main>

}
