import { useSearchParams, useNavigate } from 'react-router-dom';
import doLogin from '../doLogin';
import RemoteLoader from '@kne/remote-loader';

const AccountLogin = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const referer = searchParams.get('referer');
  return <RemoteLoader module='Account@Login' onSubmit={(formData) => {
    return doLogin({
      email: formData.email,
      password: formData.password,
      referer,
      navigate
    });
  }}>
  </RemoteLoader>
};

export default AccountLogin;