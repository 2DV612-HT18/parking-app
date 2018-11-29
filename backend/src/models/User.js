export default class User {
  constructor(id, role, vehicles, firstName, lastName, email, personalNumber, password) {
    this.id = id;
    this.role = role;
    this.vehicles = vehicles;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.personalNumber = personalNumber;
    this.password = password;
    this.verified = verified;
  }
}
