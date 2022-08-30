import { elements } from "./base";

// Private
// Нэг хайлтыг дэлгэцэнд гаргах
const renderRecipe = (recipe) => {
  const html = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="Test">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${recipe.title}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>`;
  // Хайлтын html-г дэлгэцэнд харуулах
  elements.searchResultListtDiv.insertAdjacentHTML("beforeend", html);
};
// Хуудасны товчны html бэлтгэх
const createBtn = (currentPage, type, direction) => `
    <button class="btn-inline results__btn--${type}" data-goto=${currentPage}>
    <span>Хуудас ${currentPage}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${direction}"></use>
        </svg>
    </button>`;

// Хуудасны товчыг ямар ямар товч байхыг тооцоолох
const renderButton = (currentPage, totalPages) => {
  // Товч
  let btn;
  if (currentPage === 1 && totalPages > 1) {
    // 1-р хуудас дээр байна
    // Дараагийн хуудас руу шилжих товч гаргах
    btn = createBtn(currentPage + 1, "next", "right");
  } else if (currentPage < totalPages) {
    // Өмнөх хуудас руу шилжих товч гаргах
    btn = createBtn(currentPage - 1, "prev", "left");

    // Дараагийн хуудас руу шилжих товч гаргах
    btn += createBtn(currentPage + 1, "next", "right");
  } else if (currentPage !== 1 && currentPage === totalPages) {
    // Сүүлийн хуудас дээр байна
    // Өмнөх хуудас руу шилжих товч гаргах
    btn = createBtn(currentPage - 1, "prev", "left");
  }

  //  Хуудасны товчны Html оруулах
  elements.searchPagesDiv.insertAdjacentHTML("afterbegin", btn);
};

// Public
// Дэлгэцнээс хайлтын утгыг авах
export const getQuery = () => elements.searchInput.value;

// Хайлтан дээр гарч ирэх талбарыг цэвэрлэх
export const clearResult = () => {
  // Хайлтын түлхүүр үгийг арилгана
  elements.searchInput.value = "";

  // Хайлтын үр дүнг цэвэрлэнэ
  elements.searchResultListtDiv.innerHTML = "";

  // Хуудасны товчийн цэвэрлэнэ
  elements.searchPagesDiv.innerHTML = "";
};

// Дэлгэцэн дээр хайлтуудыг гаргаж ирэх
export const renderRecipes = (recipes, currentPage = 1, resPerPage = 10) => {
  // Хайлтын дэлгэцэнд үзүүлж эхлэх эхний элемент
  const start = (currentPage - 1) * resPerPage;

  // Хайлтын дэлгэцэнд үзүүлж эхлэх сүүлийн элемент
  const end = currentPage * resPerPage;

  // Хайлтыг start элементээс end элемент хүртэл тасдах
  recipes.slice(start, end).forEach(renderRecipe);

  // Нийт хэдэн хуудастай болохыг тооцоолох
  const totalPages = Math.ceil(recipes.length / resPerPage);

  // Хуудасны товчыг гаргах
  renderButton(currentPage, totalPages);
};
