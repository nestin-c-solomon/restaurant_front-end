// Landing.jsx
import React from 'react';
import Hero from '../Components/Hero';
import { useSelector } from 'react-redux';

function Landing() {
  const cartArray = useSelector((state) => state.cartReducer);
  console.log(cartArray);

  return (
    <div>
      <Hero />
    </div>
  );
}

export default Landing;





/* const cartArray = useSelector((state)=>state.cartReducer)
  console.log(cartArray); */