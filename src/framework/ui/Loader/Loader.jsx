import React from 'react';
import classnames from 'classnames';

export default function PageLoader({ className, children, ...other }) {
  return (
    <div className={classnames('ui active inverted dimmer', className)} {...other}>
      <div className="ui text loader">{children || 'Loading'}</div>
    </div>
  );
}
