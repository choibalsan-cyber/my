import uniqid from "uniqid";

export default class List {
  constructor() {
    this.items = [];
  }

  addItem = (item) => {
    const newItem = { id: uniqid(), item: item };
    this.items.push(newItem);
    return newItem;
  };

  deleteItem = (id) => {
    const index = this.items.findIndex((el) => el.id === id);
    if (index !== -1) this.items.splice(index, 1);
  };
}
