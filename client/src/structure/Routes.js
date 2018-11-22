import {Route} from 'react-router-dom'
import ConversationsPage from 'pages/ConversationsPage'
import DashboardPage from 'pages/DashboardPage'
import EmailPage from 'pages/EmailPage'
import EventsPage from 'pages/EventsPage'
import ForumsPage from 'pages/ForumsPage'
import FilesPage from 'pages/FilesPage'
import PageEditPage from 'pages/PageEditPage'
import PageListPage from 'pages/PageListPage'
import PeopleListPage from 'pages/PeoplePage'
import PersonEditPage from 'pages/PersonEditPage'
import React, { Component } from 'react';
import SettingsPage from 'pages/SettingsPage'
import UpdatesPage from 'pages/UpdatesPage'


export default class Routes extends Component {

    render = () =>
        <>
            <Route component={ConversationsPage}       path='/conversations/' />
            <Route component={DashboardPage}     exact path='/' />
            <Route component={EmailPage}               path='/email/' />
            <Route component={EventsPage}              path='/events/' />
            <Route component={FilesPage}               path='/files/' />
            <Route component={ForumsPage}              path='/forums/' />
            <Route component={PageEditPage}            path='/pages/:identifier' />
            <Route component={PageListPage}      exact path='/pages/' />
            <Route component={PersonEditPage}          path='/people/:identifier' />
            <Route component={PeopleListPage}    exact path='/people/' />
            <Route component={SettingsPage}            path='/settings/' />
            <Route component={UpdatesPage}             path='/updates/' />
        </>

}
