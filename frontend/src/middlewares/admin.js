import store from "../store";

export default async ({ next, router }) => {
  const adminPermission = store.getters.adminPermission;

  if (!adminPermission) {
    return router.push({ name: "404" });
  }

  return next();
};
