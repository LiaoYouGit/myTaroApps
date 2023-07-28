import Http from '@/lib/http';

export function pageList (data) {
  return Http.get('/approval/pageList', {
    ...data,
  });
}

export function getDetail (approvalOrderId) {
  return Http.get('/approval/detail', {
    approvalOrderId,
  });
}

export function agree (data) {
  return Http.post('/approval/agree', {
    ...data,
  });
}

export function reject (data) {
  return Http.post('/approval/reject', {
    ...data,
  });
}

export function repeal (approvalOrderId) {
  return Http.post('/approval/repeal', {
    approvalOrderId,
  });
}

export function getList () {
  return Http.get('/gjh/approval/binding/list');
}
export function addBind (query) {
  return Http.post('/gjh/approval/binding/add',query);
}
export function updateBind (query) {
  return Http.post('/gjh/approval/binding/update',query);
}
export function deleteBind (query) {
  return Http.post('/gjh/approval/binding/delete',query);
}
