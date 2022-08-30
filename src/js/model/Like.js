export default class Likes {
  constructor() {
    this.readDataFromLocalStorage();
    if (!this.likes) this.likes = [];
  }

  addLike(id, title, publisher, img) {
    const newLike = { id, title, publisher, img };
    this.likes.push(newLike);
    // Storage руу хадгална
    this.saveDataLocalStorage();
    return newLike;
  }

  deleteLike(id) {
    // Устгах гэж байгаа элементийн index-г олно
    const index = this.likes.findIndex((el) => el.id === id);

    // Индексээр нь массиваас устгана
    if (index !== -1) this.likes.splice(index, 1);
    // Storage руу хадгална
    this.saveDataLocalStorage();
  }

  isLiked(id) {
    return this.likes.findIndex((el) => el.id === id) !== -1;
  }

  getNumofLikes() {
    return this.likes.length;
  }

  saveDataLocalStorage() {
    localStorage.setItem("likes", JSON.stringify(this.likes));
  }

  readDataFromLocalStorage() {
    this.likes = JSON.parse(localStorage.getItem("likes"));
  }
}
