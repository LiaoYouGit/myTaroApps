import numeral from 'numeral';
import Http from './http';
import Taro from '@tarojs/taro'

// format 开头的方法会自动注册全局过滤器
export function formatDate (time, format = 'YY-MM-DD hh:mm:ss') {
  /**
   *  formatDate(new Date().getTime());//2017-05-12 10:05:44
   *  formatDate(new Date().getTime(),'YY年MM月DD日');//2017年05月12日
   *  formatDate(new Date().getTime(),'今天是YY/MM/DD hh:mm:ss');//今天是2017/05/12 10:07:45
   */
  var newTime;
  if (!time) newTime = '';
  else {
    var date = new Date(time);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();

    // 开个长度为10的数组 格式为 00 01 02 03
    var preArr = Array.apply(null, Array(10)).map(function (elem, index) {
      return '0' + index;
    });

    newTime = format
      .replace(/YY/g, year)
      .replace(/MM/g, preArr[month] || month)
      .replace(/DD/g, preArr[day] || day)
      .replace(/hh/g, preArr[hour] || hour)
      .replace(/mm/g, preArr[min] || min)
      .replace(/ss/g, preArr[sec] || sec);
  }

  return newTime;
}

export function createFormatDate (format) {
  return val => formatDate(val, format);
}

export function formatObjectEmpty (object) {
  if (object !== null && object !== undefined && !(object instanceof Array) && object.constructor === Object) {
    let p;
    for (p in object) {
      // eslint-disable-next-line no-prototype-builtins
      if (object.hasOwnProperty(p)) {
        const value = object[p];
        if (value === undefined || value === null) {
          delete object[p];
          continue;
        }
        object[p] = formatObjectEmpty(value);
      }
    }
  }
  return object;
}

export function formatAmount (amount, format = '0,0.00') {
  return amount === null ? null : numeral(amount).format(format);
}

export function downloadFile (url) {
  window.open(url);
}

export function map2Select (map, allLabel = '全部', allValue = '') {
  const options = [];
  if (allLabel !== false) {
    options.push({
      label: allLabel,
      value: allValue,
    });
  }

  options.push(...Object.keys(map).map(key => ({
    label: map[key],
    value: key,
  })));

  return {
    type: 'select',
    options,
  };
}

// 路由跳转 普通跳转
export function $navigateTo(url,query){
  if(query){
    url = Http.getUrl(url,query,false)
  }

  Taro.navigateTo({
    url // 目标页面的路径
  });
}

// 路由跳转 销毁当前页
export function $redirectTo(url,query){
  if(query){
    url = Http.getUrl(url,query,false)
  }
  Taro.redirectTo({
    url // 目标页面的路径
  });
}

// 路由跳转 保留当前页状态
export function $switchTab(url,query){
  if(query){
    url = Http.getUrl(url,query,false)
  }
  Taro.switchTab({
    url // 目标页面的路径
  });
}

// 路由跳转 返回上一页
export function $navigateBack(){
  Taro.navigateBack()
}
