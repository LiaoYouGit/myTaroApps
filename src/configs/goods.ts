// 商品类型 value-1为类型值，因为nut-tabs组件中0 == null，导致全部商品和自营商品的key一致，故此设计
export const goodsTypeOptions = [
  { text: '全部商品', value: 0 },
  { text: '自营商品', value: 1 },
  { text: '协议价商品', value: 2 }
]

// 商品类型
export const goodsTypMap ={
  0: '自营商品',
  1: '协议价商品'
}


