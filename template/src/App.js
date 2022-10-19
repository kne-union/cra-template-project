import { Routes, Route, Navigate } from 'react-router-dom';
import { pages } from './pages';
import AfterLoginLayout from './layout/AfterLogin';
import LoginLayout from './layout/Login';

const {
  NotFound,
  Home,
  Login,
  Forget,
  ResetPassword,
  AccountModify
} = pages;

function App() {
  return (
    <Routes>
      <Route path='/' element={<AfterLoginLayout />}>
        <Route index element={<Home />} />
        <Route path='/404' element={<NotFound />} />
        <Route path='*' element={<Navigate to='/404' />} />
      </Route>
      <Route path='/account' element={<LoginLayout />}>
        <Route index element={<Navigate to='/account/login' replace={true} />} />
        <Route path='login' element={<Login />} />
        <Route path='forget' element={<Forget />} />
        <Route path='reset-password/:token' element={<ResetPassword />} />
        <Route path='modify/:email' element={<AccountModify />} />
      </Route>
    </Routes>
  );
}

export default App;