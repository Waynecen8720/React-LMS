import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import { range } from 'lodash/util';

import StudentListItem from '../StudentListItem/StudentListItem';

import { Loader } from '../../framework/ui';

function renderHeader() {
  return (
    <thead>
      <tr>
        <th style={{ width: 250 }}>Name</th>
        <th>Email</th>
        <th style={{ width: 70 }}>Gender</th>
        <th style={{ width: 120 }}>Date of birth</th>
        <th style={{ width: 70 }}>Credit</th>
        <th style={{ width: 120 }} />
      </tr>
    </thead>
  );
}

export default class StudentListView extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      students: [],
      currentPage: 1,
      totalPage: 1,
      isLoadingPage: false,
    };
  }

  componentDidMount() {
    this.fetchStudents();
  }

  fetchStudents() {
    this.setState({ isLoading: true });
    axios.get('/api/students').then((response) => {
      this.setState({
        students: response.data.students,
        totalPage: response.data.totalPage,
        isLoading: false,
      });
    });
  }

  fetchStudentsByPage(pageNumber) {
    this.setState({ currentPage: pageNumber, isLoadingPage: true });
    axios.get(`/api/students?pageNumber=${pageNumber}`).then((response) => {
      this.setState({
        students: response.data.students,
        totalPage: response.data.totalPage,
        isLoadingPage: false,
      });
    });
  }

  renderBody() {
    return (
      <tbody>
        {this.state.isLoadingPage && (
          <tr>
            <td colSpan="6">
              <Loader />
            </td>
          </tr>
        )}
        {!this.state.isLoadingPage && this.state.students.map(student => (
          <StudentListItem student={student} key={student.id} />
        ))}
      </tbody>
    );
  }

  renderFooter() {
    const { totalPage, currentPage } = this.state;
    const hasPrev = currentPage > 1;
    const hasNext = currentPage < totalPage;

    return (
      <tfoot>
        <tr>
          <th colSpan="6">
            <div className="ui right floated pagination menu">
              <a className={classnames('icon item', { disabled: !hasPrev })} onClick={hasPrev ? this.fetchStudentsByPage.bind(this, currentPage - 1) : undefined}>
                <i className="left chevron icon" />
              </a>
              {range(1, totalPage + 1).map(pageNumber => (
                <a
                  key={pageNumber}
                  className={classnames('item', { active: currentPage === pageNumber })}
                  onClick={currentPage === pageNumber ? undefined : this.fetchStudentsByPage.bind(this, pageNumber)}
                >
                  {pageNumber}
                </a>
              ))}
              <a className={classnames('icon item', { disabled: !hasNext })} onClick={hasNext ? this.fetchStudentsByPage.bind(this, currentPage + 1) : undefined}>
                <i className="right chevron icon" />
              </a>
            </div>
          </th>
        </tr>
      </tfoot>
    );
  }

  render() {
    return (
      <div>
        {this.state.isLoading && <Loader />}
        {!this.state.isLoading && (
          <div>
            <h1 className="ui header">Students</h1>
            <Link to="/students/create" className="ui teal button">Add student</Link>
            <div className="ui divider" />
            <table className="ui celled table">
              {renderHeader()}
              {this.renderBody()}
              {this.renderFooter()}
            </table>
          </div>
        )}
      </div>
    );
  }
}
