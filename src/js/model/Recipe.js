import axios from "axios";
export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  getRecipe = async () => {
    const result = await axios(
      `https://forkify-api.herokuapp.com/api/get?rId=${this.id}`
    );
    const recipe = result.data.recipe;
    this.image_url = recipe.image_url;
    this.ingredients = recipe.ingredients;
    this.publisher = recipe.publisher;
    this.publisher_url = recipe.publisher_url;
    this.social_rank = recipe.social_rank;
    this.source_url = recipe.source_url;
    this.title = recipe.title;
  };

  calcTime = () => (this.time = this.ingredients.length * 5);
  calcHuniiToo = () => (this.huniiToo = 4);
}
