import {Button, Radio} from 'antd'
import {ConfigButton, HelpButton, Page} from 'components'
import React from 'react'


export default class FilesPage extends Page {

    state = {
        view: 'grid',
    }

    onViewChange = (event) =>
        this.setState({ view: event.target.value })

    render = () =>
        <>
            <Page.Header title='Files'>
                <Button className='mr1' icon='upload'>Upload</Button>
                <Radio.Group className='mr1' onChange={this.onViewChange} value={this.state.view}>
                    <Radio.Button value='grid'>Grid</Radio.Button>
                    <Radio.Button value='list'>List</Radio.Button>
                </Radio.Group>
                <ConfigButton />
                <HelpButton />
            </Page.Header>
            <Page.NotImplemented />
        </>

}
