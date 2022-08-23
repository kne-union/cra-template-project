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
    Home: loadableWithProps(() => import('./Home')),
};
