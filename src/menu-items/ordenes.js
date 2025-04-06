import PeopleIcon from '@mui/icons-material/People';
import DashboardIcon from '@mui/icons-material/Dashboard';

const ordenes = {      
    
      
    segment: 'ordenes',
    title: 'Gestion de ordenes',
    icon: <PeopleIcon />,
    children: [
        {
          segment: 'historial', 
            title: 'historial',
            icon: <DashboardIcon />,
        },
        {
            segment: 'editar',
            title: 'editar',
            icon: <DashboardIcon />,
        },
    ],

}

export default ordenes