import Http from '@/lib/http';

export function add (query) {
  return Http.post('/cart/add', query);
}

export function deleteGoods (skuIds) {
  return Http.post('/cart/delete', skuIds);
}

export function modify (data) {
  return Http.post('/cart/modify', {
    ...data,
  });
}

export function getApprovalType () {
  return Http.get('/cart/getApprovalType');
}

export function getList () {
  return Http.get('/cart/get');
}

export function select (skuIds) {
  return Http.post('/cart/select', skuIds);
}
