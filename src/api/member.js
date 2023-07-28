import Http from '@/lib/http';

export function pageList (data) {
  return Http.get('/member/pageList', {
    ...data,
  });
}

export function add (data) {
  return Http.post('/member/add', {
    ...data,
  });
}

export function update (data) {
  return Http.post('/member/update', {
    ...data,
  });
}

export function batchUpdate (data) {
  return Http.post('/member/batchUpdate', {
    ...data,
  });
}

export function getDetail (id) {
  return Http.get('/member/query', { id });
}

export function getQuota (id) {
  return Http.get('/member/getQuota', { id });
}
