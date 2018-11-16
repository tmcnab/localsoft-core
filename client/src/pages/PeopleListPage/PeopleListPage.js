import {Breadcrumb, Button, Col, Radio, Row} from 'antd'
import {Page} from 'components'
import IndividualsView from './IndividualsView'
import CategoriesView from './CategoriesView'
import React from 'react'


export default class PeopleListPage extends Page {

    state = {
        selectedView: 'IndividualsView',
    }

    onViewChange = (event) =>
        this.setState({
            selectedView: event.target.value
        })

    render = () =>
        <>
            <Row className='mb2'>
                <Col span={19}>
                    <Breadcrumb>
                        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                        <Breadcrumb.Item>People</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
                <Col className='align-r' span={5}>
                    <Radio.Group className='mr1' onChange={this.onViewChange} value={this.state.selectedView}>
                        <Radio.Button value='IndividualsView'>
                            Individuals
                        </Radio.Button>
                        <Radio.Button value='CategoriesView'>
                            Categories
                        </Radio.Button>
                    </Radio.Group>
                    <Button icon='question' onClick={this.showHelp} shape='circle' />
                </Col>
            </Row>
            {this.state.selectedView === 'IndividualsView' ? <IndividualsView /> : null}
            {this.state.selectedView === 'CategoriesView' ? <CategoriesView /> : null}
        </>

}
