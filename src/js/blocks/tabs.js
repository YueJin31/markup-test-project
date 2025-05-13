const SELECTORS = {
  navItemsContainers: ".tabs__item-title",
  navItems: ".tabs__item-header > a",
  contentItems: ".tabs__panel",
  navContainer: ".tabs__item",
  block: ".tabs",
  active: "is-active",
};

class Tabs {
  constructor(template) {
    this.template = template;

    this.navItemsContainers = template.querySelectorAll(SELECTORS.navItemsContainers);
    this.navItems = template.querySelectorAll(SELECTORS.navItems);
    this.contentItems = template.querySelectorAll(SELECTORS.contentItems);
    this.navContainer = template.querySelector(SELECTORS.navContainer);

    this.currentIndex = 0;
  }

  bindEvents() {
    this.navItems.forEach((item, index) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        this.goToTab(index);
      });
    });
  }

  goToTab(index) {
    const currentNavItem = this.navItems[this.currentIndex]?.closest(SELECTORS.navItemsContainers);
    const currentContent = this.contentItems[this.currentIndex];

    const nextNavItem = this.navItems[index]?.closest(SELECTORS.navItemsContainers);
    const nextContent = this.contentItems[index];

    if (currentNavItem) currentNavItem.classList.remove(SELECTORS.active);
    if (currentContent) currentContent.classList.remove(SELECTORS.active);
    if (nextNavItem) nextNavItem.classList.add(SELECTORS.active);
    if (nextContent) nextContent.classList.add(SELECTORS.active);

    this.currentIndex = index;
  }

  initActiveTab() {
    this.template.querySelector(`${SELECTORS.navItemsContainers}:first-child`)?.classList.add(SELECTORS.active);
    this.template.querySelector(`${SELECTORS.contentItems}:first-child`)?.classList.add(SELECTORS.active);
  }

  init() {
    this.initActiveTab();
    this.bindEvents();
  }
}

export const InitTabs = () => {
  document.querySelectorAll(SELECTORS.block).forEach((template) => {
    const tabs = new Tabs(template);
    tabs.init();
  });
};
