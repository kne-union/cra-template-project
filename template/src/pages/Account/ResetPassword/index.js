import Form, { Input, SubmitButton } from '@kne/react-form-antd';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import style from '../style.module.scss';
import { Space, message } from 'antd';
import { createWithFetch } from '@kne/react-fetch';
import { parseResetEmailToken, resetPassword } from '../../../apis/account';
import { ajax } from '../../../preset';
import md5 from 'md5';
import merge from 'lodash/merge';
import doLogin from '../doLogin';
import { LeftOutlined } from '@ant-design/icons';

const EmailInput = createWithFetch(merge({}, parseResetEmailToken, {
  loading: <Input name="email" disabled label="邮箱账号" rule="REQ EMAIL" />,
  error: () => <Navigate to="/account/login"/>
}))(({ data }) => <Input name="email" disabled value={data.email} label="邮箱账号" rule="REQ EMAIL" />);

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  return <>
    <div className={style.paas_back_link}>
      <Space>
        <LeftOutlined />已有账户，去登录
      </Space>
    </div>
    <Form type="inner" size="large" onSubmit={(formData) => {
      const password = md5(formData.password);
      return ajax(merge({}, resetPassword, {
        data: {
          token: decodeURIComponent(token),
          email: formData.email,
          newPwd: password,
          confirmPwd: password
        }
      })).then(({ data }) => {
        if (data.code === 0) {
          message.success('重置密码成功');
          return doLogin({
            email: formData.email,
            password: formData.password,
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
          设置新密码
          <div className={style.reset_new_desc}>您正在重置登录密码，请设置您的新密码</div>
        </div>
        <div>
          <EmailInput data={{
            token: decodeURIComponent(token)
          }} />
          <Input.Password name="password" label="新密码" rule="REQ LEN-6-50" />
          <Input.Password name="confirmPwd" label="重复密码" rule="REQ LEN-6-50 REPEAT-password" />
        </div>
        <SubmitButton block size="large">提交</SubmitButton>
      </Space>
    </Form>
  </>;
};

export default ResetPassword;
