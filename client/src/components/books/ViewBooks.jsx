import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { axiosUrl } from '../../axios/axiosInstance';
import { useNavigate } from 'react-router-dom';
import EditBooks from './EditBooks';

const ViewBooks = () => {
  const naviget = useNavigate();
  const [books, setBooks] = useState([]);
  const [deleted, setDeleted] = useState();
  const [open, setOpen] = useState(false);
  const [bookId, setBookId] = useState(false);

  useEffect(() => {
    axiosUrl
      .get('/getBooks')
      .then((result) => {
        setBooks(result.data);
      })
      .catch((err) => {
        console.log(err);
        naviget('/error');
      });
  }, [naviget, deleted, open]);

  const deleteBook = (bookId) => {
    axiosUrl
      .delete('/deletebook', {
        params: {
          bookId,
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
        <Box>
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

                  <Box
                    component={'div'}
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                      setOpen(true);
                      setBookId(book._id);
                    }}
                  >
                    <EditIcon />
                  </Box>
                  <Box
                    component={'div'}
                    sx={{ cursor: 'pointer' }}
                    color={'red'}
                    onClick={() => deleteBook(book._id)}
                  >
                    <DeleteIcon />
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
      {open ? <EditBooks open={open} setOpen={setOpen} bookId={bookId} /> : ''}
    </div>
  );
};

export default ViewBooks;
