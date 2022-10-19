import RemoteLoader from '@kne/remote-loader';
import AccountLogin from './accountLogin';

const Login = () => {
  return <RemoteLoader module='Account@OuterContainer' className="outer">
    <AccountLogin />
  </RemoteLoader>
};

export default Login;
