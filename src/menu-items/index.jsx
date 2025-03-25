
import ContactsIcon from '@mui/icons-material/Contacts';
import InfoIcon from '@mui/icons-material/Info';

import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import DashboardIcon from '@mui/icons-material/Dashboard';
import productos from './productos';


const NAVIGATION = [
  {
    kind: 'header',
    title: 'Home',
  },
  {
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },

  {
    segment: 'contact',
    title: 'Contact',
    icon: <ContactsIcon />,
  },
  {
    kind: 'divider',

  },
  productos
];


export default NAVIGATION;
