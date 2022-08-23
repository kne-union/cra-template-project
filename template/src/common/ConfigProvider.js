import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import 'moment/locale/zh-cn';

const LocalConfigProvide = ({ locale, children }) => {
    return <ConfigProvider locale={locale || zhCN}>
        {children}
    </ConfigProvider>
};

export default LocalConfigProvide;