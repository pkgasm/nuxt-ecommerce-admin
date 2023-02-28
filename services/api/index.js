import User from "./users";
import Media from "./media";
import Category from "./categories";

export default class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.users = new User(this.baseUrl);
    this.media = new Media(this.baseUrl);
    this.categories = new Category(this.baseUrl)
  }
}
