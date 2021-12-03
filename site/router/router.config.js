import { defineAsyncComponent } from 'vue';
import Home from "../pages/home/index.vue";
import Doc from "../pages/doc/index.vue";
import Login from "../pages/login/login.vue";
import Msite from "../pages/msite/msite.vue";
import Shop from "../pages/shop/shop.vue";
import Order from "../pages/order/order.vue";
import Profile from "../pages/profile/profile.vue";
import ConfirmOrder from "../pages/confirmOrder/confirmOrder.vue";
import Payment from "../pages/confirmOrder/children/payment.vue";

import docRouter from '../pages/doc/doc-router';
// import Material from '../pages/material/index.vue';
// import materialConfig from '../../material/index';
// import nav from './nav.config';

const getAsyncComponent = func => {
  return defineAsyncComponent({
    loader: func,
    delay: 0,
    timeout: 30000,
    // errorComponent: ErrorComponent,
    // loadingComponent: LoadingComponent,
  })
}

const LOAD_MAP = {
}

const load = (lang, page) => {
  LOAD_MAP[lang](page)
}

const LOAD_DOC_MAP = {
  // [Language.CN]: path => {
  //   return getAsyncComponent(() => import(/* webpackChunkName: "DOCS zh-CN" */ `./docs/zh-CN${path}.md`))
  // },
  // [Language.ES]: path => {
  //   return getAsyncComponent(() => import(/* webpackChunkName: "DOCS en-US" */ `./docs/en-US${path}.md`))
  // }
}

const loadDoc = (lang, page) => {
  LOAD_DOC_MAP[lang](page)
}

var registerRoute =  (nav) => {
  var routes = [];
  Object.keys(nav).forEach((lang, index)=> {
    var obj = {
      name: lang,
      path: lang,
      component: load(lang, lang)
    }
    if (nav[lang].children) {
      var childrenArr = []
      for (var i = 0; i < nav[lang].children.length; i++) {
        var childrenObj = {
          name: lang,
          path: lang,
          component: loadDoc(lang, lang)
        }
        childrenArr.push(childrenObj)
      }
      obj.children = childrenArr
    }
    routes.push(obj)
  })
}

// var routes = registerRoute(nav)

var routes = [
  {
    path: "/",
    redirect: '/msite'
  },
  {
    path: "/login",
    name: 'login',
    component: Login
  },
  {
    path: "/msite",
    name: 'msite',
    component: Msite
  },
  {
    path: "/shop",
    name: 'shop',
    component: Shop
  },
  {
    path: "/order",
    name: 'order',
    component: Order
  },
  {
    path: "/profile",
    name: 'profile',
    component: Profile
  },
  {
    path: "/confirm-order",
    name: 'confirmOrder',
    component: ConfirmOrder,
    children: [{
      path: "/confirm-order/payment",
      name: 'payment',
      component: Payment,
    }]
  },
  {
    path: "/doc",
    name: 'doc',
    redirect: '/doc/introduce',
    component: Doc,
    children: docRouter
  },
  // {
  //   path: '/material',
  //   name: 'materila',
  //   component: Material,
  //   children: materialConfig
  // }
]

export default routes;