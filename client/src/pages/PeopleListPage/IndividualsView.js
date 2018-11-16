import {Button, Col, Row, Table} from 'antd'
import IndividualEditView from './IndividualEditView'
import React, {Component} from 'react'

export default class IndividualsView extends Component {

    columns = [
        { dataIndex: 'name', key: 'name', title: 'Name', },
    ]

    locale = {
        emptyText: 'No-one on record. Perhaps try adding one?'
    }

    state = {
        dataSource: [],
        editorVisible: false,
        loading: false,
        person: null,
    }

    title = () =>
        <Row>
            <Col span={12}>
                <h2 className='mb0'>Individuals</h2>
            </Col>
            <Col className='align-r' span={12}>
                <Button icon='user-add' onClick={this.onAddPerson} type='primary'>
                    Add Person
                </Button>
            </Col>
        </Row>

    onAddPerson = () =>
        this.setState({ editorVisible: true })

    render = () =>
        <>
            <Table
                bordered
                columns={this.columns}
                dataSource={this.state.dataSource}
                loading={this.state.loading}
                locale={this.locale}
                showHeader={Boolean(this.state.dataSource.length)}
                title={this.title}
            />
            <IndividualEditView person={this.state.person} visible={this.state.editorVisible} />
        </>

}
