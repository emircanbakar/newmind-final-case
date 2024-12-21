import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify"; 

const Product = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { cart, setCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/products");
        setProducts(response.data.data); // data içindeki diziye erişiyoruz
        setFilteredProducts(response.data.data);
        const uniqueCategories = [
          ...new Set(response.data.data.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);

    if (category === "") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === category)
      );
    }
  };

  const handleAddToCart = (product) => {
    const existingProductIndex = cart.findIndex(
      (item) => item._id === product._id
    );

    if (existingProductIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    toast.success(`${product.name} added to the cart!`);
  };

  return (
    <div className="product">
      <div className="product-filter">
        <TextField
          label="Search Products"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          fullWidth
        />
        <TextField
          select
          label="Filter by Category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          fullWidth
        >
          <MenuItem value="">All Categories</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <Grid container spacing={4}>
        {filteredProducts.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                alt={product.name}
                image={`data:image/jpeg;base64,${product.image}`}
                title={product.name}
                sx={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                  maxHeight: "250px",
                  maxWidth: "250px",
                  padding: "20px",
                }}
              />

              <CardContent
                sx={{
                  display: "flex", // Flexbox kullanarak düzenleme
                  flexDirection: "column", // Elemanları dikey hizala
                  gap: "10px", // Elemanlar arasına boşluk
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontSize: "20px", fontWeight: "bold" }}
                >
                  {product.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "16px", color: "gray" }}
                >
                  {product.description}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontSize: "16px", color: "green" }}
                >
                  ${product.price}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  component={Link}
                  to={`/products/${product._id}`}
                  sx={{ fontSize: "12px", padding: "10px" }}
                >
                  View Details
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  onClick={() => handleAddToCart(product)}
                  sx={{
                    fontSize: "12px",
                    padding: "10px",
                    borderRadius: "8px",
                  }}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Product;
