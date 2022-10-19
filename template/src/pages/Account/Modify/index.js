import Form, { Input, SubmitButton } from '@kne/react-form-antd';
import { useParams, useNavigate } from 'react-router-dom';
import { message, Space } from 'antd';
import { ajax } from '../../../preset';
import { modifyPassword } from '../../../apis/account';
import merge from 'lodash/merge';
import md5 from 'md5';
import style from '../style.module.scss';
import doLogin from '../doLogin';

const Modify = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  return <Form type="inner" size="large" onSubmit={(formData) => {
    const newPwd = md5(formData.newPwd);
    return ajax(merge({}, modifyPassword, {
      data: {
        email: formData.email,
        oldPwd: md5(formData.oldPwd),
        newPwd: newPwd,
        confirmPwd: newPwd
      }
    })).then(({ data }) => {
      if (data.code === 0) {
        message.success('重置密码成功');
        return doLogin({
          email: formData.email,
          password: formData.newPwd,
          navigate
        }).then(({ data }) => {
          if (data.code !== 0) {
            navigate('/account/login');
          }
        });
      }
    });
  }}>
    <Space className="space-full" style={{ width: '420px' }} size={40} direction="vertical">
      <div className={style['title']}>
        修改密码
        <div className={style.reset_new_desc}>首次登陆系统时，需要您修改初始密码</div>
      </div>
      <div>
        <Input name="email" label="邮箱账号" disabled value={decodeURIComponent(email)} />
        <Input.Password name="oldPwd" label="原密码" rule="REQ LEN-6-50" />
        <Input.Password name="newPwd" label="新密码" rule="REQ LEN-6-50" />
        <Input.Password name="rNewPwd" label="重复新密码" rule="REQ LEN-6-50 REPEAT-newPwd" />
      </div>
      <SubmitButton block size="large">提交</SubmitButton>
    </Space>
  </Form>;
};

export default Modify;
