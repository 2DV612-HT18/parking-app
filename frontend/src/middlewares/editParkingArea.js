import store from "../store";

export default async ({ next, router }) => {
  const editParkingAreaPermission = store.getters.editParkingAreaPermission;

  if (!editParkingAreaPermission) {
    return router.push({ name: "404" });
  }

  return next();
};
