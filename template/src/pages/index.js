import loadable from '@loadable/component';
import { Spin } from 'antd';

const loadableWithProps = (func) => {
    const LoadableComponent = loadable(func, {
        fallback: <Spin style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }} />
    });
    return LoadableComponent;
};

export const pages = {
    NotFound: loadableWithProps(() => import('./NotFound')),
    Login: loadableWithProps(() => import('./Account/Login')),
    Forget: loadableWithProps(() => import('./Account/Forget')),
    ResetPassword: loadableWithProps(() => import('./Account/ResetPassword')),
    AccountModify: loadableWithProps(() => import('./Account/Modify')),
    Home: loadableWithProps(() => import('./Home')),
};
