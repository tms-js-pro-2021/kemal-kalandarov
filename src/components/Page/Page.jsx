import React from 'react';
import CustomAlert from '../CustomAlert';
import CustomAppBar from '../CustomAppBar';
import './Page.css';

export default function Page({
  prop1,
  title,
  error,
  closeError,
  children,
  ...otherProps
}) {
  return (
    <div className="page-root" {...otherProps}>
      <CustomAppBar title={title} />
      {error && <CustomAlert {...{ error, closeError }} />}
      {children}
    </div>
  );
}
