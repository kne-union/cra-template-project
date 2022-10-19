import { Space, Popover, Divider } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import style from './style.module.scss';
import accountToken from '../util/accountToken';
import { get } from 'lodash';
import classNames from 'classnames';
import UserInfoProvider from '../common/UserInfoProvider';
import { useContext } from '../context';
import { getCache } from '@kne/react-fetch';
import RemoteLoader, { createWithRemoteLoader } from '@kne/remote-loader';
import { useState } from 'react';

const menuMapping = new Map([]);

export const PopoverItem = ({ className, iconRender, iconProps, title, onClick }) => {
  return <Space className={classNames('space-full', style.popover_item, className)} onClick={() => {
    onClick && onClick();
  }}>
    <span className={style.popover_item_icon}>{iconProps ?
      <RemoteLoader size={20} {...iconProps} module='Icon' /> : iconRender}</span>
    <span className={style.popover_item_title}>{title}</span>
  </Space>;
};

const LayoutInner = ({ remoteModules }) => {
  const [PermissionsProvider, Layout, Avatar] = remoteModules;
  const { permissions, userInfo, company } = useContext();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return <PermissionsProvider permissions={permissions}>
    <Layout navigation={{
      headerLogo: get(company, 'companyLogo') ? { id: get(company, 'companyLogo'), alt: 'test' } : {},
      mapping: menuMapping,
      permissions,
      rightOptions: <Space wrap={false} size={32}>
        <Popover trigger={'click'} open={open} onOpenChange={(newOpen) => setOpen(newOpen)} placement='bottomRight'
          overlayClassName={style.User_Popover}
          content={<Space className='space-full' direction='vertical'>
            <Space className={classNames('space-full', style.UserInfo)}>
              <Avatar size={48} shape='circle' src={get(userInfo, 'avatar') || get(userInfo, 'gender')}></Avatar>
              <Space direction='vertical' className={classNames('space-full', style.user_cursor)}>
                <span>
                  {get(userInfo, 'name') || '-'}
                </span>
                <span className='field-label'>
                  {get(userInfo, 'email') || '-'}
                </span>
              </Space>
            </Space>
            <Divider style={{ margin: '2px 0' }} />
            <PopoverItem title='退出登录' iconProps={{ type: 'icon-tuichudenglu' }} className={style.logout}
              onClick={() => {
                setOpen(false);
                accountToken.token = '';
                const cache = getCache();
                cache.delByCacheName('user-info');
                navigate('/account/login');
              }} />
          </Space>}>
          <Space>
            <Avatar style={{ marginTop: '-4px' }} shape='circle' src={get(userInfo, 'avatar') || get(userInfo, 'gender')}></Avatar>
            <span className={classNames(style.user_name, 'ellipse')}>{get(userInfo, 'name') || '-'}</span>
            <RemoteLoader module='Icon' type='icon-triangle-down' className={style['triangle-down']} size={12} />
          </Space>
        </Popover>
      </Space>
    }}><Outlet /></Layout>
  </PermissionsProvider>;
};

const AfterLoginLayout = createWithRemoteLoader({
  modules: ['Permissions@PermissionsProvider', 'Layout', 'Avatar']
})(({ remoteModules }) => {
  return <UserInfoProvider>
    <LayoutInner remoteModules={remoteModules} />
  </UserInfoProvider>;
});

export default AfterLoginLayout;
