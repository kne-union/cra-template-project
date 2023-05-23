import React from 'react';
import { preset as fetchPreset } from '@kne/react-fetch';
import { Spin, Empty } from 'antd';
import axios from 'axios';
import { preset as remoteLoaderPreset } from '@kne/remote-loader';


window.UC_URL = 'http://uc.dev.fatalent.cn';
window.PUBLIC_URL = window.runtimePublicPath || process.env.PUBLIC_URL;
window.STATIC_BASE_URL = window.runtimeStaticBaseUrl || window.UC_URL;
window.ICONFONT_URL = (window.runtimeStaticBaseUrl || window.UC_URL) + '/iconfont';

remoteLoaderPreset({
    remotes: {
        default: {
            remote: 'exceed_components',
            url: window.STATIC_BASE_URL,
            defaultVersion: process.env.EXCEED_COMPONENTS_VERSION
        },
        'components-core': {
            remote: 'components-core',
            url: window.STATIC_BASE_URL,
            defaultVersion: process.env.EXCEED_COMPONENTS_VERSION
        }
    }
});

export const ajax = axios.create({
    validateStatus: function () {
        return true;
    }
});


fetchPreset({
    ajax,
    loading: <Spin delay={500} style={{ position: 'absolute', left: '50%', padding: '10px', transform: 'translateX(-50%)' }} />,
    error: null,
    empty: <Empty />,
    transformResponse: (response) => {
        const { data } = response;
        response.data = {
            code: data.code === 0 ? 200 : data.code, msg: data.msg, results: data.data
        };
        return response;
    }
});