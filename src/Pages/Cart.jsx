// Cart.js



import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { emptyCart, removeFromCart } from '../redux/slices/cartSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Cart() {
  //useselector hook to access state 
  const cartArray = useSelector((state) => state.cartReducer);
  console.log(cartArray);

  //useDispatch hook to dispatch actions
  const dispatch = useDispatch()

  const [total,setTotal] = useState(0)

  const navigate = useNavigate()

  //fn to get total price
  const totalPrice = ()=>{
    if(cartArray?.length>0){
      setTotal(cartArray.map((item)=>item.total_price).reduce((p1,p2)=>p1+p2))
    }
  }
  console.log(total);

  //totalPrice fn will be called on page load and also when state changes
  useEffect(()=>{
    totalPrice()
  },[cartArray])


  const addToOrder = async(order)=>{
    await axios({
      method: 'post',
      url: 'http://localhost:5000/order',
      data: order
    });
    alert('Order Placed')
    //fn to empty cartArray after checkout
    dispatch(emptyCart())
    console.log(cartArray);
    navigate('/menu')
  }

  return (
    <div style={{ marginTop: '100px' }}>
      <div className='row'>
        {cartArray?.length > 0 ?
          <div className='col-lg-6 m-5'>
            <table className='table shadow border'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  {/* <th>Image</th> */}
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Table Number</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartArray?.map((item, index) => (<tr>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  {/* <td><img style={{ height: '100px', width: '100px' }} src={item.img} alt="no image" /></td> */}
                  <td>₹ {item.price}</td>
                  <td>{item.quantity}</td>
                  <td>₹ {item.price * item.quantity}</td>
                  <th>{item.table_no}</th>
                  <td><Button variant="outline-danger" onClick={()=>dispatch(removeFromCart(item.id))}><i class="fa-solid fa-trash"></i></Button></td>
                </tr>

                ))
                }
              </tbody>
            </table>
          </div>
          :
          <p>Nothing to display</p>
        }
        <div className='col-lg-4 border border-danger p-5'>
            <h1 className='text-center text-warning'>Cart Summary</h1>
            <p className='fs-3 fw-medium mt-4'>Total items in cart: <span style={{}}>{cartArray.length}</span> </p>
            {/* <p className='fs-3 fw-medium'>Total price: {total} </p> */}
            <p className='fs-3 fw-medium'>Total price: ₹ <span style={{color:'orange'}}>{total}</span> </p>
            <button className='btn btn-success w-100 rounded' onClick={()=>addToOrder(cartArray)}>Checkout & Pay</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;





















/* import React from 'react'
import { useSelector } from 'react-redux'

function Cart() {

  const cartArray = useSelector((state)=>state.cartReducer)
  console.log(cartArray);
  return (
    <div className='container'>
      <h1>cart</h1>
    </div>
  )
}

export default Cart */













/* import React from 'react';
import { useSelector } from 'react-redux';

function Cart() {

  const cartArray = useSelector((state)=>state.cartReducer)
  console.log(cartArray);

  return (
    <>
      <div className='container'>
        <h1 className='mt-5'>Nothing in cart</h1>
      </div>
    </>
  );
}

export default Cart; */