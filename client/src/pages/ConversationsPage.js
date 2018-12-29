import {Button, Input, Select, Tooltip} from 'antd'
import ConversationEditDrawer from '../drawers/ConversationEditDrawer'
import ConversationInfoDrawer from '../drawers/ConversationInfoDrawer'
import {InfoButton, Page} from 'components'
import React from 'react'

// TODO: ACL for who can create conversations with 'create conversation button'
export default class ConversationsPage extends Page {

    state = {
        conversations: [{
            description: 'A general channel for chatting',
            identifier: '343424221412',
            name: 'General',
        }, {
            description: 'Private planning channel',
            identifier: '12312131231',
            name: 'Planning',
        }],
        editVisible: false,
        infoVisible: false,
        messages: [],
        selectedConversation: '343424221412',

        get canCreateConversations () {
            return true
        },
    }

    onClickAdd = () =>
        this.setState({ editVisible: true, identifier: null })

    onClickInfo = () =>
        this.setState({ infoVisible: true })

    onCloseEdit = (updated) =>
        this.setState({ editVisible: false })

    onCloseInfo = () =>
        this.setState({ infoVisible: false })

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
                    <Button
                        className='mr1'
                        icon='plus'
                        onClick={this.onClickAdd}
                        shape='circle'
                        size='large'
                        type='primary'
                    />
                </Tooltip>
            ) :null}
                <InfoButton onClick={this.onClickInfo} />
            </Page.Header>
            <div style={{height: '83vh'}}>
                Conversations Content
            </div>
            <Input autoFocus placeholder='Write your message here' size='large' />
            <ConversationEditDrawer
                identifier={this.state.identifier}
                onClose={this.onCloseEdit}
                visible={this.state.editVisible}
            />
            <ConversationInfoDrawer
                onClose={this.onCloseInfo}
                visible={this.state.infoVisible}
            />
        </main>

}
