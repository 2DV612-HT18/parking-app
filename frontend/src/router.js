import Vue from "vue";
import Router from "vue-router";
import Member from "./views/Member.vue";

import checkInfo from "./middlewares/checkInfo";
import authenticated from "./middlewares/authenticated";
import notAuthenticated from "./middlewares/notAuthenticated";
import admin from "./middlewares/admin";
import addParkingArea from "./middlewares/addParkingArea";
import editParkingArea from "./middlewares/editParkingArea";

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
        middleware: [authenticated, admin]
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
      component: () => import("./views/area/Parent.vue"),
      children: [
        {
          path: "",
          name: "ParkingAreas",
          meta: {
            middleware: authenticated
          },
          component: () => import("./views/area/Home.vue")
        },
        {
          path: "create",
          name: "CreateParkingArea",
          meta: {
            middleware: [authenticated, addParkingArea]
          },
          component: () => import("./views/area/Create.vue")
        },
        {
          path: "edit/:id",
          name: "EditParkingArea",
          meta: {
            middleware: [authenticated, editParkingArea]
          },
          component: () => import("./views/area/Edit.vue")
        },
        { //Must be last
          path: ":id",
          name: "ViewParkingArea",
          meta: {
            middleware: [authenticated]
          },
          component: () => import("./views/area/View.vue")
        }
      ]
    },
    {
      path: "/404",
      name: "404",
      component: () => import("./views/404.vue")
    },
    {
      path: "*",
      redirect: "/404"
    }
  ]
});

// Get authentication on each route change
router.beforeEach(async (to, from, next) => {
  const context = {
    from,
    next,
    router,
    to
  };
  return checkInfo(context);
});

// Middleware
async function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) return context.next;

  return async (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    await context.next(...parameters);
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = await nextFactory(context, middleware, index + 1);
    await subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}
router.beforeEach(async (to, from, next) => {
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
    const nextMiddleware = await nextFactory(context, middleware, 1);

    return middleware[0]({ ...context, next: nextMiddleware });
  }

  return next();
});

export default router;
