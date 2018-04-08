import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import LecturerListItem from '../LecturerListItem/LecturerListItem';

import { Loader } from '../../framework/ui';

export default class LecturerListView extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      lecturers: [],
    };
  }

  componentDidMount() {
    this.fetchLecturers();
  }

  fetchLecturers() {
    this.setState({ isLoading: true });
    axios.get('/api/lecturers').then((response) => {
      this.setState({ lecturers: response.data, isLoading: false });
    });
  }

  render() {
    return (
      <div>
        {this.state.isLoading && <Loader />}
        {!this.state.isLoading && (
          <div>
            <h1 className="ui header">Lecturers</h1>
            <Link to="/lecturers/create" className="ui teal button">Add lecturer</Link>
            <div className="ui divider" />
            <table className="ui celled table">
              <thead>
                <tr>
                  <th style={{ width: 250 }}>Name</th>
                  <th>Email</th>
                  <th style={{ width: 150 }}>Staff number</th>
                  <th style={{ width: 120 }} />
                </tr>
              </thead>
              <tbody>
                {this.state.lecturers.map(lecturer => (
                  <LecturerListItem lecturer={lecturer} key={lecturer.id} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}
