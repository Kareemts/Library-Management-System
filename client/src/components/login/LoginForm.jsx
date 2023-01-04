import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import { Alert, Typography } from '@mui/material';
import { useState } from 'react';
import { axiosUrl } from '../../axios/axiosInstance';

const LoginForm = () => {
  const [userName, setUserName] = useState('');
  const [password, setPssword] = useState('');
  const [signInErr, setSignInErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axiosUrl
      .post('/login', {
        userName,
        password,
      })
      .then((result) => {
        if (result.data.userLogin === true) {
          localStorage.setItem('login', result.data.userLogin);
          navigate('/dashboard/students');
        } else {
          setSignInErr(true);
        }
      })
      .catch((err) => {
        console.log(err.message);
        navigate('/error');
      });
    setTimeout(() => {
      setSignInErr(false);
    }, 2000);
  };

  return (
    <Box mt={8}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          boxShadow: {
            xs: 'none',
            sm: '0px 0px 37px -16px rgba(205, 202, 202, 0.3)',
          },
        }}
        className="login-Form"
      >
        <CssBaseline />
        <Box
          p={5}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" style={{ fontWeight: 'bold' }}>
            LOGIN
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {signInErr ? (
              <Alert
                sx={{
                  fontSize: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                severity="warning"
              >
                <Box>Invalid Email Id Or Password</Box>
              </Alert>
            ) : (
              ''
            )}
            <TextField
              margin="normal"
              size="small"
              required
              fullWidth
              id="email"
              label="User Name"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setUserName(e.target.value)}
            />
            <TextField
              size="small"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPssword(e.target.value)}
            />

            <Box display={'flex'} justifyContent="center">
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                Login
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          component="main"
          display={'flex'}
          justifyContent="center"
          m
          mb={3}
          pb={5}
        ></Box>
      </Container>
    </Box>
  );
};

export default LoginForm;
