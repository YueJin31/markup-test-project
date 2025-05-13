const OFFCANVAS_BUTTON = ".hamburger";
const OFFCANVAS_CLASS = ".offcanvas";

const SHOW_CLASS = "show";
const ACTIVE_CLASS = "is-active";

export const Offcanvas = () => {
  const menuToggle = document.querySelector(OFFCANVAS_BUTTON);
  const offcanvas = document.querySelector(OFFCANVAS_CLASS);

  if (!menuToggle || !offcanvas) return;

  const toggleMenu = () => {
    const isActive = menuToggle.classList.toggle(ACTIVE_CLASS);
    offcanvas.classList.toggle(SHOW_CLASS, isActive);
  };

  menuToggle.addEventListener("click", toggleMenu);
};
