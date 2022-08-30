import Search from "./model/Search";
import { clearLoader, elements, renderLoader } from "./view/base";
import * as searchView from "./view/searchView";
import * as recipeView from "./view/recipeView";
import Recipe from "./model/Recipe";
import List from "./model/List";
import * as listView from "./view/listView";
import Like from "./model/Like";
import * as likeView from "./view/likeView";
import Likes from "./model/Like";
/**
 * WEB APP STATEMENT
 */
const state = {};

// Лайк цэсийг хаах
likeView.toggleLikeMenu(0);

//  Хайлтын контроллер
const controllerSearch = async () => {
  // 1. Дэлгэцнээс хайлтын түлхүүр үгийг авна
  const query = searchView.getQuery();

  // 2. Түлхүүр үгээр хайлтын обьект үүсгэнэ
  state.recipe = new Search(query);

  // 3. Дэлгэцний UI бэлтгэнэ
  searchView.clearResult();
  // Эргэлдэж байгаа сумыг гаргаж үзүүлэх
  renderLoader(elements.searchResultDiv);

  // 4. Түлхүүр үгээр хайлтыг хийнэ
  await state.recipe.doSearch();
  // Хайлт хийж дуусангуут эргэлдэж байгаа сумыг алга болгох
  clearLoader();

  // 5. Хайлтын үр дүнг дэлгэцэнд үзүүлнэ
  searchView.renderRecipes(state.recipe.recipes);
};

// Хайлтын эвент листенер
elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controllerSearch();
});

// Хуудасны эвент листенер
elements.searchPagesDiv.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-inline");
  if (btn) {
    const gotoNumber = parseInt(btn.dataset.goto, 10);
    searchView.clearResult();
    searchView.renderRecipes(state.recipe.recipes, gotoNumber);
  }
});

/**
 * Жорын контроллер
 */
const controllerRecipe = async () => {
  // 1. Хайх ID-г салгаж авна
  const id = recipeView.getId();

  // Лайкын обьект үүсгэнэ
  if (!state.likes) state.likes = new Likes();

  // Url дээр ID байгаа эсэхийг шалгана
  if (id) {
    // 2. Жорны обьект үүсгэнэ
    state.recipe = new Recipe(id);

    // 3. Жорны дэлгэц UI бэлтгэнэ
    // Дэлгэцэн дээр өмнө нь жор байсан бол устгана
    recipeView.clearRecipe();
    renderLoader(elements.recipeDiv);

    // 4. Жорыг сонгоно
    await state.recipe.getRecipe();
    recipeView.highlightSelectedRecipe(id);
    clearLoader();

    // 5. Хоолыг хийх хугацаа болон хэдэн хүний порцыг тодорхойлно
    state.recipe.calcTime();
    state.recipe.calcHuniiToo();

    // 6. Жорыг дэлгэцэнд гаргана
    //   recipeView.renderRecipe(recipe);
    recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
  }
};

// Жорын контроллер
window.addEventListener("hashchange", controllerRecipe);
window.addEventListener("load", (e) => {
  controllerRecipe();
  // Апп дөнгөж эхлэхэд лайк обьект үүсгэнэ
  if (!state.likes) state.likes = new Likes();

  // Лайк цэс гаргах эсэхийг шийднэ
  likeView.toggleLikeMenu(state.likes.getNumofLikes());

  // Лайк байвал түүнийг лайк цэсэнд нэмнэ
  state.likes.likes.forEach(likeView.renderLike);
});

/**
 * Листний контроллер
 */
const controllerList = () => {
  // 1. ID-г авна
  // 2. Листээр обьект үүсгэнэ
  state.list = new List();

  // 3. Дэлгэцний UI бэлтгэнэ
  // Дэлгэцний item-г цэвэрлэх
  listView.clearItem();

  //   Листэнд item нэмэх
  state.recipe.ingredients.forEach((el) => {
    // листэндээ item нэмнэ
    const newItem = state.list.addItem(el);

    // 4. Листийг дэлгэцэнд гаргана.
    listView.renderItem(newItem);
  });
};

/**
 * Лайк товчны контроллер
 */
const controllerLike = () => {
  // Одоо харагдаж байгаа жорыг ID-г авна
  const currentId = state.recipe.id;

  // Энэ жорыг лайклагдсан эсэхийг шалгана
  if (state.likes.isLiked(currentId)) {
    // Лайкыг авч хаяна
    state.likes.deleteLike(currentId);

    // Дэлгэцнээс устгах
    likeView.deleteLike(currentId);
    likeView.toggleLikeBtn(false);
    console.log(state.likes);
  } else {
    // Лайклана
    const newLike = state.likes.addLike(
      currentId,
      state.recipe.title,
      state.recipe.publisher,
      state.recipe.image_url
    );
    // Дэлгэц дээр харуулна
    likeView.renderLike(newLike);
    likeView.toggleLikeBtn(true);
    console.log(state.likes);
  }

  // Зүрхний менюг гаргахаа шийднэ
  likeView.toggleLikeMenu(state.likes.getNumofLikes());
};

elements.recipeDiv.addEventListener("click", (e) => {
  if (e.target.matches(".recipe__btn, .recipe__btn *")) {
    controllerList();
  } else if (e.target.matches(".recipe__love, .recipe__love *")) {
    controllerLike();
  }
});

elements.itemDiv.addEventListener("click", (e) => {
  if (e.target.matches(".shopping__delete, .shopping__delete *")) {
    const id = e.target.closest(".shopping__item").dataset.itemid;
    // list обьектоос устгана
    state.list.deleteItem(id);
    //   Дэлгэцнээс устгана
    listView.deleteItem(id);
  }
});
