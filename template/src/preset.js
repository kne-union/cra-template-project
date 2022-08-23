import '@kne/react-form-antd/dist/index.css';
import React from 'react';
import moment from 'moment';
import { interceptors, preset as formPreset } from '@kne/react-form-antd';
import { preset as fetchPreset } from '@kne/react-fetch';
import { Spin, Result, message, Empty } from 'antd';
import axios from 'axios';
import accountToken from './util/accountToken';
import { preset as remoteLoaderPreset } from '@kne/remote-loader';
import { preset as enhancePreset } from '@kne/antd-enhance';
import { GlobalProvider } from './common/Global';
import ConfigProvider from './common/ConfigProvider';
import { getOSSFile } from './apis/common';

remoteLoaderPreset({
    remote: 'ui_components', url: '//ued.dev.fatalent.cn/ui_components/remoteEntry.js'
});

(() => {
    const el = document.createElement('script');
    el.setAttribute('src', '//at.alicdn.com/t/font_3386048_o0x6gvpwkx.js');
    document.body.appendChild(el);
})();

interceptors.input.use('array-single', (value) => {
    return value ? [value] : [];
});

interceptors.output.use('array-single', (value) => {
    return value ? value[0] : null;
});

interceptors.input.use('date-string', (value) => {
    return value ? moment(value) : null;
});

interceptors.output.use('date-string', (value) => {
    return value ? (new Date(value.valueOf())).toISOString() : '';
});

interceptors.input.use('date-range-string', (value) => {
    if (!Array.isArray(value)) {
        return [];
    }

    const output = [];

    if (value[0]) {
        output.push(moment(value[0]));
    }
    if (value[0] && value[1] && value[1] === 'sofar') {
        output.push('至今');
    }
    if (value[0] && value[1] && value[1] !== '至今') {
        output.push(moment(value[1]));
    }

    return output;
});

interceptors.output.use('date-range-string', (value) => {
    if (!Array.isArray(value)) {
        return [];
    }

    const output = [];

    if (value[0]) {
        output.push((new Date(value[0].valueOf())).toISOString());
    }
    if (value[0] && value[1] && value[1] === '至今') {
        output.push('sofar');
    }
    if (value[0] && value[1] && value[1] !== '至今') {
        output.push((new Date(value[1].valueOf())).toISOString());
    }
    return output;
});

interceptors.output.use('file-format', (value) => {
    if (typeof value === 'string') {
        if (!value) {
            return value;
        }
        const [id, originalName] = value.split('?filename=');
        return { id, originalName };
    }

    if (Array.isArray(value)) {
        if (value.length === 0) {
            return value;
        }
        return value.map((str) => {
            const [id, originalName] = str.split('?filename=');
            return { id, originalName };
        });
    }
    return value;
});

interceptors.input.use('file-format', (value) => {
    if (!Array.isArray(value) && value && value.hasOwnProperty('id') && value.hasOwnProperty('originalName')) {
        if (!value) {
            return value;
        }
        return value.id + '?filename=' + value.originalName;
    }

    if (Array.isArray(value)) {
        if (value.length === 0) {
            return value;
        }
        return value.map(({ id, originalName }) => {
            return id + '?filename=' + originalName;
        });
    }
    return value;
});

formPreset({
    type: 'inner',
    rules: {
        REPEAT: (value, rname, formData) => {
            const data = formData;
            if (value === data[rname]) {
                return {
                    result: true,
                    errMsg: ''
                };
            } else {
                return {
                    result: false,
                    errMsg: '%s不一致'
                };
            }
        }
    }, field: {
        upload: {
            action: '/api/v1/attachment/upload', transformResponse: (response) => {
                return {
                    code: response.code === 0 ? 200 : response.code,
                    results: response.data.id + '?filename=' + response.data.originalName,
                    msg: response.msg
                };
            },
            getHeaders: () => {
                return {
                    'X-FAT-TOKEN': accountToken.token
                }
            },
            defaultProps: {
                fileSize: 20,
                interceptor: 'file-format',
                headers: {
                    'X-FAT-TOKEN': accountToken.token
                }
            }
        }, avatar: {
            action: '/api/v1/attachment/upload', transformResponse: (response) => {
                return {
                    code: response.code === 0 ? 200 : response.code,
                    results: response.data.id + '?filename=' + response.data.originalName,
                    msg: response.msg
                };
            },
            getHeaders: () => {
                return {
                    'X-FAT-TOKEN': accountToken.token
                }
            },
            defaultProps: {
                interceptor: 'file-format'
            }
        },
        datePicker: {
            defaultProps: {
                interceptor: 'date-string'
            }
        },
        rangeDatePicker: {
            defaultProps: {
                interceptor: 'date-range-string'
            }
        }
    }
});

export const ajax = axios.create({
    validateStatus: function () {
        return true;
    }
});

ajax.interceptors.request.use((config) => {
    config.headers = {
        'X-FAT-TOKEN': accountToken.token
    };

    if (config.method.toUpperCase() !== 'GET') {
        config.headers['Content-Type'] = 'application/json';
    }

    return config;
});

ajax.interceptors.response.use((response) => {
    if (response.status === 200 && response.data.code === 401) {
        const searchParams = new URLSearchParams(window.location.search);
        const referer = encodeURIComponent(window.location.pathname + window.location.search);
        searchParams.append('referer', referer);
        window.location.href = '/login?' + searchParams.toString();
        return response;
    }
    if ((response.status !== 200 || response.data.code !== 0) && response.config.showError !== false) {
        message.error(response.data.msg || '请求发生错误');
    }
    return response;
});

fetchPreset({
    ajax,
    loading: <Spin style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }} />,
    error: <Result status="error" title="请求发生错误" />,
    empty: <Empty />,
    transformResponse: (response) => {
        const { data } = response;
        response.data = {
            code: data.code === 0 ? 200 : data.code, msg: data.msg, results: data.data
        };
        return response;
    }
});

export const globalPreset = {
    ossApi: getOSSFile,
    ajax
};

enhancePreset({
    withLayerInstall: (WrappedComponent) => (props) => <GlobalProvider>
        <ConfigProvider>
            <WrappedComponent {...props} />
        </ConfigProvider>
    </GlobalProvider>
});

message.config({
    top: 100
});