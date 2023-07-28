export default defineAppConfig({
  pages: [
    // 商品管理
    'pages/goods/index',
    // 商品详情
    'pages/goods/detail',
    // 生成采购单
    '/pages/goods/createSales',
    // 采购单管理
    'pages/order/index',
    // 审批管理
    'pages/apply/index',
    // 我的
    'pages/my/index',
    // 登录
    'pages/login/index'
  ],
  tabBar: {
    list: [
      {
        iconPath: 'assets/shopping.png',
        selectedIconPath: 'assets/shopping_active.png',
        pagePath: 'pages/goods/index',
        text: '商品',
      },
      {
        iconPath: 'assets/order.png',
        selectedIconPath: 'assets/order_active.png',
        pagePath: 'pages/order/index',
        text: '采购单',
      },
      {
        iconPath: 'assets/apply.png',
        selectedIconPath: 'assets/apply_active.png',
        pagePath: 'pages/apply/index',
        text: '审批',
      },
      {
        iconPath: 'assets/home.png',
        selectedIconPath: 'assets/home_active.png',
        pagePath: 'pages/my/index',
        text: '我的',
      },
    ],
    color: '#000',
    selectedColor: '#56abe4',
    backgroundColor: 'white',
    borderStyle: 'black',
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '广州医科大学第二附属医院',
    navigationBarTextStyle: 'black'
  }
})
