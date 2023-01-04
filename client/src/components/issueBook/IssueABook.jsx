import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { axiosUrl } from '../../axios/axiosInstance';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from '@mui/material';
import styled from '@emotion/styled';

const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const IssueABook = () => {
  const naviget = useNavigate();
  const [books, setBooks] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [noStudent, setNoStudent] = useState('');
  const [selectedBook, setSelectedBook] = useState('');
  const [open, setOpen] = useState(false);
  const [issued, setIssued] = useState(false);
  const [added, setAdded] = useState(null);

  useEffect(() => {
    axiosUrl
      .get('/getNotIssuedBooks')
      .then((result) => {
        setBooks(result.data);
      })
      .catch((err) => {
        console.log(err);
        naviget('/error');
      });
    axiosUrl
      .get('/getStudents')
      .then((result) => {
        setStudents(result.data);
      })
      .catch((err) => {
        console.log(err);
        naviget('/error');
      });
  }, [naviget, added]);

  const issueBook = () => {
    if (selectedStudent === '') {
      setNoStudent(true);
    } else {
      axiosUrl
        .post('/issueBook', { selectedStudent, selectedBook })
        .then((result) => {
          console.log(result.data);
          if (result.data.issued) {
            setOpen(false);
            setIssued(true);
            setAdded(Math.random());
          }
        })
        .catch((err) => {
          naviget('/error');
        });
    }
    setTimeout(() => {
      setIssued(false);
    }, 3000);
  };

  return (
    <div>
      <Box display={'flex'} justifyContent={'center'}>
        <Box>
          {issued ? (
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
          {books.length <= 0 ? <Box>No Books</Box> : ''}
          {books.map((book, index) => {
            return (
              <Box
                mb={3}
                key={index}
                width={600}
                height={80}
                boxShadow=" 0px 10px 37px -3px rgba(0,0,0,0.1)"
                borderRadius={2}
              >
                <Box
                  p={2}
                  display={'flex'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                >
                  <Box>
                    <Box fontWeight={'bold'} mb={2}>
                      {' '}
                      No
                    </Box>
                    <Box> {book.bookNo}</Box>
                  </Box>
                  <Box>
                    <Box fontWeight={'bold'} mb={2}>
                      Book name
                    </Box>
                    <Box> {book.name}</Box>
                  </Box>
                  <Box>
                    <Box fontWeight={'bold'} mb={2}>
                      Author
                    </Box>
                    <Box> {book.author}</Box>
                  </Box>
                  <Box>
                    <Box fontWeight={'bold'} mb={2}>
                      Edition
                    </Box>
                    <Box> {book.edition}</Box>
                  </Box>
                  <Box>
                    <Box fontWeight={'bold'} mb={2}>
                      Publisher
                    </Box>
                    <Box> {book.publisher}</Box>
                  </Box>
                  <Button
                    variant="contained"
                    size={'small'}
                    onClick={() => {
                      setOpen(true);
                      setSelectedBook(book._id);
                    }}
                  >
                    issue
                  </Button>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
      <StyledModal
        open={open}
        onClose={() => {
          setOpen(false);
          setSelectedStudent('');
          setNoStudent(false);
        }}
      >
        <Box
          width={200}
          height={250}
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
            <Typography variant="h6">Select student</Typography>
            <Box></Box>
          </Box>
          <Divider />
          <Box sx={{ minWidth: 150 }} m>
            {noStudent ? (
              <Box mb={2} color={'red'}>
                Please select a student
              </Box>
            ) : (
              ''
            )}
            <FormControl size="small" fullWidth>
              <InputLabel>Select student</InputLabel>
              <Select onChange={(e) => setSelectedStudent(e.target.value)}>
                {students.map((student, index) => (
                  <MenuItem key={index} value={student._id}>
                    {student.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box mt={5} display={'flex'} justifyContent={'center'}>
            <Button
              variant="contained"
              size={'small'}
              onClick={() => issueBook()}
            >
              issue
            </Button>
          </Box>
        </Box>
      </StyledModal>
    </div>
  );
};

export default IssueABook;
