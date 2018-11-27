import {Route} from 'react-router-dom'
import AuthenticatePage from 'pages/AuthenticatePage'
import DashboardPage from 'pages/DashboardPage'
import EmailPage from 'pages/EmailPage'
import EventsPage from 'pages/EventsPage'
import FilesPage from 'pages/FilesPage'
import PeoplePage from 'pages/PeoplePage'
import React, { Component } from 'react';


export default class Routes extends Component {

    render = () =>
        <>
            <Route component={AuthenticatePage} exact path='/enter/' />
            <Route component={DashboardPage}    exact path='/dashboard/' />
            <Route component={EmailPage}        exact path='/email/' />
            <Route component={EventsPage}       exact path='/events/' />
            <Route component={FilesPage}        exact path='/files/' />
            <Route component={PeoplePage}  exact path='/people/' />
        </>

}
