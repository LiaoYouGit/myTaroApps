import Http from '@/lib/http';

export function getList () {
  return Http.get('/approvalModel/list');
}

export function add (data) {
  return Http.post('/approvalModel/add', { ...data });
}

export function update (data) {
  return Http.post('/approvalModel/update', { ...data });
}

export function isDefault (id) {
  return Http.post('/approvalModel/isDefault', { id });
}
