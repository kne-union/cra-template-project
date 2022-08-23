import { Routes, Route, Navigate } from 'react-router-dom';
import { pages } from './pages';

const {
  NotFound,
  Home
} = pages;

function App() {
  return (
    <Routes>
      <Route path='/'>
        <Route index element={<Home />} />
        <Route path='/404' element={<NotFound />} />
        <Route path='*' element={<Navigate to='/404' />} />
      </Route>
    </Routes>
  );
}

export default App;