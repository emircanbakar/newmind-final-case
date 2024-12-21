import React from "react";
import { Button, Typography, Card, CardContent } from "@mui/material";
import { useCart } from "../../context/CartContext";
import Grid from "@mui/material/Grid2";
import { toast } from "react-toastify";

const Cart = () => {
  const { cart, setCart } = useCart();
  const handleRemove = (productId) => {
    const removedProduct = cart.find((product) => product._id === productId);

    setCart(cart.filter((product) => product._id !== productId));

    if (removedProduct) {
      toast.warning(`${removedProduct.name} removed from the cart!`);
    }
  };

  const handleQuantityChange = (productId, change) => {
    setCart(
      cart.map((product) =>
        product._id === productId
          ? { ...product, quantity: Math.max(1, product.quantity + change) }
          : product
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, product) => {
      const productPrice = parseFloat(product.price);
      if (!isNaN(productPrice)) {
        return total + productPrice * product.quantity;
      }
      return total;
    }, 0);
  };

  const totalPrice = getTotalPrice();

  return (
    <div>
      <Typography padding="20px" variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      {cart.length === 0 ? (
        <Typography padding="20px">No items in the cart</Typography>
      ) : (
        <Grid container spacing={3} padding="20px">
          {cart.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" fontSize="2rem">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" fontSize="1rem">
                    Price: ${product.price}
                  </Typography>
                  <Typography variant="body2" fontSize="1rem">
                    Quantity: {product.quantity}
                  </Typography>

                  <div style={{ marginTop: "10px" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleQuantityChange(product._id, 1)}
                      style={{ marginRight: "10px" }}
                    >
                      Increase Quantity
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleQuantityChange(product._id, -1)}
                      disabled={product.quantity <= 1}
                      style={{ marginRight: "10px" }}
                    >
                      Decrease Quantity
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleRemove(product._id)}
                    >
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {cart.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <Typography padding="20px" variant="h5">
            Total Price: ${totalPrice.toFixed(2)}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default Cart;
