import Http from '@/lib/http';

export function pageList (data) {
  return Http.get('/purchaseOrder/pageList', {
    ...data,
  });
}

export function create (data) {
  return Http.post('/purchaseOrder/create', {
    ...data,
  });
}

export function getDetail (id) {
  return Http.get('/purchaseOrder/detail', {
    id,
  });
}

export function reapply (id) {
  return Http.post('/purchaseOrder/reapply', {
    id,
  });
}

export function complete (id) {
  return Http.post('/purchaseOrder/complete', {
    id,
  });
}

export function cancel (id) {
  return Http.post('/purchaseOrder/cancel', {
    id,
  });
}

export function getExportUrl (data) {
  return Http.getUrl('/purchaseOrder/export', {
    ...data,
  });
}

export function getUserList (query) {
  return Http.get('/purchaseOrder/apply/user/list', {
    ...query,
  });
}

export function purchaseStatementsPageList (query) {
  return Http.get('/purchaseStatements/pageList', {
    ...query,
  });
}

export function exportOrder (query) {
  return Http.getUrl('/purchaseStatements/exportOrder', {
    ...query,
  });
}

export function detail (id) {
  return Http.get(`/purchaseStatements/detail?id=${id}`);
}

export function orderPageList (query) {
  return Http.get('/purchaseStatements/detail/orderPageList', query);
}

export function getTotalPurchaseOrderPrice (query) {
  return Http.get('/purchaseStatements/detail/getTotalPurchaseOrderPrice', query);
}

export function exportDetailOrder (query) {
  return Http.getUrl('/purchaseStatements/detail/exportOrder', {
    ...query,
  });
}

export function getTotalPurchasePrice (query) {
  return Http.get('/purchaseOrder/getTotalPurchasePrice', query);
}
