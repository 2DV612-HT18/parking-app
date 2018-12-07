import store from "../store";

export default ({ next, router }) => {
  if (!store.state.user) {
    return router.push({ name: "404" });
  }

  const roles = store.state.user.roles;
  const hasParkingOwnerRole = roles.find(role => role.addParkingAreaPermission);

  if (!hasParkingOwnerRole) {
    return router.push({ name: "404" });
  }

  return next();
};
