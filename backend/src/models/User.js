export default class User {
  constructor(
    id,
    role,
    firstName,
    lastName,
    email,
    personalNumber,
    password,
    verified
  ) {
    this.id = id;
    this.role = role;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.personalNumber = personalNumber;
    this.password = password;
    this.verified = verified;
  }
}
