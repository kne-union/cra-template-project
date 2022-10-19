import { Provider } from '../context';
import { createWithFetch, getCache } from '@kne/react-fetch';
import merge from 'lodash/merge';
import { getUserInfo } from '../apis/account';
// import get from 'lodash/get';

const UserInfoProvider = createWithFetch(merge({}, getUserInfo, {
  // onRequestError: (e, d) => {
  //   const data = get(e, '[0].responseData');
  //   if (get(data, 'code') === 30003) {
  //     window.location.href = `/account/modify/${get(data, 'results.userInfo.email')}`;
  //   }
  // }
}))(({ data, children, reload }) => {
  const handleRefresh = () => {
    const cache = getCache();
    cache.delByCacheName('user-info');
    reload();
  }
  return <Provider value={{
    userInfo: { ...(data.userInfo || {}) },
    permissions: data.permissions || [],
    company: data.company || {},
    reload,
    refresh: handleRefresh
  }}>
    {children}
  </Provider>;
});

export default UserInfoProvider;
