import {Route} from 'react-router-dom'
import ChatPage from 'pages/ChatPage'
import DashboardPage from 'pages/DashboardPage'
import EmailPage from 'pages/EmailPage'
import EventsPage from 'pages/EventsPage'
import ForumsPage from 'pages/ForumsPage'
import FilesPage from 'pages/FilesPage'
import PageEditPage from 'pages/PageEditPage'
import PageListPage from 'pages/PageListPage'
// import PeopleListPage from 'pages/PeopleListPage/PeopleListPage'
import PersonListPage from 'pages/PersonListPage'
import React, { Component } from 'react';
import SettingsPage from 'pages/SettingsPage'
import UpdatesPage from 'pages/UpdatesPage'


export default class Routes extends Component {

    render = () =>
        <>
            <Route component={ChatPage}       path='/chat/' />
            <Route component={DashboardPage}  exact path='/' />
            <Route component={EmailPage}      path='/email/' />
            <Route component={EventsPage}     path='/events/' />
            <Route component={FilesPage}      path='/files/' />
            <Route component={ForumsPage}     path='/forums/' />
            <Route component={PageEditPage}   path='/pages/:id' />
            <Route component={PageListPage}   exact path='/pages/' />
            <Route component={PersonListPage} path='/people/' />
            <Route component={SettingsPage}   path='/settings/' />
            <Route component={UpdatesPage}    path='/updates/' />
        </>

}
