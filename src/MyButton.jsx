import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from './AppContext';

function MyButton({ onClick }) {
  const { label, setLabel } = useAppContext();
  return <button onClick={onClick}>{label}</button>;
}

MyButton.propTypes = {
  onClick: PropTypes.func,
  obj1: PropTypes.shape({
    count: PropTypes.number.isRequired,
  }),
  count: PropTypes.number.isRequired,
};

MyButton.defaultProps = {
  onClick: () => {
    const fruits = ['apple', 'peach', 'orange'];
    console.log(fruits);

    const tastyFruits = [];

    fruits.forEach(fruit => {
      console.log(fruit);
      tastyFruits.push(fruit);
    });

    console.log(tastyFruits);
  },
};

export default MyButton;
