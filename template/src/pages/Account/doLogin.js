import { ajax } from '../../preset';
import merge from 'lodash/merge';
import { login } from '../../apis/account';
import md5 from 'md5';
import { message } from 'antd';
import accountToken from '../../util/accountToken';

const doLogin = ({ email, password, referer, navigate }) => {
  return ajax(merge(login, {
    data: {
      email,
      password: md5(password)
    }
  })).then((response) => {
    const { data, headers } = response;
    if (data.code === 0) {
      message.success('登录成功');
      accountToken.token = headers['x-fat-token'];
      let refererHref = '/'
      if (referer) {
        const _referer = decodeURIComponent(referer);
        let obj = new URL(/http(s)?:/.test(_referer) ? _referer : window.location.origin + _referer);
        obj.searchParams.delete('X-FAT-TOKEN');
        refererHref = obj.pathname + obj.search;
      }
      navigate(refererHref);
    }

    return response;
  });
};

export default doLogin;
