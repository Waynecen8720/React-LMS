import React from 'react';
import { Link } from 'react-router-dom';

export default function TopNav() {
  return (
    <div className="ui fixed inverted teal menu">
      <div className="ui container">
        <Link to="/" className="header item">
      My React App
        </Link>
        <Link to="/courses" className="item">Courses</Link>
        <Link to="/students" className="item">Students</Link>
        <Link to="/lecturers" className="item">Lecturers</Link>
      </div>
    </div>
  );
}
