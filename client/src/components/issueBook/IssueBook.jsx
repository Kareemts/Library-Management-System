import { Divider } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import IssueABook from './IssueABook';
import IssuedBooks from './IssuedBooks';

const IssueBook = () => {
  const [issuedBooks, setIssuedBooks] = useState(false);
  const [IssueNewBook, setIssueNewBook] = useState(true);
  return (
    <div>
      <Box
        fontWeight={'bold'}
        fontSize={20}
        display={'flex'}
        justifyContent={'center'}
      >
        ISSUE BOOKS
      </Box>
      <Box m={3}>
        <Box display={'flex'} width={250} justifyContent={'space-between'}>
          {' '}
          <Box
            component={'div'}
            fontWeight={'bold'}
            sx={{ cursor: 'pointer' }}
            color={IssueNewBook ? 'blue' : 'black'}
            onClick={() => {
              setIssuedBooks(false);
              setIssueNewBook(true);
            }}
          >
            Issued books
          </Box>
          <Box
            component={'div'}
            fontWeight={'bold'}
            sx={{ cursor: 'pointer' }}
            color={issuedBooks ? 'blue' : 'black'}
            onClick={() => {
              setIssuedBooks(true);
              setIssueNewBook(false);
            }}
          >
            Issue new book
          </Box>
        </Box>
        <Divider sx={{ width: 250, marginTop: 1 }} />
      </Box>
      {IssueNewBook ? <IssuedBooks /> : <IssueABook />}
    </div>
  );
};

export default IssueBook;
