import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
//引入组件布局
import Layout from "@/views/layout/index.vue"
const routes = [{
    path: "/",
    redirect: "/login",
    hidden: true,
    meta: {
      name: "主页"
    }
  },
  {
    path: "/login",
    name: "Login",
    hidden: true,
    meta: {
      name: "登录",
      requireAuth: true,
    },
    component: () => import("../views/login/index.vue")
  },
  {
    path: "/console",
    name: "Console",
    hidden: false,
    redirect: "index",
    meta: {
      name: "控制台",
      icon: "control",
    },
    component: Layout,
    children: [{
      path: "/index",
      name: "Index",
      hidden: false,
      meta: {
        name: "首页"
      },
      component: () => import("../views/console/index.vue")
    }]
  },
  {
    path: "/info",
    name: "Info",
    hidden: false,
    meta: {
      name: "信息管理",
      icon: "info"
    },
    component: Layout,
    children: [{
        path: "/infoList",
        name: "InfoList",
        hidden: false,
        meta: {
          name: "信息列表"
        },
        component: () => import("../views/info/index.vue")
      },
      {
        path: "/infoCategory",
        name: "InfoCategory",
        hidden: false,
        meta: {
          name: "信息分类"
        },
        component: () => import("../views/info/category.vue")
      },
      {
        path: "/infoDetail/:id",
        name: "InfoDetail",
        hidden: true,
        meta: {
          name: "信息详情"
        },
        component: () => import("../views/info/detail.vue")
      }
    ]
  },
  {
    path: "/user",
    name: "User",
    hidden: false,
    meta: {
      name: "用户管理",
      icon: "user"
    },
    component: Layout,
    children: [{
      path: "/userList",
      name: "UserList",
      hidden: false,
      meta: {
        name: "用户列表"
      },
      component: () => import("../views/user/index.vue")
    }]
  }
];

const router = new VueRouter({
  routes
});

export default router;