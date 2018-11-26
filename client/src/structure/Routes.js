import {Route} from 'react-router-dom'
import AuthenticationPage from 'pages/AuthenticationPage'
import ConversationsPage from 'pages/ConversationsPage'
import DashboardPage from 'pages/DashboardPage'
import EmailPage from 'pages/EmailPage'
import EventsPage from 'pages/EventsPage'
import ForumsPage from 'pages/ForumsPage'
import FilesPage from 'pages/FilesPage'
import PageListPage from 'pages/PageListPage'
import PeopleListPage from 'pages/PeoplePage'
import React, { Component } from 'react';
import SettingsPage from 'pages/SettingsPage'
import UpdatesPage from 'pages/UpdatesPage'


export default class Routes extends Component {

    render = () =>
        <>
            <Route component={AuthenticationPage}      path='/enter/' />
            <Route component={ConversationsPage}       path='/conversations/' />
            <Route component={DashboardPage}           path='/dashboard/' />
            <Route component={EmailPage}               path='/email/' />
            <Route component={EventsPage}              path='/events/' />
            <Route component={FilesPage}               path='/files/' />
            <Route component={ForumsPage}              path='/forums/' />
            <Route component={PageListPage}      exact path='/pages/' />
            <Route component={PeopleListPage}    exact path='/people/' />
            <Route component={SettingsPage}            path='/settings/' />
            <Route component={UpdatesPage}             path='/updates/' />
        </>

}
