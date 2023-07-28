import Http from '@/lib/http';

export function pageList (data) {
  return Http.get('/goods/pageList', {
    ...data,
  });
}

export function platformCategory (data) {
  return Http.get('/goods/platformCategory', {
    ...data,
  });
}

export function allCategory () {
  return Http.get('/goods/allCategory');
}
