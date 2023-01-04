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
  console.log(image);

  const AddNewStudents = () => {
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
        console.log(result.data);
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
    setTimeout(() => {
      setNoimage(false);
      setMobileExi(false);
      setEmailExi(false);
      setPosted(false);
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
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailExi ? (
                  <FormHelperText error>Email Exist</FormHelperText>
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
                  onChange={(e) => setMobile(e.target.value)}
                />
                {mobileExi ? (
                  <FormHelperText error>Mobile Exist</FormHelperText>
                ) : (
                  ''
                )}
              </Box>
              <Box p mt={2}>
                <Typography>Image</Typography>
                <input
                  type="file"
                  accept="image/*"
                  placeholder="Upload your Resume"
                  onChange={(e) => setImage({ file: e.target.files[0] })}
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
