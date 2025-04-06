import React, { useEffect, useState } from 'react'
import useCategoryStore from '../../store/categoryStore'
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, ErrorMessage } from 'formik';
import { Button, TextField, Typography, Stack} from '@mui/material';
import * as Yup from 'yup';
import { Container,  Grid } from '@mui/system';
import { ToastContainer, toast } from 'react-toastify';
import FileUpload from '../../components/FileUpload';


export default function UpdateCategorias() {
  const { getOneCategorie, createCategory, updateCategory, fetchOneCategori } = useCategoryStore()
  const { id } = useParams()
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState({
    name: "",
    image: "",
    file:""
  });
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (id) {
        await fetchOneCategori(id);
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);


  useEffect(() => {
    if (id && getOneCategorie) {
      setInitialValues({
        name: getOneCategorie.name || "",
        image: `${getOneCategorie.imagen || ""}`,
      });
    }
    else {
      setPreview("")
      setInitialValues({
        name: "",
        image: "",
      });
    }

  }, [getOneCategorie, id]);

  const handleSubmit = async (values, actions) => {
    
    actions.setSubmitting(false);
  
    // en caso que no hay imagen
    const dataToSubmit = { name: values.name };
    console.log(values.image,values.name ,values.file)

   if (values.file instanceof File) {
      
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("file", values.file); 
      
      try {
        if (!id) {
       
          await createCategory(formData);
         
          toast.success("Se creó con éxito", { position: "top-right" });
          actions.resetForm();
          setPreview("")
        } else {
          // Lógica para actualizar una categoría
          const formUpdate = new FormData();
          formUpdate.append("name", values.name);
          formUpdate.append("url", values.image);
          formUpdate.append("file", values.file);


          await updateCategory(id, formUpdate);
          toast.success("Se actualizó con éxito", {
            position: "top-right",
            onClose: () => navigate(`/categorias/ver`),
          });
        }
      } catch (error) {
        console.error("Error al enviar datos:", error);
      }
    } 
    
    
    else {
      try {       
          
          await updateCategory(id, dataToSubmit); 
          console.log("envio sin imagen"+dataToSubmit)
          toast.success("Se actualizó ffffcon éxito", {
            position: "top-right",
            onClose: () => navigate(`/categorias/ver`),
          });
       
      } catch (error) {
        console.error("Error al enviar datos:", error);
      }
    }
  
 
    if (id) {
      getOneCategorie(id);
    }
  };

  return (
    <div>
      <ToastContainer></ToastContainer>
      <Container sx={{ justifyContent: "center", display: "flex", alignItems: "center", flexDirection: "row" }}>

        <Grid container spacing={5}>

          <Grid item xs={6} sm={4} md={3} lg={6}>
            <Typography variant='h4'>{id ? "Actualizar categoria" : "Crear"}</Typography>

            <Formik
              initialValues={{
                name: initialValues.name || "", // Asegúrate de evitar `undefined`
                image: initialValues.image || "",
                file:initialValues.file
              }}

              /*  validationSchema={validationSchema} */
              enableReinitialize={true}
              onSubmit={handleSubmit}
              va
            >
              {({ isSubmitting, values, handleChange, handleSubmit, }) => (

                <Form style={{ height: "300px" }}>
                  <Stack direction="column" marginBottom="2rem" marginTop="2rem">
                    <TextField id="standard-basic"
                      label="nombre" name='name' value={values.name} onChange={handleChange} variant="standard" />
                    <ErrorMessage name="name" component="div" />
                  </Stack>


                  {
                    id ? (
                      <Stack direction="row" spacing={4} alignItems="center">
                        <img
                          style={{ width: "100px", height: "100px" }}
                          src={ preview? preview : values.image}
                         
                        />
                        <FileUpload onChange={(event) => {
                         const file = event.target.files[0];
                         if (file) {
                          setPreview(URL.createObjectURL(file));
                           handleChange({ target: { name: "file", value: file } });
                         }
                     
                        }}
                        />

                      </Stack>
                    ) :
                      (    <Stack direction="row" spacing={4} alignItems="center">
                        {preview?   <img
                          style={{ width: "100px", height: "100px" }}
                          src={ preview? preview : values.image}
                         
                        />:(" ")

                        }
                      
                        <FileUpload onChange={(event) => {
                         const file = event.target.files[0];
                      
                         if (file) {
                          setPreview(URL.createObjectURL(file));
                           handleChange({ target: { name: "file", value: file } });
                         }
                     
                        }}
                        />

                      </Stack>)
                  }

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

    </div>
  )
}
