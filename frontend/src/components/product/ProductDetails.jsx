import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid2";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";

const ProductDetail = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/products/${id}`
        );
        setProduct(response.data.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <CircularProgress sx={{ marginTop: "50px" }} />;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        flexDirection: "column",
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
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
                maxHeight: "400px", 
              }}
            />
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="body1">
                {product.description}
              </Typography>
              <Typography variant="h5" color="primary" gutterBottom>
                ${product.price}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: "20px" }}
                fullWidth
              >
                Add to Cart
              </Button>
              <Button
                variant="outlined"
                sx={{
                  marginTop: "20px",
                  width: "100%",
                  marginTop: "20px",
                  color: "primary.main",
                }}
                onClick={() => navigate("/")}
              >
                Back to Products
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetail;
