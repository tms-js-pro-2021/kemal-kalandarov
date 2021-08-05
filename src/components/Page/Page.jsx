import React from 'react';
import { useAppContext } from '../../AppContext';
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
      <CustomAlert />
      {children}
    </div>
  );
}
