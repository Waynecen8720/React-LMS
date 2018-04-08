import React from 'react';
import classnames from 'classnames';

export default function Segment({ className, children, ...other }) {
  return (
    <div className={classnames('ui segment', className)} {...other}>
      {children}
    </div>
  );
}
