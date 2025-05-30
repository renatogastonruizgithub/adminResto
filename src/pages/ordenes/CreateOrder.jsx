import React from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import {  Typography, Stack, TextField, Container, Button } from '@mui/material'
import Category from '../../components/Category';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import useOrderStore from "../../store/orderStore";
import useProductStore from "../../store/productStore";
import { ToastContainer } from 'react-toastify';
import { toast } from "react-toastify";
import { useSocket } from '../../context/SocketContext';
import ItemsCart from '../../components/ItemsCart';

function CreateOrder() {
  const { id } = useParams();
  const { items, setName, loading, clearCart, name,ClearName,sendOrder,agregar,restar} = useOrderStore();
  const { categories,fetchCategori } = useProductStore();
  const [carry, setCarry] = useState("En mesa")
  const [value, setValue] = React.useState('1');
  const [disable, setDisable] = useState(true)
  const navigate = useNavigate();
  const { setIgnoreNotifications } = useSocket();

  useEffect(() => {
    clearCart()
   fetchCategori()
    ClearName()
    
    if (!id) {
      setCarry("Para llevar");
    }
    setIgnoreNotifications(true);
     return () => {
      // Restaurar notificaciones cuando el componente se desmonte
      setIgnoreNotifications(false);
    };

  }, [id])

  useEffect(() => {
    if (name.trim() !== "" && items.length > 0) {
      setDisable(false); // Habilita si hay nombre y productos en el carrito
    } else {
      setDisable(true); // Deshabilita en caso contrario
    }
  }, [ items]); // `name` e `items` como dependencias

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleOrder = () => {
    if (!name) {
      alert("Debes ingresar tu nombre");
      return;
    }


    const orderData = {
      ...(id && { table: Number(id) }),

      ...(carry && { site: carry }),
      name: name,
      productIds: items,
    }

    sendOrder(orderData)
    clearCart()
    setName(" ")
    toast.success("Orden creada con éxito", { 
      position: "top-right", 
      onClose: () => {
        if (id && !loading) {
          navigate(`/mesas`);
        }
      }
    })
  }

  return (
    <Container>
      <ToastContainer></ToastContainer>
      {id ? <Typography variant="h5" sx={{ marginBottom: "2rem" }}> Vas a ocupar la Mesa {id}</Typography> : " "}
      <TabContext value={value} >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Dato cliente" value="1" />         
            <Tab label="Elejir comidas" value="2" disabled={disable}/>
            <Tab label="Confirmar" value="3" disabled={disable}/>
          </TabList>
        </Box>

        <TabPanel value="1">
          <Stack direction="row" spacing={3} margin={4}>
            <TextField
              label="Nombre del cliente"
              value={name}
              onChange={(e) => {
                const inputValue = e.target.value;
                setName(inputValue); // Actualizamos el estado del nombre
                setDisable(inputValue.trim() === ""); // Si el campo no está vacío, disable será false
              }}
              margin="normal"
            />

          </Stack>
        </TabPanel>
        <TabPanel value="2">  <Category category={categories}></Category></TabPanel>
        <TabPanel value="3">
          <ul>
            <h3>{name}</h3>

            {items.length > 0 ? (
              <>
              <ItemsCart ></ItemsCart>    

                <Button
                  variant="contained"
                  color="success"
                  sx={{ marginTop: "1rem" }}
                  onClick={handleOrder}
                  disabled={loading}
                >
                  {loading ? "Enviando..." : "Enviar a cocina"}
                </Button>
              </>
            ) : (
              <p>No hay productos en la orden.</p>
            )}
          </ul>
        </TabPanel>
      </TabContext>


    </Container>
  )
}

export default CreateOrder
