export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/welcome',
  },

  {
    path: '/device',
    name: '设备管理',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/device/devicelist',
        name: '设备列表',
        icon: 'smile',
        component: './Device/DeviceList',
      },
      // {
      //   path: '/device/Devicedetails',
      //   name: '设备详情',
      //   icon: 'smile',
      //   component: './Device/DeviceDetails',
      // },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/project',
    name: '工程管理',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/project/projectlist',
        name: '工程列表',
        icon: 'smile',
        component: './Project/ProjectList',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/menus',
    name: '菜单管理',
    icon: 'smile',
    component: './Menus',
  },
  {
    component: './404',
  },
];
