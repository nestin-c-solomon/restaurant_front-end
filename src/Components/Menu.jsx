import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';

function Menu() {

  

  const cartArray = useSelector((state)=>state.cartReducer)
  console.log(cartArray);

  



  //dispatching the action that we defined in cartSlice
  const dispatch = useDispatch()


  const [tableNumber, setTableNumber] = useState('Select the table');
  const [menuItems, setMenuItems] = useState([]);
  const [displayedItems, setDisplayedItems] = useState(12);
  const [itemQuantities, setItemQuantities] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);

  //state to store qty of each item
  const [qty,setQty] = useState(0)
  

  useEffect(() => {
    // Fetch data from the API using Axios
    axios.get('https://r2-backend.onrender.com/menu')  
      .then(response => {
        // Set the fetched data to the state
        setMenuItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // The empty dependency array ensures that the effect runs only once, similar to componentDidMount

  const handleViewMore = () => {
    // Increment the number of displayed items when the "View More" button is clicked
    setDisplayedItems(prev => prev + 10);
  };


  
  //to check if table number is properly updated
  /* console.log(tableNumber); */


  

  const handleAddToCart = (item) => {
    
    // Clone the item using the spread operator
    const updatedItem = { ...item };
    
  
    // Add the table_no key to the cloned item (ie.,updatedItem)
    updatedItem.table_no = tableNumber;

    //Add the total_price key to the cloned item (ie.,updatedItem)
    updatedItem.total_price = updatedItem.quantity* updatedItem.price  // total price = quantity * price
    console.log(updatedItem);
  
    if (updatedItem.table_no === 'Select the table') {
      alert('Select a table');
    }
    else if( !('quantity' in updatedItem) || updatedItem.quantity==0){
      alert('Please select quantity');
    }
    else {
      console.log('Before Dispatch:', cartArray);
      dispatch(addToCart(updatedItem));
      alert('item added to cart')

      
    }
  };
  

  /* Functions to Increment and Decrement the qty for items */

  const decrementQuantity = (itemId)=>{
    //create a new array with updated items
    const updatedItems = menuItems.map(item =>{
      //check if itemId is correct
      if(item.id === itemId){
        if ("quantity" in item) {      
          return {
            ...item,
            quantity: item.quantity -1, //Decrement the value of quantity by one
          };
        };
      }

      // If the item ID is incorrect or the key is already present, return the original object
      return item
    })
    setMenuItems(updatedItems)
  }



  const incrementQuantity = (itemId)=>{
    // Create a new array with updated objects
    const updatedItems = menuItems.map(item => {
      // Check if the item ID is correct
      if (item.id === itemId) {
        // Check if the key is not present in the current object
        if (!("quantity" in item)) {
          // Add the key with an initial value if not present
          return {
            ...item,
            ["quantity"]: 1,  // Set the initial value as needed
          };
        }
        else{
          return {
            ...item,
            quantity: item.quantity +1, // Increment the value of quantity by 1
          };
        }
      }
      // If the item ID is incorrect or the key is already present, return the original object
      return item;
    });

    // Update the state with the new array
    setMenuItems(updatedItems);
  }
  
  return (
    <Container>

      <div style={{ marginTop: '5%' }}>
        <h1 className='text-dark'>Menu</h1>
      </div>
      <Row className='w-25 d-flex ms-auto'>
        <Form.Select
          aria-label="Default select example"
          value={tableNumber} 
          onChange={(e) => setTableNumber(e.target.value)}
        >
          <option>Select the table</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
      </Row>
      <Row className='menu-items mt-5 justify-content-center'>
  {menuItems.slice(0, displayedItems)?.map(item => (
    <Col key={item.id} xs={12} md={6} lg={3} className="mb-4">
      {/* setMenu(item) */}
      <Card style={{ width: '100%' }} className="d-flex flex-column h-100">
        <Card.Img variant="top" src={item.img} />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{item.name}</Card.Title>
          <Card.Text>{item.dsc}</Card.Text>
          <span className='mb-2'>Price: ${item.price}</span>
          <div className="d-flex justify-content-center align-items-center mt-auto">
            {itemQuantities[item.id] ? (
              <div className="d-flex align-items-center">
                <Button
                  variant="dark"
                  size="sm"
                  /* onClick={() => handleDecrementQuantity(item.id)} */
                  className="mx-2"
                >
                  -
                </Button>
                <span>{itemQuantities[item.id]}</span>
                <Button
                  variant="dark"
                  size="sm"
                  /* onClick={() => handleIncrementQuantity(item.id)} */
                  className="mx-2"
                >
                  +
                </Button>
              </div>
            ) : (
              
              <Button
                variant="dark"
                onClick={() => handleAddToCart(item)}

                
              >
                Add to cart

              </Button>
              
              
            )}
          </div>

              {/* QTY INCREMENT OR DECREMENT */}
          <div className='d-flex justify-content-center mt-3'>

                  {/* The decrement button will only be shown if the quantity is greater than zero */}
                  { item.quantity>0 &&
                    <button className='btn btn-primary' onClick={()=>decrementQuantity(item.id)}>-</button>
                  }

                  { item.quantity?
                    <p>{item.quantity}</p>:
                    <p>0</p>
                    }
                  <button className='btn btn-primary' onClick={()=>incrementQuantity(item.id)}>+</button>
          </div>
          

          {/* setMenuItems(item) */}
        </Card.Body>
      </Card>
    </Col>
  ))}
  
</Row>
      {displayedItems < menuItems.length && (
        <Row className="justify-content-center mt-3">
          <Button className='w-50 mb-5' variant="dark" onClick={handleViewMore}>
            View More
          </Button>
        </Row>
      )}

      {/* Display selected items */}                 {/* /  /DECOMMENT */}
      {/* {selectedItems.length > 0 && (
      <div className="selected-items-container rounded-5 w-25">
        <h2>Cart</h2>
        <ul>
          {selectedItems.map(selectedItem => (
            <li key={selectedItem.id}>
              {selectedItem.name} - Quantity: {itemQuantities[selectedItem.id]}
            </li>
          ))}
        </ul>
      </div>
    )} */}
    </Container>
  );
}

export default Menu;