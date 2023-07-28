export function createTableColumns(list){
  return list.map(([title,dataIndex,options])=>createTableColumn(title,dataIndex,options))
}

export function createTableColumn(title,dataIndex,options){
  return {
    title,
    dataIndex,
    ...options,
  }
}
