import styled from '@emotion/styled';
import { Button, Divider, Modal, TextField, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosUrl } from '../../axios/axiosInstance';
const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const EditBooks = ({ open, setOpen, bookId }) => {
  const naviget = useNavigate();
  const [name, setName] = useState('');
  const [bookNo, setBookNo] = useState('');
  const [author, setAuthor] = useState('');
  const [edition, setEdition] = useState('');
  const [publisher, setPublisher] = useState('');

  useEffect(() => {
    axiosUrl
      .get('/getBookInfo', {
        params: { bookId },
      })
      .then((result) => {
        setBookNo(result.data.bookNo);
        setName(result.data.name);
        setAuthor(result.data.author);
        setEdition(result.data.edition);
        setPublisher(result.data.publisher);
      })
      .catch((err) => {
        console.log(err);
        naviget('/error');
      });
  }, [naviget, bookId]);

  const editInfo = () => {
    axiosUrl
      .put('/editBookInfo', {
        bookId,
        name,
        bookNo,
        author,
        edition,
        publisher,
      })
      .then((result) => {
        console.log(result.data);
        if (result.data.update) {
          setOpen(false);
        }
      })
      .catch((err) => {
        console.log(err);
        naviget('/error');
      });
  };

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
            <Typography variant="h6">Edit book information</Typography>
          </Box>
          <Divider />
          <Stack>
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
                onClick={() => editInfo()}
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

export default EditBooks;
