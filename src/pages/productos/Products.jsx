// material-ui
import { Typography, Container, Card, IconButton, Button } from '@mui/material';

import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import useProductStore from '../../store/productStore';
import DataGridTable from '../../components/DataGridTable';
import { ToastContainer, toast } from 'react-toastify';

import UpdateCrud from '../../components/UpdateCrud';

// ==============================|| SAMPLE PAGE ||============================== //

export default function Products() {
  const navigate = useNavigate();
  const { getProduct, fetchGetProduct ,deleteProduct } = useProductStore();

  useEffect(() => {
    fetchGetProduct()
  }, []);

  const handleUpdate = (id) => {
    console.log(id)
    navigate(`/productos/personalizar/update/${id}`); 
  }


  const peopleDataSource =
    [
     
      {
        field: 'name',
        headerName: 'Nombre',
      },
      {
        field: 'price',
        headerName: 'Precio',
      },
      {
        headerName: 'Personalizar',
        width: 150,
        renderCell: (params) => (
          <>
            <UpdateCrud id={params.row.id}
            info={params.row.name}
             action={deleteProduct}
              patchDelete="productos/Personalizar"
              patchUpdate="productos/personalizar/update"
              
              ></UpdateCrud>
          </>
        ),
      },

      
    ]

  return (
    <Container>
      <ToastContainer></ToastContainer>
      <DataGridTable columns={peopleDataSource}
        data={getProduct}
      />
    
    </Container>

  );
}
