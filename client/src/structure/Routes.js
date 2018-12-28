import {Route, Switch} from 'react-router-dom'
import EmailPage from 'pages/EmailPage'
import FilesPage from 'pages/FilesPage'
import NotFoundPage from 'pages/NotFoundPage'
import PagesPage from 'pages/PagesPage'
import PeoplePage from 'pages/PeoplePage'
import React, { Component } from 'react'


export default class Routes extends Component {

    render = () =>
        <Switch>
            <Route component={EmailPage}        exact path='/email/' />
            <Route component={FilesPage}        exact path='/files/' />
            <Route component={PagesPage}        exact path='/pages/' />
            <Route component={PeoplePage}       exact path='/people/' />
            <Route component={NotFoundPage} />
        </Switch>

}
