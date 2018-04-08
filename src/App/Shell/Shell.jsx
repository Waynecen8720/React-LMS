import React from 'react';
import TopNav from '../TopNav/TopNav';

export default function Shell({ children }) {
  return (
    <div>
      <TopNav />
      <div className="ui container">
        {children}
      </div>
    </div>
  );
}
