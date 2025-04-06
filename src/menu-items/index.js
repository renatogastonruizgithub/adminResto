
import ContactsIcon from '@mui/icons-material/Contacts';
import InfoIcon from '@mui/icons-material/Info';

import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import DashboardIcon from '@mui/icons-material/Dashboard';
import productos from './productos';
import ordenes from './ordenes';
import categorias from './categorias';



const NAVIGATION = [
  {
    kind: 'header',
    title: 'Crear pedidos',
  },
   {
    segment: 'mesas',
    title: 'Para comer en mesa',
    icon: <DashboardIcon />,
  },

  {
    segment: 'llevar',
    title: 'Para llevar',
    icon: <ContactsIcon />,
  }, 
  {
    kind: 'header',
    title: 'Pidieron la cuenta',    
  },
  {
    segment: 'cuenta',
    title: 'Mesas ocupadas',
    icon: <ContactsIcon />,
  }, 
  {
    kind: 'divider',

  },
  productos,
  ordenes,
  categorias
];


export default NAVIGATION;
