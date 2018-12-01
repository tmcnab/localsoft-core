import {Button, Calendar, Tooltip} from 'antd'
import {HelpButton, Page} from 'components'
import EventEditDrawer from 'drawers/EventEditDrawer'
import EventInfoDrawer from 'drawers/EventInfoDrawer'
import React from 'react'


// SEE: https://ant.design/components/calendar/
export default class EventsPage extends Page {

    state = {
        editVisible: false,
        infoVisible: false,
        identifier: null,
    }

    dateCellRender = (date) => {

    }

    list = async () => {
        // TODO: gql query
    }

    monthCellRender = (date) => {

    }

    onPanelChange = (date, mode) => {

    }

    onClickCreate = () =>
        this.setState({
            editVisible: true,
            identifier: null,
        })

    onClickInfo = () =>
        this.setState({infoVisible: true})

    onCloseEdit = (saved = false) =>
        this.setState({editVisible: false}, () => saved ? this.list() : null)

    onCloseInfo = () =>
        this.setState({infoVisible: false})

    onSelect = (date) => {
        console.info('EventsPage.onSelect', date)
    }

    render = () =>
        <main>
            <Page.Header title='Events'>
                <Tooltip placement='right' title='Create a new event'>
                    <Button className='mr1' icon='plus' onClick={this.onClickCreate} size='large' shape='circle' type='primary' />
                </Tooltip>
                <HelpButton onClick={this.onClickInfo} />
            </Page.Header>
            <Calendar onSelect={this.onSelect} />
            <EventEditDrawer identifier={this.state.identifier} onClose={this.onCloseEdit} visible={this.state.editVisible} />
            <EventInfoDrawer onClose={this.onCloseInfo} visible={this.state.infoVisible} />
        </main>

}
