import { sendForgetEmail } from '../../../apis/account';
import merge from 'lodash/merge';
import { ajax } from '../../../preset';
import style from '../style.module.scss';
import classNames from 'classnames';
import RemoteLoader from '@kne/remote-loader';

const Forget = () => {
  return <RemoteLoader module='Account@OuterContainer' className={classNames('outer', style.forgetInput)}>
    <RemoteLoader module='Account@Forget' onSubmit={(formData, success) => {
      return ajax(merge({}, sendForgetEmail, {
        data: { email: formData.email }
      })).then(({ data }) => {
        if (data.code === 0) {
          success && success(formData.email);
        }
      });      
    }}>
    </RemoteLoader>
  </RemoteLoader>;
};

export default Forget;
