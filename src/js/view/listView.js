import { elements } from "./base";

export const deleteItem = (id) => {
  const el = document.querySelector(`.shopping__item[data-itemid="${id}"]`);
  el.parentElement.removeChild(el);
};

export const renderItem = (item) => {
  const html = `
    <li class="shopping__item" data-itemId=${item.id}>   
    <p class="shopping__description">${item.item}</p>
    <button class="shopping__delete btn-tiny">
        <svg>
            <use href="img/icons.svg#icon-circle-with-cross"></use>
        </svg>
    </button>
    </li> `;
  elements.itemDiv.insertAdjacentHTML("beforeend", html);
};

export const clearItem = () => (elements.itemDiv.innerHTML = "");
