import {
  Alert,
  Box,
  Button,
  FormHelperText,
  Stack,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { axiosUrl } from '../../axios/axiosInstance';
import { useNavigate } from 'react-router-dom';

const AddBooks = () => {
  const naviget = useNavigate();
  const [posted, setPosted] = useState(false);
  const [name, setName] = useState('');
  const [bookNo, setBookNo] = useState('');
  const [author, setAuthor] = useState('');
  const [edition, setEdition] = useState('');
  const [publisher, setPublisher] = useState('');
  const [bookExi, setBookExi] = useState(false);

  const AddNewBooks = () => {
    axiosUrl
      .post('/addNewBooks', { name, bookNo, author, edition, publisher })
      .then((result) => {
        console.log(result.data);
        if (result.data.bookExi) setBookExi(true);
        if (result.data.posted) {
          setPosted(true);
          setBookNo('');
          setName('');
          setAuthor('');
          setEdition('');
          setPublisher('');
        }
      })
      .catch((err) => {
        console.log(err);
        naviget('/error');
      });
    setTimeout(() => {
      setBookExi(false);
      setPosted(false);
    }, 3000);
  };

  return (
    <div>
      <Box display={'flex'} justifyContent={'center'}>
        <Box fontWeight={'bold'} fontSize={20}>
          Add new book
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
                  <Box>New Books added</Box>
                </Alert>
              ) : (
                ''
              )}
              <Box mt={3}>
                <TextField
                  fullWidth
                  label="Book no"
                  id="outlined-size-small"
                  size="small"
                  value={bookNo}
                  onChange={(e) => setBookNo(e.target.value)}
                />
              </Box>
              <Box mt={3}>
                <TextField
                  fullWidth
                  label="Name"
                  id="outlined-size-small"
                  size="small"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {bookExi ? (
                  <FormHelperText error>Email Exist</FormHelperText>
                ) : (
                  ''
                )}
              </Box>

              <Box mt={3}>
                <TextField
                  fullWidth
                  label="Author"
                  id="outlined-size-small"
                  size="small"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </Box>
              <Box mt={3}>
                <TextField
                  fullWidth
                  label="Edition"
                  id="outlined-size-small"
                  size="small"
                  value={edition}
                  onChange={(e) => setEdition(e.target.value)}
                />
              </Box>

              <Box mt={3}>
                <TextField
                  fullWidth
                  label="Publisher"
                  id="outlined-size-small"
                  size="small"
                  value={publisher}
                  onChange={(e) => setPublisher(e.target.value)}
                />
              </Box>

              <Box mt={3} display={'flex'} justifyContent={'center'}>
                <Button
                  variant="contained"
                  size={'small'}
                  onClick={() => AddNewBooks()}
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

export default AddBooks;
