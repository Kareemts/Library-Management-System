import styled from '@emotion/styled';
import {
  Button,
  Divider,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { axiosUrl } from '../../axios/axiosInstance';
import { useNavigate } from 'react-router-dom';
const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const EditStudent = ({ open, setOpen, studentId }) => {
  const naviget = useNavigate();
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [image, setImage] = useState('');
  const [userInfo, setUserInfo] = useState({});

//   if (studentId !== '') {
//     axiosUrl
//       .get('/getStudentInfo', {
//         params: { studentId },
//       })
//       .then((result) => {
//         setUserInfo(result.data);
//         console.log(result.data);
//       })
//       .catch((err) => {
//         console.log(err);
//         naviget('/error');
//       });
//   }

  return (
    <div>
      <StyledModal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Box
          width={300}
          height={450}
          padding={3}
          borderRadius={5}
          bgcolor="white"
          sx={{
            backgroundColor: 'white',
            border: 'none',
            outline: 'none',
          }}
        >
          <Box
            mb
            display={'flex'}
            alignItems="center"
            justifyContent={'space-between'}
          >
            <Typography variant="h6">Edit student information</Typography>
          </Box>
          <Divider />
          <Stack>
            <Box mt={3}>
              <TextField
                fullWidth
                label="Name"
                id="outlined-size-small"
                size="small"
                value={name}
                defaultValue="Hello World"
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
            </Box>
            <Box p mt={2}>
              <Typography>Image</Typography>
              <input
                type="file"
                accept="image/*"
                placeholder="Upload your Resume"
                onChange={(e) => setImage({ file: e.target.files[0] })}
              />
            </Box>
            <Box mt={3} display={'flex'} justifyContent={'center'}>
              <Button
                variant="contained"
                size={'small'}
                // onClick={() => AddNewStudents()}
              >
                change
              </Button>
            </Box>
          </Stack>
        </Box>
      </StyledModal>
    </div>
  );
};

export default EditStudent;
