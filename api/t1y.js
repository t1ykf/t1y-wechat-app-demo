const CryptoJS = require('crypto-js');

const T1Y_API_URL = 'https://api.t1y.net'; // 您的T1后端云域名（需要添加到小程序白名单）
const T1Y_APP_ID = '1001'; // 您的 APP ID
const T1Y_APP_API_KEY = '2c6118c4e02b40fe96f5c40ee1dc5561'; // 您的 API Key
const T1Y_APP_SECRET_KEY = 'ac5070d211904b9a835e4f67138a36b7'; // 您的 Secret Key

// 添加一条数据
export const createOne = (collection, params) => {
  return request(`/v5/classes/${collection}`, params, 'POST');
}

// 删除一条数据
export const deleteOne = (collection, id) => {
  return request(`/v5/classes/${collection}/${id}`, {}, 'DELETE');
}

// 更新一条数据
export const updateOne = (collection, id, params) => {
  return request(`/v5/classes/${collection}/${id}`, params, 'PUT');
}

// 查询一条数据
export const findOne = (collection, id) => {
  return request(`/v5/classes/${collection}/${id}`, {}, 'GET');
}

// 查询全部数据（分页查询）
export const findAll = (collection, page, size) => {
  return request(
    `/v5/classes/${collection}?page=${page}&size=${size}`,
    {},
    'GET'
  );
}

// 批量添加数据
export const createMany = (collection, params) => {
  return request(`/v5/classes/${collection}/batch`, params, 'POST');
}

// 批量删除数据
export const deleteMany = (collection, params) => {
  return request(`/v5/classes/${collection}/batch`, params, 'DELETE');
}

// 批量更新数据
export const updateMany = (collection, params) => {
  return request(`/v5/classes/${collection}/batch`, params, 'PUT');
}

// 高级查询（分页、排序、比较）
export const query = (collection, params) => {
  return request(`/v5/classes/${collection}/query`, params, 'POST');
}

// 聚合查询（分组、聚合、运算）
export const aggregate = (collection, params) => {
  return request(`/v5/classes/${collection}/aggregate`, params, 'POST');
}

// 查询所有集合
export const getAllCollections = () => {
  return request(`/v5/schemas`, {}, 'GET');
}

// 创建集合
export const createCollection = (collection) => {
  return request(`/v5/schemas/${collection}`, {}, 'POST');
}

// 清空集合
export const clearCollection = (collection) => {
  return request(`/v5/schemas/${collection}`, {}, 'PUT');
}

// 删除集合
export const deleteCollection = (collection) => {
  return request(`/v5/schemas/${collection}`, {}, 'DELETE');
}

// 发送邮件
export const sendEmail = (to, subject, content) => {
  return request(`/v5/sys/email`, {to: to, subject: subject, body: content}, 'POST');
}

// 发送短信验证码
export const sendSMSCode = (phone) => {
  return request(`/v5/sys/code?phone=${phone}`, {}, 'GET');
}

// 调用云函数
export const callFunc = (name, params) => {
  return request(`/${T1Y_APP_ID}/${name}`, params, 'POST');
}

export const request = (path, params, method) => {
  // 封装统一请求函数
  const url = T1Y_API_URL + path; // 构建完整请求url
  const nonceStr = md5(Math.floor(Math.random() * (1000 - 1 + 1)) + 1); // 生成32位随机数安全码
  const timestamp = Math.floor(Date.now() / 1000); // 获取当前时间戳，精确到秒
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: method,
      data: method === 'get' ? undefined : params,
      header: {
        // 构建T1后端云请求加密头
        'X-T1Y-Application-ID': T1Y_APP_ID,
        'X-T1Y-Api-Key': T1Y_APP_API_KEY,
        'X-T1Y-Safe-NonceStr': nonceStr,
        'X-T1Y-Safe-Timestamp': timestamp,
        'X-T1Y-Safe-Sign': md5(
            getUrlPath(url) +
            T1Y_APP_ID +
            T1Y_APP_API_KEY +
            nonceStr +
            timestamp +
            T1Y_APP_SECRET_KEY
        ), // 生成请求签名
      },
      success: (res) => {
        const code = res.statusCode.toString();
        if (code.startsWith('2')) {
          resolve(res.data);
        } else {
          reject(res.data);
        }
      },
      fail: (err) => {
        reject(err);
      }
    })
  })
}

export const md5 = (text) => {
  return CryptoJS.MD5(text).toString();
}

const getUrlPath = (url) => {
  const match = url.match(/https?:\/\/[^\/]+(\/[^?#]*)/);
  return match ? match[1] : '/';
}