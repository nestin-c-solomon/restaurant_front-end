import React from 'react'
import { Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'

function Hero() {
    const cartArray = useSelector((state)=>state.cartReducer)
    console.log(cartArray);
  return (
    
      <div className='container -fluid d-flex ' style={{height:'500px'}}>
           
                    <div className='mt-5' style={{textAlign:'start'}}>
                        <h2 style={{marginTop:'10%', textAlign:'left',fontSize:'4rem'}}>Hungry?</h2>
                        <h4 className='mt-2' style={{textAlign:'left'}}>Grab your foods from your favourite spots</h4>
                        <button className='btn btn-dark mt-5 align-items-start'> Order Now</button>
        
                    </div>
                    <div className='ms-auto mt-5'>
                        <img src="https://st3.depositphotos.com/1000504/18241/i/450/depositphotos_182414346-stock-photo-fresh-tasty-burger.jpg" alt="" width={400} style={{backgroundBlendMode:'screen'}}/>
                    </div>
                    
                
      </div>
        
    
  )
}

export default Hero