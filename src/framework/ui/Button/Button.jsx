import React from 'react';
import classnames from 'classnames';

export default function Button({ children, className, primary, danger, loading, disabled, type = 'button', ...other }) {
  return (
    <button
      className={classnames('ui button', { teal: primary, red: danger, loading }, className)}
      type={type}
      disabled={loading || disabled}
      {...other}
    >
      {children}
    </button>
  );
}
