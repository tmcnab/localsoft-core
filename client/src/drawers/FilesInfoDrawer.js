import {Col, Drawer, Progress, Row} from 'antd'
import {bool, func} from 'propTypes'
import {Formatter} from 'components'
import {get} from 'lodash'
import gql from 'gql'
import React, {Component} from 'react'


export default class FilesInfoDrawer extends Component {

    static propTypes = {
        onClose: func.isRequired,
        visible: bool.isRequired,
    }

    state = {
        total: 0,
        usage: 0,
    }

    componentDidMount = async () => {
        const data = await gql(`
            query {
                account {
                    storage {
                        total
                        usage
                    }
                }
            }
        `)

        const storage = get(data, 'account.storage')
        this.setState({
            total: Number(storage.total),
            usage: Number(storage.usage),
        })
    }

    percent = () => {
        const {total, usage} = this.state
        return total !== 0
            ? Math.round(usage / total * 10000) / 100
            : 0
    }

    render = () =>
        <Drawer onClose={this.props.onClose} placement='right' title='Help' visible={this.props.visible} width={768}>
            <Row gutter={8}>
                <Col span={6}>
                    <Progress percent={this.percent()} type='circle' />
                    <div className='mt1'>
                        <Formatter className='bold' format='information' value={this.state.usage} />
                        &nbsp;of&nbsp;
                        <Formatter className='bold' format='information' value={this.state.total} />
                    </div>
                </Col>
                <Col span={18}>
                    <p>
                        This feature allows you to save files to your instance. By default all files you upload are
                        retain your role until otherwise specified.
                    </p>
                </Col>
            </Row>
        </Drawer>

}
