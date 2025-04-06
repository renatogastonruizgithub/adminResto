import { Button, TextField,  Typography, Select, MenuItem, InputLabel } from '@mui/material';

import React, { useEffect, useState } from 'react'
import { Await, useNavigate, useParams } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import useProductStore from "../../store/productStore";
import * as Yup from 'yup';
import { Container, Stack ,Grid} from '@mui/system';
import { values } from 'lodash';
import { ToastContainer, toast } from 'react-toastify';

export default function UpdateProducts() {

  const { fetchOneProduct, getOneProduct,
    updateOneProduct, deleteProduct,  fetchCategori, categories, createProduct } = useProductStore()
  const { id } = useParams()
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    name: "",
    price: "",    
  });

  const [idCategory, setIdCategory] = useState(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (id) {
        await fetchOneProduct(id); // Carga datos del producto desde el store
      } else {
        await fetchCategori(); // Carga categorías desde el store
      }
      setLoading(false);
    };
  
    fetchData();
  }, [id]);
  


  useEffect(() => {
    if (id && getOneProduct) {
      setInitialValues({
        name: getOneProduct.name || "",
        price: `${getOneProduct.price || ""}`,        
      });
    }
    else{
      setInitialValues({
        name:"",
        price:"",
        categoryId: idCategory,
      });
    }

  }, [getOneProduct, id, idCategory]);

  const handleSubmit = async (values, actions) => {

    actions.setSubmitting(false);

    if (!id) {
     
       createProduct(values) 
      toast.success("Se creo con éxito", {
        position: "top-right",
      });
      actions.resetForm()
    }

    else {
     
       await updateOneProduct(id, values) 
      toast.success("Se actualizó con éxito", {
        position: "top-right",
        onClose: () => {
          console.log("Toast cerrado, navegando..."); // Debugging
          navigate(`/productos`);
        }
      });

      fetchOneProduct(id)
    }


  };

 

  const handleCategory = async (selectedId) => {

    setIdCategory(selectedId)
  }


  if (loading) {
    return <p>Cargando datos...</p>;
  }
  

  return (
    <>
   
        <ToastContainer></ToastContainer>
        <Container sx={{justifyContent:"center",display:"flex",alignItems:"center",flexDirection:"row"}}>
          
          <Grid container spacing={5}>
           
            <Grid item xs={6} sm={4} md={3} lg={6}>
            <Typography variant='h4'>{id ? "Actualizar producto" : "Crear"}</Typography>

              <Formik
                initialValues={{
                  name: initialValues.name || "", // Asegúrate de evitar `undefined`
                  price: initialValues.price || "",
                 
                }}

                /*  validationSchema={validationSchema} */
                enableReinitialize={true}
                onSubmit={handleSubmit}
                va
              >
                {({ isSubmitting, values, handleChange, handleSubmit, }) => (
                  <Form style={{ height: "300px" }}>

                    {
                      id ? " " : (
                        <>
                          <Stack  alignItems="center" direction="row" spacing={2}>
                            <InputLabel id="demo-simple-select-filled-label">Elejir categoria
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-filled-label"
                              id="demo-simple-select-filled"
                              value={values.categoryId} // Conecta el valor al formulario.
                              onChange={(event) => {
                                const selectedId = event.target.value;
                                handleCategory(selectedId); // Actualiza `idCategory`.
                                values.categoryId = selectedId; // Actualiza Formik con el nuevo valor.
                              }}

                            >
                              {
                                categories.map((c, y) => {
                                  return <MenuItem key={y} value={c.id}>{c.name}</MenuItem>

                                })
                              }

                            </Select>
                          </Stack>

                        </>)
                    }



                    <Stack direction="column" margin="2rem">
                      <TextField id="standard-basic"
                        label="Producto" name='name' value={values.name} onChange={handleChange} variant="standard" />
                      <ErrorMessage name="name" component="div" />
                    </Stack>
                    <Stack direction="column" margin="2rem">
                      <TextField id="standard-basic" name="price" label="Precio"
                        value={values.price} onChange={handleChange} variant="standard" />
                      <ErrorMessage name="price" component="div" />
                    </Stack>
                    <Stack spacing={5} direction="row" justifyContent="center" alignItems="center" margin="2rem">
                      {
                        id ? (<>
                          <Button variant="contained" type="submit" disabled={isSubmitting}>
                            Aplicar cambios
                          </Button>
                          </>
                        ) : (<Button variant="contained" type="submit" disabled={isSubmitting} >
                          Crear
                        </Button>)
                      }
                    </Stack>



                  </Form>
                )}
              </Formik >

            </Grid>

          </Grid>
        </Container>


   

    </>
  )
}
