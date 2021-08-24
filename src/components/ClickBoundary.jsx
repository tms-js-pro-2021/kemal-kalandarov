/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';

export default function ClickBoundary(props) {
  return <div {...props} onClick={e => e.stopPropagation()} />;
}
