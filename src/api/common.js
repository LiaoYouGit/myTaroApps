import Http from '@/lib/http';

export function uploadImage (file) {
  const fd = new FormData();
  fd.append('multipartFile', file);
  return Http.post('/member/upload', fd);
}

export function getDomain () {
  return Http.get('/domain/getDomain');
}
