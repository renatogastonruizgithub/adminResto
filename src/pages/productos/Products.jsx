// material-ui
import {Typography,Container,Card,CardContent} from '@mui/material';
import {Grid} from '@mui/system';

import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import useProductStore from '../../store/productStore';

// ==============================|| SAMPLE PAGE ||============================== //

export default function Products() {
 const navigate = useNavigate();
  const { getProduct,fetchGetProduct } = useProductStore();

    useEffect(() => {
    fetchGetProduct()
    }, []);

const handleUpdate=(id)=>{
    navigate(`/productos/personalizar/update/${id}`);   
}


  return (
       <Container>
                <Grid container spacing={2}>

                    {getProduct?.map((product, i) => (
                        <Grid key={i} item xs={12} sm={6} md={4} lg={3} >
                            <Card
                                key={product.id}
                                elevation={3}
                                sx={{
                                    /* backgroundColor: "#616161", */
                                    color: "black",
                                    textAlign: "center",
                                    padding: 0,
                                    cursor: "pointer",
                                    margin: 0
                                }}
                                onClick={() => handleUpdate(product.id)} 
                            >      
                                    <CardContent>
                                        <Typography variant="h5"> {product.name}</Typography>
                                        <Typography variant="h6"> ${product.price}</Typography>                   
                                    </CardContent>
                               
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
 
  );
}
