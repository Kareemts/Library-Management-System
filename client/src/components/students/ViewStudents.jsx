import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { axiosUrl } from '../../axios/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { CardMedia } from '@mui/material';
import EditStudent from './EditStudent';

const ViewStudents = () => {
  const naviget = useNavigate();
  const [students, setStudents] = useState([]);
  const [deleted, setDeleted] = useState();
  const [open, setOpen] = useState(false);
  const [studentId, setStudetId] = useState('');

  useEffect(() => {
    axiosUrl
      .get('/getStudents')
      .then((result) => {
        setStudents(result.data);
      })
      .catch((err) => {
        console.log(err);
        naviget('/error');
      });
  }, [naviget, deleted,open]);

  const deleteStudent = (studentId) => {
    axiosUrl
      .delete('/deleteSudent', {
        params: {
          studentId,
        },
      })
      .then((result) => {
        setDeleted(Math.random());
      })
      .catch((err) => {
        console.log(err);
        naviget('/error');
      });
  };

  return (
    <div>
      <Box display={'flex'} justifyContent={'center'}>
        <Box width={500} height={40}>
          <Box p display={'flex'} justifyContent={'space-between'}>
            <Box>Name</Box>
            <Box>Edit</Box>
            <Box color={'red'}>Delete</Box>
          </Box>
        </Box>
      </Box>
      <Box display={'flex'} justifyContent={'center'}>
        <Box>
          {students.map((student, index) => {
            return (
              <Box
                mb={3}
                key={index}
                width={500}
                height={80}
                boxShadow=" 0px 10px 37px -3px rgba(0,0,0,0.1)"
                borderRadius={2}
              >
                <Box p={2} display={'flex'} justifyContent={'space-between'}>
                  <Box
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        borderRadius: 1,
                        width: {
                          xs: '2rem',
                          sm: '3rem',
                        },
                        height: {
                          xs: '2rem',
                          sm: '3rem',
                        },
                      }}
                      src={`http://localhost:4000/images/${student.imageName}.png`}
                    />
                    <Box ml> {student.name}</Box>
                  </Box>
                  <Box
                    component={'div'}
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                      setOpen(true);
                      setStudetId(student._id);
                    }}
                  >
                    <EditIcon />
                  </Box>
                  <Box
                    component={'div'}
                    sx={{ cursor: 'pointer' }}
                    color={'red'}
                    onClick={() => deleteStudent(student._id)}
                  >
                    <DeleteIcon />
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
      {open ? (
        <EditStudent open={open} setOpen={setOpen} studentId={studentId} />
      ) : (
        ''
      )}
    </div>
  );
};

export default ViewStudents;
