import Http from '@/lib/http';
import md5 from 'md5';

export function getLoginInfo () {
  return Http.get('/auth/getLoginInfo');
}

export function logout () {
  return Http.post('/auth/logout');
}

export function login ({ ...data }) {
  data.password = md5(data.password);
  return Http.post('/auth/login', {
    ...data,
  });
}
