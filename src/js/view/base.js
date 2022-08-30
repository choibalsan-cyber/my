export const elements = {
  searchForm: document.querySelector(".search"),
  searchInput: document.querySelector(".search__field"),
  searchResultListtDiv: document.querySelector(".results__list"),
  searchPagesDiv: document.querySelector(".results__pages"),
  searchResultDiv: document.querySelector(".results"),
  recipeDiv: document.querySelector(".recipe"),
  itemDiv: document.querySelector(".shopping__list"),
  likesListDiv: document.querySelector(".likes__list"),
  likesMenuDiv: document.querySelector(".likes__field"),
};

export const elementStrings = {
  loader: "loader",
};

export const renderLoader = (parent) => {
  // loader html
  const loader = `
    <div class="loader">
        <svg>
            <use href="img/icons.svg#icon-cw"</use>
        </svg>
    </div>`;
  parent.insertAdjacentHTML("afterbegin", loader);
};

export const clearLoader = () => {
  // Устгах гэж буй элемент
  const el = document.querySelector(`.${elementStrings.loader}`);
  el.parentNode.removeChild(el);
};
