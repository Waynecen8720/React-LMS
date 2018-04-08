import React from 'react';
import { Link } from 'react-router-dom';

export default function LecturerListItem({ lecturer }) {
  return (
    <tr>
      <td>{lecturer.name}</td>
      <td>{lecturer.email}</td>
      <td>{lecturer.staffNumber}</td>
      <td style={{ textAlign: 'right' }}>
        <Link to={`/lecturers/${lecturer.id}`} className="ui teal tiny button">
          <i className="edit icon" />
          Details
        </Link>
      </td>
    </tr>
  );
}
