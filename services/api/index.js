import User from "./users";
import Media from "./media";

export default class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.users = new User(this.baseUrl);
    this.media = new Media(this.baseUrl);
  }
}
