import { AppBar, Avatar, Box, Menu, MenuItem, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigat = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const logout = () => {
    localStorage.removeItem('login');
    navigat('/');
  };

  const dashboard = () => {
    navigat('/dashboard/students');
  };

  return (
    <Box mb={10}>
      <AppBar position="fixed" sx={{ backgroundColor: '#FAFAFA' }}>
        <Box p display={'flex'} justifyContent={'space-between'}>
          <Box p component={'div'} onClick={() => dashboard()}>
            <Typography
              variant="h6"
              fontWeight={'bold'}
              sx={{
                display: { xs: 'none', sm: 'block' },
                color: 'black',
                cursor: 'pointer',
              }}
            >
              Dashboard
            </Typography>

            <Box
              sx={{ display: { xs: 'block', sm: 'none', cursor: 'pointer' } }}
            >
              <Box
                display={'flex'}
                justifyContent="center"
                alignItems={'center'}
              >
                <Typography
                  fontWeight={'bold'}
                  variant="h6"
                  sx={{ color: 'black', fontSize: 12 }}
                >
                  Dashboard
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            pt={2}
            color="black"
            display={'flex'}
            justifyContent={'space-between'}
            width={400}
          >
            <Box
              component={'div'}
              sx={{ fontSize: { xs: 12, sm: 17 }, cursor: 'pointer' }}
              onClick={() => navigat('/dashboard/students')}
            >
              Students
            </Box>
            <Box
              component={'div'}
              sx={{ fontSize: { xs: 12, sm: 17 }, cursor: 'pointer' }}
              onClick={() => navigat('/dashboard/books')}
            >
              Books
            </Box>
            <Box
              component={'div'}
              sx={{ fontSize: { xs: 12, sm: 17 }, cursor: 'pointer' }}
              onClick={() => navigat('/dashboard/issued-books')}
            >
              Issue Books
            </Box>
          </Box>
          <Box p>
            <Box
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              component={'div'}
              onClick={handleClick}
            >
              <Avatar sx={{ width: 30, height: 30, cursor: 'pointer' }} />

              <Typography
                pl
                variant="h6"
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  color: 'black',
                  cursor: 'pointer',
                  fontSize: 15,
                }}
              >
                Admin
              </Typography>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                <Box>
                  <MenuItem onClick={() => logout()}>Logout</MenuItem>
                </Box>
              </Menu>
            </Box>
            <Box
              sx={{ display: { xs: 'block', sm: 'none', cursor: 'pointer' } }}
            >
              <Box
                display={'flex'}
                justifyContent="center"
                alignItems={'center'}
                component={'div'}
                onClick={handleClick}
              >
                <Typography variant="h6" sx={{ color: 'black', fontSize: 12 }}>
                  Admin
                </Typography>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                >
                  <Box>
                    <MenuItem onClick={() => logout()}>Logout</MenuItem>
                  </Box>
                </Menu>
              </Box>
            </Box>
          </Box>
        </Box>
      </AppBar>
    </Box>
  );
};

export default Navbar;
