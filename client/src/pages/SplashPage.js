import {Icon} from 'antd'
import React from 'react'


export default class SplashPage extends React.Component {

    render = () =>
        <main style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '90vh'}}>
            <div className='align-c'>
                <h1><Icon type='ant-design' /> INSTANCE NAME</h1>
                <p>Please sign in on the left to continue.</p>
            </div>
        </main>

}
