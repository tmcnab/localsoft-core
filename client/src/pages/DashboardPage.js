import {} from 'antd'
import {Page} from 'components'
import React from 'react'

export default class DashboardPage extends Page {

    render = () =>
        <main>
            <Page.Header title='Dashboard' />
            <p>
                This is the dashboard. It doesn't do much right now but as more features are added it'll get more exciting.
            </p>
        </main>

}
