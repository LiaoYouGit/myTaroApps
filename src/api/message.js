import Http from '@/lib/http';

export function pageList (data) {
  return Http.get('/message/pageList', {
    ...data,
  });
}

export function read (messageIds) {
  return Http.post('/message/read', {
    messageIds: Array.isArray(messageIds) ? messageIds : [messageIds],
  });
}
