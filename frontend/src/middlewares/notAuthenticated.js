import store from "../store";

export default async ({ next, router }) => {
  if (store.state.user) {
    return router.push({ name: "home" });
  }
  return next();
};
