import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { axiosUrl } from '../../axios/axiosInstance';
import { useNavigate } from 'react-router-dom';

const IssuedBooks = () => {
  const naviget = useNavigate();
  const [books, setBooks] = useState([]);
  console.log(books);
  useEffect(() => {
    axiosUrl
      .get('/getIssuedBooks')
      .then((result) => {
        setBooks(result.data);
      })
      .catch((err) => {
        naviget('/error');
      });
  }, [naviget]);

  return (
    <div>
      <Box display={'flex'} justifyContent={'center'}>
        <Box>
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
                      Student
                    </Box>
                    <Box> {book.sutdent?.name}</Box>
                  </Box>
                  <Box>
                    <Box fontWeight={'bold'} mb={2}>
                      Issued date
                    </Box>
                    <Box> {book.issuedDate}</Box>
                  </Box>
                  <Box>
                    <Box fontWeight={'bold'} mb={2}>
                      Return date
                    </Box>
                    <Box> {book.returnDate}</Box>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </div>
  );
};

export default IssuedBooks;
