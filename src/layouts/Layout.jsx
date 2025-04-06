import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { Stack, Typography, Chip, Tooltip, IconButton, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import { SocketProvider } from '../context/SocketContext';


function ToolbarActionsSearch() {
  return (
    <Stack direction="row">
      <Tooltip title="Search" enterDelay={1000}>
        <div>
          <IconButton
            type="button"
            aria-label="search"
            sx={{
              display: { xs: 'inline', md: 'none' },
            }}
          >
            <SearchIcon />
          </IconButton>
        </div>
      </Tooltip>
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        slotProps={{
          input: {
            endAdornment: (
              <IconButton type="button" aria-label="search" size="small">
                <SearchIcon />
              </IconButton>
            ),
            sx: { pr: 0.5 },
          },
        }}
        sx={{ display: { xs: 'none', md: 'inline-block' }, mr: 1 }}
      />

    </Stack>
  );
}


function SidebarFooter({ mini }) {
  return (
    <Typography
      variant="caption"
      sx={{ m: 1, whiteSpace: 'nowrap', overflow: 'hidden' }}
    >
      {mini ? '© MUI' : `© ${new Date().getFullYear()} Desarrollado por RRuiz`}
    </Typography>
  );
}

SidebarFooter.propTypes = {
  mini: PropTypes.bool.isRequired,
}

export default function Layout() {
  return (
    <SocketProvider>
      <DashboardLayout

        slots={{
          /*    appTitle: CustomAppTitle, */
          toolbarActions: ToolbarActionsSearch,
          sidebarFooter: SidebarFooter,
        }}>
        <div style={{ marginTop: "4rem", marginBottom: "3rem" }}>

          <Outlet />
        </div>


      </DashboardLayout>
    </SocketProvider>
  );
}