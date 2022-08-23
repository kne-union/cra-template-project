const CracoAntDesignPlugin = require("craco-antd");
const CracoModuleFederation = require('./craco-module-federation');
module.exports = {
    plugins: [
        {
            plugin: CracoAntDesignPlugin,
            options: {
                customizeTheme: {
                    '@primary-color': '#5CB8B2',
                    '@border-radius-base': '6px'
                }
            }
        }, 
        {
            plugin: CracoModuleFederation
        }
    ]
};
