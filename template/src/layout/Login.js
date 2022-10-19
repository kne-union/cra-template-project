import classNames from 'classnames';
import { Outlet, useLocation } from 'react-router-dom';
import style from './style.module.scss';

const Layout = () => {
  const location = useLocation();
  const name = location.pathname.split('/')[2];
  return <div className={style['layout-row']}>
    <div className={classNames(style['layout-inner'], name)}>
        <div className={style['layout-inner-wrapper']}>
          <Outlet />
        </div>
    </div>
  </div>;
};

export default Layout;
