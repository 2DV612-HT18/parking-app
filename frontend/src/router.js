import Vue from "vue";
import Router from "vue-router";
import Member from "./views/Member.vue";

import isParkingOwner from "./middlewares/isParkingOwner";
import { authenticated, notAuthenticated } from "./vue-apollo";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Member,
      meta: {
        middleware: authenticated
      }
    },
    {
      path: "/404",
      name: "404",
      component: () => import("./views/404.vue")
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/login",
      name: "login",
      meta: {
        middleware: notAuthenticated
      },
      component: () => import("./views/Login.vue")
    },
    {
      path: "/register",
      name: "register",
      meta: {
        middleware: notAuthenticated
      },
      component: () => import("./views/Register.vue")
    },
    {
      path: "/verify",
      name: "verifyEmail",
      component: () => import("./views/VerifyEmail.vue")
    },
    {
      path: "/admin",
      name: "Administration",
      meta: {
        middleware: authenticated
      },
      component: () => import("./views/Administration.vue")
    },
    {
      path: "/closeaccount",
      name: "CloseAccount",
      meta: {
        middleware: authenticated
      },
      component: () => import("./views/CloseAccount.vue")
    },
    {
      path: "/area",
      meta: {
        middleware: authenticated
      },
      component: () => import("./views/area/Parent.vue"),
      children: [
        {
          path: "",
          name: "ParkingAreas",
          component: () => import("./views/area/Home.vue")
        },
        {
          path: "create",
          name: "CreateParkingArea",
          meta: {
            middleware: [authenticated, isParkingOwner]
          },
          component: () => import("./views/area/Create.vue")
        }
      ]
    }
  ]
});

// Middleware
function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters);
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}
router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to
    };
    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({ ...context, next: nextMiddleware });
  }

  return next();
});

export default router;
