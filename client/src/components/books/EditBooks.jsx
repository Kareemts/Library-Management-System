import styled from '@emotion/styled';
import { Button, Divider, Modal, TextField, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const EditBooks = ({ open, setOpen, bookInfo }) => {
  const naviget = useNavigate();
  const [name, setName] = useState('');
  const [bookNo, setBookNo] = useState(bookInfo.bookNo);
  const [author, setAuthor] = useState('');
  const [edition, setEdition] = useState('');
  const [publisher, setPublisher] = useState('');

  console.log(bookNo);

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
                // onClick={() => AddNewBooks()}
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
