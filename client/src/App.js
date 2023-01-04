import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import ViewLogin from './pages/ViewLogin';
import PrivetRouter from './PrivetRouter';
import Authorisation from './Authorisation';
import ViewStudents from './pages/ViewStudents';
import ServerError from './components/errorPages/ServerError';
import ViewBooks from './pages/ViewBooks';
import ViewIssueBooks from './pages/ViewIssueBooks';

function App() {
  return (
    <Box>
      <BrowserRouter>
        <Routes>
          <Route element={<Authorisation />}>
            <Route path="/" element={<ViewLogin />} />
          </Route>

          <Route path="/error" element={<ServerError />} />

          <Route element={<PrivetRouter />}>
            <Route path="/dashboard/students" element={<ViewStudents />} />
            <Route path="/dashboard/books" element={<ViewBooks />} />
            <Route path="/dashboard/issued-books" element={<ViewIssueBooks />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
