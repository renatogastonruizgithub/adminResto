
import PeopleIcon from '@mui/icons-material/People';
import DashboardIcon from '@mui/icons-material/Dashboard';

const productos = {      
    
      
    segment: 'productos',
    title: 'Gestion de productos',
    icon: <PeopleIcon />,
    children: [
        {
          segment: 'Personalizar', 
            title: 'Personalizar',
            icon: <DashboardIcon />,
        },
        {
            segment: 'Crear',
            title: 'Crear',
            icon: <DashboardIcon />,
        },
    ],

}

export default productos