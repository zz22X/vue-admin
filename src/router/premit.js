import router from "./index";
import {
  getToken
} from "@/utils/app"

const whiteRouter = ['/login']
//路由守卫
router.beforeEach((to, from, next) => {
  if (getToken()) {
    //console.log('成功获取token')
    next()
  } else {
    //如果路径是login 就进入
    if (whiteRouter.indexOf(to.path) !== -1) { //indexof =-1 不存在
      next()
    } else {
      //不是则去到 login
      next( '/login' )
    }
  }
})