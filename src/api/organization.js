import Http from '@/lib/http';

export function getList (data) {
  return Http.get('/gjh/organization/list', {
    ...data,
  });
}

export async function getTree (data) {
  const result = await getList(data);

  const map = {};
  const list = [];
  result.forEach(item => {
    if (item.level === 1) {
      list.push(item);
    }

    if (!map[item.parentDepartmentId]) {
      map[item.parentDepartmentId] = [];
    }
    map[item.parentDepartmentId].push(item);

    item.children = map[item.id] = map[item.id] || [];
  });

  console.log(list)
  return list;
}

export function addOrganization (data) {
  return Http.post('/gjh/organization/add', {
    ...data,
  });
}

export function updateOrganization (data) {
  return Http.post('/gjh/organization/update', {
    ...data,
  });
}

export function setManager (data) {
  return Http.post('/organization/manager', {
    ...data,
  });
}

export function deleteOrganization (departmentId) {
  return Http.post('/organization/delete', {
    departmentId,
  });
}
