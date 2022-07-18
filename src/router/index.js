import Vue from 'vue'
import Router from 'vue-router'
import UpsertUser from "../views/UpsertUser";
import Home from "../views/Home";

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/users/upsert',
      name: 'upsertUser',
      component: UpsertUser,
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

export default router