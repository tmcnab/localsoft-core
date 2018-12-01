import {Route, Switch} from 'react-router-dom'
import DashboardPage from 'pages/DashboardPage'
import EmailPage from 'pages/EmailPage'
import EventsPage from 'pages/EventsPage'
import FilesPage from 'pages/FilesPage'
import NotFoundPage from 'pages/NotFoundPage'
import PeoplePage from 'pages/PeoplePage'
import React, { Component } from 'react'
import SplashPage from 'pages/SplashPage'


export default class Routes extends Component {

    render = () =>
        <Switch>
            <Route component={DashboardPage}    exact path='/dashboard/' />
            <Route component={EmailPage}        exact path='/email/' />
            <Route component={EventsPage}       exact path='/events/' />
            <Route component={FilesPage}        exact path='/files/' />
            <Route component={PeoplePage}       exact path='/people/' />
            <Route component={SplashPage}       exact path='/' />
            <Route component={NotFoundPage} />
        </Switch>

}
