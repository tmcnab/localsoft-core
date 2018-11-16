import {Breadcrumb} from 'antd'
import {} from 'react-router-dom'
import {Page} from 'components'
import React from 'react'


export default class DashboardPage extends Page {

    render = () =>
        <>
            <Breadcrumb>
                <Breadcrumb.Item>
                    Dashboard
                </Breadcrumb.Item>
            </Breadcrumb>
        </>

}
