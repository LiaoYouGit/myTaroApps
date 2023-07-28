import Http from '@/lib/http';

export function pageList (data) {
  return Http.get('/address/list', {
    ...data,
  });
}

export function queryById (id) {
  return Http.get('/address/queryById', {
    id,
  });
}

export function create (data) {
  return Http.post('/address/create', {
    ...data,
  });
}

export function update (data) {
  return Http.post('/address/update', {
    ...data,
  });
}

export function deleteAddress (id) {
  return Http.post('/address/delete', {
    id,
  });
}

export function region (parentId = 0) {
  return Http.get('/address/region', { parentId });
}
