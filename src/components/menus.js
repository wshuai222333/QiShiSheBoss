const menus = [{
        id: '0',
        label: '控制面板',
        path: '/',
        icon: 'fa fa-dashboard'
    },
    // {
    //     id: 'manage',
    //     icon: 'fa fa-paper-plane',
    //     label: '机票管理',
    //     submenu: [{
    //         id: 'order',
    //         name: 'order',
    //         label: '机票订单',

    //     }, {
    //         id: 'qrcodeorder',
    //         name: 'qrcodeorder',
    //         label: '改签管理',

    //     }, {
    //         id: 'agentorder',
    //         name: 'agentorder',
    //         label: '退票管理',

    //     }]
    // },
    {
        id: 'order',
        icon: 'fa fa-paper-plane',
        label: '订单管理',
        submenu: [{
                id: 'orderdown',
                name: 'orderdown',
                label: '订单管理',

            }
        ]
    },
    {
        id: 'enterprise',
        icon: 'fa fa-microchip',
        label: '企业管理',
        submenu: [{
                id: 'enterpriselist',
                name: 'enterpriselist',
                label: '企业管理',

            },
            {
                id: 'stafflist',
                name: 'stafflist',
                label: '员工管理',

            }
        ]
    },
    // {
    //     id: 'user',
    //     icon: 'fa fa-users',
    //     label: '报表管理',
    //     submenu: [{
    //         id: 'userlist',
    //         name: 'userlist',
    //         label: '报表管理',

    //     }]
    // },
    {
        id: 'user',
        icon: 'fa fa-users',
        label: '系统管理',
        submenu: [{
            id: 'backgrounduser',
            name: 'backgrounduser',
            label: '用户管理',

        }]
    },
    // {
    //     id: 'components',
    //     icon: 'fa fa-microchip',
    //     label: '组件',
    //     submenu: [
    //         ['Form 表单', [{
    //                 id: 'f1',
    //                 name: 'c-button',
    //                 label: 'Button 按钮',
    //                 icon: 'fa fa-hand-o-up'
    //             },
    //             {
    //                 id: 'f2',
    //                 name: 'c-switch',
    //                 label: 'Switch 开关',
    //                 icon: 'fa fa-square-o'
    //             },
    //             {
    //                 id: 'f3',
    //                 name: 'c-checkbox',
    //                 label: 'Checkbox 多选框',
    //                 icon: 'fa fa-check-square'
    //             },
    //             // {id: 'f4', label: 'Radio 单选框', icon: 'fa fa-dot-circle-o'},
    //             {
    //                 id: 'f5',
    //                 name: 'c-input',
    //                 label: 'Input 输入框',
    //                 icon: 'fa fa-pencil'
    //             },
    //             {
    //                 id: 'f6',
    //                 name: 'c-keyboard',
    //                 label: '虚拟键盘',
    //                 icon: 'fa fa-keyboard-o'
    //             }
    //         ]],
    //         ['Notice', [{
    //                 id: 'n1',
    //                 name: 'c-alert',
    //                 label: 'Alert 警告',
    //                 icon: 'fa fa-info'
    //             },
    //             {
    //                 id: 'n2',
    //                 name: 'c-loading',
    //                 label: 'Loading 加载',
    //                 icon: 'fa fa-circle-o-notch'
    //             }
    //         ]],
    //         ['Other', [{
    //                 id: 'c-dropdown',
    //                 name: 'c-dropdown',
    //                 label: 'Dropdown'
    //             },
    //             {
    //                 id: 'c-navbar',
    //                 name: 'c-navbar',
    //                 label: 'Navbar'
    //             },
    //             {
    //                 id: 'c-container',
    //                 name: 'c-container',
    //                 label: '栅格布局'
    //             }
    //         ]]
    //     ]
    // },
    // {
    //     id: 'pages',
    //     icon: 'fa fa-circle-o',
    //     label: 'Pages 页面',
    //     submenu: [{
    //             id: 'p-data-table',
    //             name: 'p-data-table',
    //             label: 'Table 表格数据'
    //         },
    //         {
    //             id: 'cnode',
    //             name: 'cnode',
    //             label: 'Cnode社区'
    //         },
    //         {
    //             id: 'p1',
    //             name: 'login',
    //             label: 'Login 登录'
    //         },
    //         {
    //             id: 'p2',
    //             name: 'p-login',
    //             label: 'Login 登录2'
    //         },
    //         {
    //             id: 'p3',
    //             name: 'p-register',
    //             label: 'Register 注册'
    //         },
    //         {
    //             id: '400',
    //             path: '/404',
    //             label: '404'
    //         },
    //         {
    //             id: '500',
    //             path: '/500',
    //             label: '500'
    //         }
    //     ]
    // },
    // {
    //     id: 'examples',
    //     icon: 'fa fa-paper-plane',
    //     label: 'Examples',
    //     submenu: [{
    //         id: 'e1',
    //         path: '/500',
    //         label: 'Vuex 例子'
    //     }]
    // }
]
export default menus