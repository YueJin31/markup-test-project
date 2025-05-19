const DROPDOWN_SELECTOR = ".template-large-dropdown";
const SELECTED_SELECTOR = ".selected-display";
const DROPDOWN_LIST = ".dropdown";
const DROPDOWN_ITEM = ".dropdown__item";

const ACTIVE_CLASS = "is-active";

export const CustomSelect = () => {
  const dropdowns = document.querySelectorAll(DROPDOWN_SELECTOR);

  dropdowns.forEach(initDropdown);
};

function initDropdown(dropdownWrapper) {
  const selectedDisplay = dropdownWrapper.querySelector(SELECTED_SELECTOR);
  const dropdownList = dropdownWrapper.querySelector(DROPDOWN_LIST);
  const items = dropdownList?.querySelectorAll(DROPDOWN_ITEM);

  if (!selectedDisplay || !dropdownList || !items?.length) return;

  const toggleDropdown = () => {
    dropdownWrapper.classList.toggle(ACTIVE_CLASS);
  };

  const closeDropdown = () => {
    dropdownWrapper.classList.remove(ACTIVE_CLASS);
  };

  const selectItem = (item) => {
    selectedDisplay.textContent = item.textContent;

    items.forEach((i) => i.classList.remove(ACTIVE_CLASS));
    item.classList.add(ACTIVE_CLASS);
    closeDropdown();
  };

  selectedDisplay.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleDropdown();
  });

  items.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.stopPropagation();
      selectItem(item);
    });
  });

  document.addEventListener("click", (e) => {
    if (!dropdownWrapper.contains(e.target)) {
      closeDropdown();
    }
  });
}
