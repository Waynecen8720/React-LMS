import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { CourseListView, CourseDetailsView } from './Course';
import { LecturerListView, LecturerDetailsView } from './Lecturer';
import { StudentListView, StudentDetailsView } from './Student';

export default () => ((
  <Switch>
    <Route exact path="/" component={CourseListView} />
    <Route exact path="/courses" component={CourseListView} />
    <Route exact path="/courses/:id" component={CourseDetailsView} />
    <Route exact path="/students" component={StudentListView} />
    <Route exact path="/students/:id" component={StudentDetailsView} />
    <Route exact path="/lecturers" component={LecturerListView} />
    <Route exact path="/lecturers/:id" component={LecturerDetailsView} />
  </Switch>
));
