import { Divider } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import AddStudents from './AddStudents';
import ViewStudents from './ViewStudents';

const Students = () => {
  const [addStudent, setAddStudents] = useState(false);
  const [ViewStudent, setViewStudents] = useState(true);
  return (
    <div>
      <Box m={3}>
        <Box fontWeight={'bold'} fontSize={20} display={'flex'} justifyContent={'center'}>
          STUDENTS
        </Box>
        <Box display={'flex'} width={250} justifyContent={'space-between'}>
          {' '}
          <Box
            component={'div'}
            fontWeight={'bold'}
            sx={{ cursor: 'pointer' }}
            color={ViewStudent ? 'blue' : 'black'}
            onClick={() => {
              setAddStudents(false);
              setViewStudents(true);
            }}
          >
            View Students
          </Box>
          <Box
            component={'div'}
            fontWeight={'bold'}
            sx={{ cursor: 'pointer' }}
            color={addStudent ? 'blue' : 'black'}
            onClick={() => {
              setAddStudents(true);
              setViewStudents(false);
            }}
          >
            Add Students
          </Box>
        </Box>
        <Divider sx={{ width: 250, marginTop: 1 }} />
      </Box>
      {ViewStudent ? <ViewStudents /> : <AddStudents />}
    </div>
  );
};

export default Students;
