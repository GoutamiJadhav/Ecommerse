import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
// import axios from 'axios';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Badge,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  CardMedia,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import product1 from './Images/product1.jpeg';
import product2 from './Images/coconut.webp';
import product3 from './Images/banana.jpeg';
import product4 from './Images/watermelon.webp';

const products = [
  { id: 1, name: "Pear", price: "100.00",productImage:product1},
  { id: 2, name: "Coconut", price: "150.00",productImage:product2}, 
  { id: 3, name: "Banana", price: "200.00",productImage:product3},
  { id: 4, name: "Watermelon", price: "250.00",productImage:product4}, 
];

export const ProductListing=({product})=>{
 
  // const {name,price,productImage}=product


// const App = () => {
 
  
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    setCartItems((prev) => [...prev,{...product,totalPrice:parseFloat(product.price)}]);
  };
  const handleRemoveCart = (productToRemove) => {
   const productIndex=cartItems.findIndex((item)=>item.id===productToRemove.id)
   if(productIndex!==-1){
    const UpdatedCartitems=[...cartItems];
    UpdatedCartitems.splice(productIndex,1);
    setCartItems(UpdatedCartitems);
   }
  };
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + parseFloat(item.price), 0);
  };
  const navigateToLogin=()=>{
    navigate('/');
    alert("logged out successfully")

  }

  const handleBuyNow = async() => {
   
    const totalPrice = cartItems.reduce((total, item) => total + item.totalPrice,0);
    alert(`Total price:₹${totalPrice.toFixed(2)}`);
    try {
        const response = await fetch('http://127.0.0.1:5000/shopcart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cartItems, totalPrice }),
        });
        const data = await response.json();
        console.log(data); // Log the response if necessary
      } catch (error) {
        console.error('Error sending data to the backend:', error);
      }
  };
  
  

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
            E-Commerce Website
          </Typography>
          <Button
          onClick={() => navigateToLogin(product)} 
          type="submit"
          color="warning"
          variant="success">
            Logout
          

          </Button>
         {/* <Button variant="outlined">Login</Button> */}
          <IconButton color="inherit" onClick={() => setIsCartOpen(true)}>
            <Badge badgeContent={cartItems.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 3, maxHeight: 'calc(100vh - 64px)' }}>
      {/* , overflow: 'auto' */}
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card variant="outlined">
                <CardMedia 
                component="img"
                alt={product.name}
                image={product.productImage}
                style={{height:'250px',width:'300px',objectFit:'cover'}}/>
             

                <CardContent>
                  <Typography variant="h6" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: ₹{product.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => handleAddToCart(product)}
                    size="small"
                    color="primary"
                  >
                    Add to Cart
                  </Button>
                  {/* <Button
                    onClick={() => handleRemoveCart(product)}
                    size="small"
                    color="secondory"
                  >
                    Remove from Cart
                  </Button> */}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Drawer 
      anchor="right"
      open={isCartOpen} 
      onClose={() => setIsCartOpen(false)}
      PaperProps={{sx:{width:"400px"}}}>
        <h2>My Cart</h2>
      
        <List>
          {cartItems.map((item, index) => (
            <ListItem key={index}>

              <ListItemAvatar>
                <Avatar alt={item.name} src={item.productImage} />
              </ListItemAvatar>
              <ListItemText primary={item.name} secondary={`Price: ₹${item.totalPrice.toFixed(2)}`}/>
                             {/* <ListItemAvatar src={product.productImage}>
                
              </ListItemAvatar>  */}
              <Button 
              variant="outlined"
              color="secondary"
              onClick={()=>handleRemoveCart(item)}>Remove from cart</Button>
            </ListItem>
          ))}
           <ListItem>
            <ListItemText primary="Total Price:" secondary={`₹${getTotalPrice().toFixed(2)}`}/>
            
          </ListItem>
          </List> 
         
          <Button variant="contained" color="primary" onClick={handleBuyNow}>
            Buy Now
          </Button>
        {/* </List> */}
      
        
      </Drawer>
    </div>
  );
};

export default ProductListing;
