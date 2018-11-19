import {Route} from 'react-router-dom'
import ChatPage from 'pages/ChatPage'
import DashboardPage from 'pages/DashboardPage'
import EmailPage from 'pages/EmailPage'
import EventsPage from 'pages/EventsPage'
import FilesPage from 'pages/FilesPage'
import PagesPage from 'pages/PagesPage'
import PeopleListPage from 'pages/PeopleListPage/PeopleListPage'
import React, { Component } from 'react';
import SettingsPage from 'pages/SettingsPage'
import UpdatesPage from 'pages/UpdatesPage'


export default class Routes extends Component {

    render = () =>
        <>
            <Route component={ChatPage}       exact path='/chat/' />
            <Route component={DashboardPage}  exact path='/' />
            <Route component={EmailPage}      exact path='/email/' />
            <Route component={EventsPage}     exact path='/events/' />
            <Route component={FilesPage}      exact path='/files/' />
            <Route component={PagesPage}      exact path='/pages/' />
            <Route component={PeopleListPage} exact path='/people/' />
            <Route component={SettingsPage}   exact path='/settings/' />
            <Route component={UpdatesPage}    exact path='/updates/' />
        </>

}
