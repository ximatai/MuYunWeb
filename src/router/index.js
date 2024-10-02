import {createRouter, createWebHistory} from "vue-router";
import {nextTick} from 'vue'

const base = [
    {
        path: "/",
        //路由重定向 门户页
        redirect: "/portal",
    },
    {
        path: "/portal",
        name: "Portal",
        component: () => import("../views/index.vue"),
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../views/login/index.vue"),
    },
    {
        path: "/error",
        name: "error",
        component: () => import("../views/error.vue"),
    }
]
/*
 * 动态加载模块路由
 * 约定式路由规则
 */
const allRouter = import.meta.glob('./*/index.js', {eager: true});
let modules =  []
for (const path in allRouter) {
    const module = allRouter[path];
    modules = modules.concat(module.router);
}

const router = createRouter({
    history: createWebHistory(),
    routes: [...base,...modules],
    scrollBehavior(to, from, savedPosition) {
        return new Promise((resolve, reject) => {
            nextTick(() => {
                resolve({top: 0});
            });
        });
    },
})

/**
 * 路由校验逻辑
 */
router.beforeEach((to, from) => {
    //用于路由跳转的的身份校验，不通过应该跳转到登录页 return { name: 'login' }
    return true;
})

export default router