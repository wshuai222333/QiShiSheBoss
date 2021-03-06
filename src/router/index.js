import Vue from 'vue'
import Router from 'vue-router'

import AppView from '@/components/app-view'
import Home from '@/pages/home'

Vue.use(Router)

const page = name => () =>
    import ('@/pages/' + name)

const manage = name => () =>
    import ('@/manage/' + name)
const managepages = name => () =>
    import ('@/managepages/' + name)
export default new Router({
    mode: 'history',
    routes: [{
            path: '',
            component: AppView,
            children: [{
                    path: '/',
                    name: 'home',
                    component: Home
                },
                {
                    path: '/order',
                    name: 'order',
                    component: manage('order')
                },
                {
                    path: '/agentorder',
                    name: 'agentorder',
                    component: manage('agentorder')
                },
                {
                    path: '/qrcodeorder',
                    name: 'qrcodeorder',
                    component: manage('qrcodeorder')
                },
                {
                    path: '/userlist',
                    name: 'userlist',
                    component: manage('userlist')
                },
                {
                    path: '/agentlist',
                    name: 'agentlist',
                    component: manage('agentlist')
                },
                {
                    path: '/problem',
                    name: 'problem',
                    component: manage('problem')
                },
                {
                    path: '/advice',
                    name: 'advice',
                    component: manage('advice')
                },
                {
                    path: '/button',
                    name: 'c-button',
                    component: page('c-button')
                },
                {
                    path: '/switch',
                    name: 'c-switch',
                    component: page('c-switch')
                },
                {
                    path: '/checkbox',
                    name: 'c-checkbox',
                    component: page('c-checkbox')
                },
                {
                    path: '/alert',
                    name: 'c-alert',
                    component: page('c-alert')
                },
                {
                    path: '/input',
                    name: 'c-input',
                    component: page('c-input')
                },
                {
                    path: '/keyboard',
                    name: 'c-keyboard',
                    component: page('c-keyboard')
                },
                {
                    path: '/loading',
                    name: 'c-loading',
                    component: page('c-loading')
                },
                {
                    path: '/data-table',
                    name: 'p-data-table',
                    component: page('table')
                },
                {
                    path: '/dropdown',
                    name: 'c-dropdown',
                    component: page('c-dropdown')
                },
                {
                    path: '/navbar',
                    name: 'c-navbar',
                    component: page('c-navbar')
                },
                {
                    path: '/container',
                    name: 'c-container',
                    component: page('c-container')
                },
                {
                    path: '/demo',
                    name: 'demo',
                    component: page('demo')
                },
                {
                    path: '/404',
                    name: '404',
                    component: page('404')
                },
                {
                    path: '/500',
                    name: '500',
                    component: page('500')
                },
                {
                    path: '/backgrounduser',
                    name: 'backgrounduser',
                    component: managepages('backgrounduser')
                },
                {
                    path: '/enterpriselist',
                    name: 'enterpriselist',
                    component: managepages('enterpriselist')
                },
                {
                    path: '/stafflist',
                    name: 'stafflist',
                    component: managepages('stafflist')
                },
                {
                    path: '/orderdown',
                    name: 'orderdown',
                    component: managepages('orderdown')
                },
                {
                    path: '/orderdetail',
                    name: 'orderdetail',
                    component: managepages('orderdetail')
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: page('login')
        },
        {
            path: '/cnode',
            name: 'cnode',
            component: page('cnode')
        },
        // pages
        {
            path: '/home-login',
            name: 'p-login',
            component: page('home-login')
        },
        {
            path: '/register',
            name: 'p-register',
            component: page('register')
        },
        {
            path: '/keyboard',
            name: 'p-keyboard',
            component: page('c-keyboard')
        },
        {
            path: '*',
            redirect: {
                name: '404'
            }
        }
    ]
})