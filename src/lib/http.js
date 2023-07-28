import Taro from '@tarojs/taro'
import { formatObjectEmpty, $redirectTo } from './util';
import userStore from '@/store/user';
// import router from '@/router/index';

const User = userStore()
const API = '/api';
const Http = {
  getUrl(url, query = null,isBaseUrl = true) {
    if (url.indexOf('/') !== 0) {
      url = '/' + url;
    }
    url = isBaseUrl ? API + url : url;
    if (query && typeof query === 'object' && JSON.stringify(query) !== '{}') {
      url += url.indexOf('?') === -1 ? '?' : '&';
      Object.keys(query).forEach(key => {
        url += `${key}=${query[key]}&`;
      });
    }
    return url;
  },
  responseCallback(data, resolve = () => { }, reject = () => { }) {
    if (typeof data !== 'object') {
      data = { desc: '网络错误', success: false };
    }
    if (data.success === true && data.code === '0000') {
      resolve(data.result);
    } else {
      if (data.statusCode && data.statusCode === 404) {
        return Taro.showToast({
          title: '网络接口404',
          duration: 2000, // 提示框显示的时长，单位为毫秒，默认为2000毫秒
          icon: 'error', // 提示框的图标，可选值为：'success', 'loading', 'none'
        });
      }
      Taro.showToast({
        title: data.desc || '未知错误，请刷新页面重试',
        duration: 2000, // 提示框显示的时长，单位为毫秒，默认为2000毫秒
        icon: 'error', // 提示框的图标，可选值为：'success', 'loading', 'none'
      });
      reject(data.desc);
    }
  },
  formatPostData(data) {
    const type = typeof data;
    if (data instanceof FormData || type !== 'object') {
      return data;
    } else {
      return JSON.stringify(data);
    }
  },
  formatContentType(data) {
    return data instanceof FormData ? null : 'application/json';
  },
  request(url, data, method = 'get', responseCallback = null) {
    data = formatObjectEmpty(data);
    url = Http.getUrl(url, method === 'get' ? data : null);

    return new Promise((resolve, reject) => {
      const header = {};
      const contentType = Http.formatContentType(data);
      if (contentType) {
        header['Content-Type'] = contentType;
      }

      console.log(url, data);

      Taro.request({
        url,
        method,
        credentials: 'include',
        data: method === 'post' ? Http.formatPostData(data) : null,
        header,
      })
        .then(res => {
          const { data } = res;
          console.log('return', data);
          if (['1001', '1002', '1004', '1005'].indexOf(data.code) > -1) {
            User.gotoLogin();
            reject(new Error('to login'));
          } else if (data.code === '1006') {
            Taro.showToast({
              title: '无权限',
              duration: 2000, // 提示框显示的时长，单位为毫秒，默认为2000毫秒
              icon: 'error', // 提示框的图标，可选值为：'success', 'loading', 'none'
            });
            $redirectTo(User.isAdmin ? '/pages/login/index' : '/');
          } else {
            if (typeof responseCallback === 'function') {
              responseCallback(data, resolve, reject);
            } else {
              Http.responseCallback(data, resolve, reject);
            }
          }
        })
        .catch(error => {
          reject(error);
          Taro.showToast({
            title: '未知错误，请刷新页面重试',
            duration: 2000, // 提示框显示的时长，单位为毫秒，默认为2000毫秒
            icon: 'error', // 提示框的图标，可选值为：'success', 'loading', 'none'
          });
        });
    });
  },
  getCacheMap: new Map(),
  async get(url, data = {}, responseCallback = null, isCache = false) {
    let cKey;
    if (isCache && Http.getCacheMap.has(cKey = url + JSON.stringify(data))) {
      console.log('is cache');
      return Http.getCacheMap.get(cKey);
    }

    return Http
      .request(url, data, 'get', responseCallback)
      .then(result => {
        if (isCache) {
          Http.getCacheMap.set(cKey, result);
        }
        return result;
      });
  },
  post(url, data = {}, responseCallback = null) {
    return Http.request(url, data, 'post', responseCallback);
  },
};

export default Http;
