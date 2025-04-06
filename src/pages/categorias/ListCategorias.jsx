import React, { useEffect } from 'react'

import DataGridTable from '../../components/DataGridTable';
import useProductStore from '../../store/productStore';

import UpdateCrud from '../../components/UpdateCrud';
import useCategoryStore from '../../store/categoryStore';
export default function ListCategorias() {

  const { fetchCategori, categories ,deleteCategory,updateCategory } = useCategoryStore()

  useEffect(() => {
    fetchCategori()
  }, []);


  const columns =
    [
      {
        field: 'id',
        headerName: 'id',
      },
      {
        field: 'name',
        headerName: 'Nombre',
      },

      {
        field: 'imagen',
        headerName: 'Imagen',
        width: 150,
        height: 80,
        renderCell: (params) => (
          <>
            <img
              key={`imagen-${params.row.id}`}
              style={{ objectFit: "cover", height: "50px",width:"80px" }} src={params.row.imagen} />
          </>
        ),
      },
      {
        headerName: 'Personalizar',
        width: 150,
        renderCell: (params) => (
          <>
            <UpdateCrud id={params.row.id} info={params.row.name} 
            action={deleteCategory} 
            patchDelete="categorias/ver"
            patchUpdate="categorias/personalizar"
            
            ></UpdateCrud>
          </>
        ),
      }
    ]
  return (
    <div>
      <DataGridTable columns={columns}
        data={categories}
      />

    </div>
  )
}
