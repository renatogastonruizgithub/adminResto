
import ContactsIcon from '@mui/icons-material/Contacts';
import DashboardIcon from '@mui/icons-material/Dashboard';


const categorias = {     
    
    
        segment: 'categorias',  //ruta raiz
        title: 'Gestion de categorias',
        icon: <DashboardIcon />,
        children:[
            {
                segment: 'ver',
                title: 'Personalizar',
                icon: <ContactsIcon />,
            },
            {
                segment: "personalizar",
                title: 'Crear',
                icon: <ContactsIcon />,
            },               

        ]

      
      
      

}

export default categorias