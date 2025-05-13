import fullpage from "fullpage.js";
import "fullpage.js/dist/fullpage.min.css";

const TEMPLATE_CLASS = "#fullpage";
const SNOWFLAKE_CLASS = ".snowflake";
const MOVE_DOWN_BUTTON = ".move-down";

const TO_TOP_CLASS = "to-top";

export const InitFullPage = () => {
  let fullpageInstance = null;

  function checkFullpageInit() {
    if (window.innerWidth >= 1024 && !fullpageInstance) {
      fullpageInstance = new fullpage(TEMPLATE_CLASS, {
        onLeave: function (origin, destination) {
          const snowflake = document.querySelector(SNOWFLAKE_CLASS);

          if (!snowflake) return;

          if (origin.index === 0 && destination.index === 1) {
            snowflake.classList.add(TO_TOP_CLASS);
          }

          if (origin.index === 1 && destination.index === 0) {
            snowflake.classList.remove(TO_TOP_CLASS);
          }
        },
      });
    } else if (window.innerWidth < 1024 && fullpageInstance) {
      fullpage_api.destroy("all");
      fullpageInstance = null;
    }
  }

  window.addEventListener("load", checkFullpageInit);
  window.addEventListener("resize", checkFullpageInit);

  const moveButtons = document.querySelectorAll(MOVE_DOWN_BUTTON);

  if (!moveButtons) return;

  moveButtons.forEach((moveButton) => {
    moveButton.addEventListener("click", () => {
      fullpage_api.moveSectionDown();
    });
  });
};
