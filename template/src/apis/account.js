export const login = {
  url: '/api/v1/user/login/', method: 'POST'
};

export const getUserInfo = {
  url: '/api/v1/user/user/user',
  cache: 'user-info'
};

export const sendForgetEmail = {
  url: '/api/v1/user/login/email', method: 'POST'
};

export const parseResetEmailToken = {
  url: '/api/v1/user/login/reset/info', method: 'POST'
};

export const resetPassword = {
  url: '/api/v1/user/login/email/reset', method: 'POST'
};

export const modifyPassword = {
  url: '/api/v1/user/user/modify', method: 'PUT'
};

// 解除绑定
export const unbindDing = {
  url: '/api/v1/user/user/unbind_ding_ding', method: 'GET'
}

// 钉钉扫码绑定
export const bindDing = {
  url: '/api/v1/user/user/binding_ding_ding', method: 'GET'
}

// 生成钉钉二维码
export const getQrcode = {
  url: '/api/v1/user/user/ding_talk/get_qrcode', method: 'GET'
}
// 用户更新租户信息
export const updateCompanyUser = {
  url: '/api/v1/user/company/update/by/user', method: 'POST'
}