export default class Notification {
  constructor(id, message, author, dismissed) {
    this.id = id;
    this.message = message;
    this.author = author;
    this.dismissed = dismissed;
  }
}
