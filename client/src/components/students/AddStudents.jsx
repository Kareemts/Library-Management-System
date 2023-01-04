import {
  Alert,
  Button,
  FormHelperText,
  TextField,
  Typography,
} from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useState } from 'react';
import { axiosUrl } from '../../axios/axiosInstance';
import { useNavigate } from 'react-router-dom';

const AddStudents = () => {
  const naviget = useNavigate();
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [image, setImage] = useState('');
  const [emailExi, setEmailExi] = useState(false);
  const [mobileExi, setMobileExi] = useState(false);
  const [noImage, setNoimage] = useState(false);
  const [posted, setPosted] = useState(false);
  const [imageSize, setImageSizs] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [mobileValid, setMobleNameValid] = useState(false);
  const [formValid, setFormValid] = useState(false);
  console.log(image);
  console.log(imageSize);

  const validateEmail = () => {
    const validRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(validRegex)) {
      setEmailValid(false);
    } else {
      setEmailValid(true);
    }
  };

  const validatMobile = () => {
    const number = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (mobile.match(number)) {
      setMobleNameValid(false);
    } else {
      setMobleNameValid(true);
    }
  };

  const imageValid = () => {
    if (image?.file?.size > 2000000) {
      setImageSizs(false);
    } else {
      setImageSizs(true);
    }
  };

  const AddNewStudents = () => {
    if (
      name === '' ||
      course === '' ||
      mobileValid ||
      emailValid ||
      !imageSize
    ) {
      setFormValid(true);
    } else {
      const data = new FormData();
      data.append('file', image.file);
      axiosUrl
        .post('/addStudent', data, {
          params: {
            name,
            course,
            email,
            mobile,
          },
        })
        .then((result) => {
          if (result.data.emailExi) setEmailExi(true);
          if (result.data.mobileExi) setMobileExi(true);
          if (result.data.noFile) setNoimage(true);
          if (result.data.posted) {
            setPosted(true);
            setMobile('');
            setName('');
            setEmail('');
            setCourse('');
          }
        })
        .catch((err) => {
          console.log(err);
          naviget('/error');
        });
    }

    setTimeout(() => {
      setNoimage(false);
      setMobileExi(false);
      setEmailExi(false);
      setPosted(false);
      setFormValid(false);
    }, 3000);
  };

  return (
    <div>
      <Box display={'flex'} justifyContent={'center'}>
        <Box fontWeight={'bold'} fontSize={20}>
          Add new student
          <Box mt={3}>
            <Stack>
              {posted ? (
                <Alert
                  sx={{
                    marginTop: 5,
                    fontSize: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  severity="success"
                >
                  <Box>New student added</Box>
                </Alert>
              ) : (
                ''
              )}
              {formValid ? (
                <Alert
                  sx={{
                    marginTop: 5,
                    fontSize: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  severity="success"
                >
                  <Box>Fill the form properly</Box>
                </Alert>
              ) : (
                ''
              )}
              <Box mt={3}>
                <TextField
                  fullWidth
                  label="Name"
                  id="outlined-size-small"
                  size="small"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
              <Box mt={3}>
                <TextField
                  fullWidth
                  label="Course"
                  id="outlined-size-small"
                  size="small"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                />
              </Box>
              <Box mt={3}>
                <TextField
                  fullWidth
                  label="Email"
                  id="outlined-size-small"
                  size="small"
                  value={email}
                  onKeyUp={validateEmail}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailExi ? (
                  <FormHelperText error>Email Exist</FormHelperText>
                ) : (
                  ''
                )}
                {emailValid ? (
                  <FormHelperText error>Enter proper email </FormHelperText>
                ) : (
                  ''
                )}
              </Box>
              <Box mt={3}>
                <TextField
                  fullWidth
                  label="Mobile"
                  id="outlined-size-small"
                  size="small"
                  value={mobile}
                  onKeyUp={validatMobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
                {mobileExi ? (
                  <FormHelperText error>Mobile Exist</FormHelperText>
                ) : (
                  ''
                )}
                {mobileValid ? (
                  <FormHelperText error>
                    Enter valid mobile number
                  </FormHelperText>
                ) : (
                  ''
                )}
              </Box>
              <Box p mt={2}>
                <Typography>
                  Image <span style={{ fontSize: 12 }}>(Max 2 MB size)</span>
                </Typography>
                <input
                  type="file"
                  accept="image/*"
                  placeholder="Upload your Resume"
                  onChange={(e) => {
                    setImage({ file: e.target.files[0] });
                    imageValid();
                  }}
                />
                {noImage ? (
                  <FormHelperText error>Select a image</FormHelperText>
                ) : (
                  ''
                )}
              </Box>
              <Box mt={3} display={'flex'} justifyContent={'center'}>
                <Button
                  variant="contained"
                  size={'small'}
                  onClick={() => AddNewStudents()}
                >
                  add
                </Button>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default AddStudents;
