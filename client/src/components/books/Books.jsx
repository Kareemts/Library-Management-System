import { Box, Divider } from '@mui/material';
import React, { useState } from 'react';
import AddBooks from './AddBooks';
import ViewBooks from './ViewBooks';

const Books = () => {
  const [addBooks, setAddBooks] = useState(false);
  const [ViewBook, setViewBooks] = useState(true);
  return (
    <div>
      <Box
        fontWeight={'bold'}
        fontSize={20}
        display={'flex'}
        justifyContent={'center'}
      >
        BOOKS
      </Box>
      <Box m={3}>
        <Box display={'flex'} width={250} justifyContent={'space-between'}>
          {' '}
          <Box
            component={'div'}
            fontWeight={'bold'}
            sx={{ cursor: 'pointer' }}
            color={ViewBook ? 'blue' : 'black'}
            onClick={() => {
              setAddBooks(false);
              setViewBooks(true);
            }}
          >
            View Books
          </Box>
          <Box
            component={'div'}
            fontWeight={'bold'}
            sx={{ cursor: 'pointer' }}
            color={addBooks ? 'blue' : 'black'}
            onClick={() => {
              setAddBooks(true);
              setViewBooks(false);
            }}
          >
            Add Books
          </Box>
        </Box>
        <Divider sx={{ width: 250, marginTop: 1 }} />
      </Box>
      {ViewBook ? <ViewBooks /> : <AddBooks />}
    </div>
  );
};

export default Books;
