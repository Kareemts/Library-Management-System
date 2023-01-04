import { Typography } from '@mui/material';
import { Box, Container, Stack } from '@mui/system';
import React, { useEffect } from 'react';
import LoginForm from './LoginForm';

const Login = () => {
  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
  }, []);

  return (
    <Box>
      <Container>
        <Stack direction="row" spacing={1} justifyContent="space-evenly">
          <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <lottie-player
                src="https://assets1.lottiefiles.com/private_files/lf30_fqygznk9.json"
                background="transparent"
                speed="1"
                style={{ width: '500px', height: '500px' }}
                loop
                autoplay
              ></lottie-player>
              <Typography
                variant="h6"
                sx={{ fontWeight: 'bold' }}
                align="center"
                color="#838383"
              ></Typography>
            </Box>
          </Box>
          <Box>
            <LoginForm />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Login;
