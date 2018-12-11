export default class Role {
  constructor(id, name, registration, admin, addParkingAreaPermission, editParkingAreaPermission) {
    this.id = id;
    this.name = name;
    this.registration = registration;
    this.admin = admin;
    this.addParkingAreaPermission = addParkingAreaPermission;
    this.editParkingAreaPermission = editParkingAreaPermission;
  }
}
