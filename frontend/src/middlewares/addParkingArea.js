import store from "../store";

export default async ({ next, router }) => {
  const addParkingAreaPermission = store.getters.addParkingAreaPermission;

  if (!addParkingAreaPermission) {
    return router.push({ name: "404" });
  }

  return next();
};
