import fullpage from "fullpage.js";
import "fullpage.js/dist/fullpage.min.css";

import { InitStars } from "./stars";

const TEMPLATE_SELECTOR = "#fullpage";
const SNOWFLAKE_SELECTOR = ".snowflake";
const MOVE_DOWN_BUTTON = ".move-down";

const SECTION_CLASS = ".section";
const TO_TOP_CLASS = "to-top";

export const InitFullPage = () => {
  let fullpageInstance = null;

  function initStarsForAllSections() {
    const sections = document.querySelectorAll(SECTION_CLASS);
    sections.forEach((section) => InitStars(section));
  }

  function checkFullpageInit() {
    if (window.innerWidth >= 1024 && !fullpageInstance) {
      fullpageInstance = new fullpage(TEMPLATE_SELECTOR, {
        onLeave: function (origin, destination) {
          const snowflake = document.querySelector(SNOWFLAKE_SELECTOR);
          if (snowflake) {
            if (origin.index === 0 && destination.index === 1) {
              snowflake.classList.add(TO_TOP_CLASS);
            }
            if (origin.index === 1 && destination.index === 0) {
              snowflake.classList.remove(TO_TOP_CLASS);
            }
          }
        },
        afterLoad: function (origin, destination) {
          InitStars(destination.item);
        },
      });
    } else if (window.innerWidth < 1024 && fullpageInstance) {
      fullpage_api.destroy("all");
      fullpageInstance = null;

      initStarsForAllSections();
    } else if (window.innerWidth < 1024 && !fullpageInstance) {
      initStarsForAllSections();
    }
  }

  window.addEventListener("load", checkFullpageInit);
  window.addEventListener("resize", checkFullpageInit);

  const moveButtons = document.querySelectorAll(MOVE_DOWN_BUTTON);
  if (moveButtons) {
    moveButtons.forEach((moveButton) => {
      moveButton.addEventListener("click", () => {
        if (typeof fullpage_api !== "undefined") {
          fullpage_api.moveSectionDown();
        }
      });
    });
  }
};
