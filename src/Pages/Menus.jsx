import React from 'react'
import Menu from '../Components/Menu'
import { useSelector } from 'react-redux'
/* import Menu from '../Compents/Menu' */

function Menus() {
  const cartArray = useSelector((state)=>state.cartReducer)
  console.log(cartArray);
  return (
    <Menu/>
  )
}


export default Menus