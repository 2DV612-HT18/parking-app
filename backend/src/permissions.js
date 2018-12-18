import { shield, not, and } from "graphql-shield";
import isAuthenticated from "./lib/middlewares/isAuthenticated";
import isParkingOwner from "./lib/middlewares/isParkingOwner";
import createParkingArea from "./lib/middlewares/createParkingArea";
import isAdministrator from "./lib/middlewares/isAdministrator";
import isUser from "./lib/middlewares/isUser";

export default shield({
  Query: {
    myInfo: isAuthenticated,
    getNotifications: isAuthenticated,
    getParkingArea: isAuthenticated
  },
  Mutation: {
    registerUser: not(isAuthenticated),
    loginUser: not(isAuthenticated),
    logoutUser: isAuthenticated,
    removeVehicle: isAuthenticated,
    addParkingArea: and(isAuthenticated, isParkingOwner),
    removeParkingArea: and(isAuthenticated, isParkingOwner),
    editParkingArea: and(isAuthenticated, isParkingOwner, createParkingArea),
    addUser: and(isAuthenticated, isAdministrator),
    addNotification: and(isAuthenticated, isAdministrator),
    dismissNotification: isAuthenticated,
    addRate: and(isAuthenticated, isParkingOwner),
    chooseParkingArea: and(isAuthenticated, isUser)
  }
});
