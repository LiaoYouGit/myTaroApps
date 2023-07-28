import md5 from 'md5';
import Http from '@/lib/http';

export function login (data) {
  return Http.post('/platform/login', {
    userName: data.userName,
    password: md5(data.password),
  });
}
