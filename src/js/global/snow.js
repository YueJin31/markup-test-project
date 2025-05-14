const SNOWFLAKE_COUNT = 70;
const SNOW_COLORS = ["#aaaacc", "#ddddFF", "#ccccDD"];
const SNOW_FONTS = ["Arial Black", "Arial Narrow", "Times", "Comic Sans MS"];
const SNOW_CHAR = "❅";
const SNOW_SPEED = 1.0;
const SNOW_SIZE_MAX = 20;
const SNOW_SIZE_MIN = 8;
const SNOW_AREA = 1; // 1: full page, 2: left, 3: center, 4: right

const snowflakes = [];
const coords = [];
const leftRight = [];
const xMovements = [];

let pageHeight;
let pageWidth;

function getRandom(range) {
  return Math.floor(Math.random() * range);
}

export const InitSnow = () => {
  pageHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
  pageWidth = Math.max(document.body.clientWidth, document.documentElement.clientWidth);

  const sizeRange = SNOW_SIZE_MAX - SNOW_SIZE_MIN;

  for (let i = 0; i <= SNOWFLAKE_COUNT; i++) {
    coords[i] = 0;
    leftRight[i] = Math.random() * 15;
    xMovements[i] = 0.03 + Math.random() / 10;

    const snowflake = document.createElement("span");
    snowflake.id = `s${i}`;
    snowflake.style.position = "absolute";
    snowflake.style.top = `-${SNOW_SIZE_MAX}px`;
    snowflake.style.fontFamily = SNOW_FONTS[getRandom(SNOW_FONTS.length)];
    snowflake.style.fontSize = `${getRandom(sizeRange) + SNOW_SIZE_MIN}px`;
    snowflake.style.color = SNOW_COLORS[getRandom(SNOW_COLORS.length)];
    snowflake.textContent = SNOW_CHAR;
    snowflake.style.pointerEvents = "none";

    document.body.appendChild(snowflake);

    const size = parseInt(snowflake.style.fontSize);
    snowflake.sink = (SNOW_SPEED * size) / 5;

    // Initial horizontal position
    switch (SNOW_AREA) {
      case 2: // Left
        snowflake.posx = getRandom(pageWidth / 2 - size);
        break;
      case 3: // Center
        snowflake.posx = getRandom(pageWidth / 2 - size) + pageWidth / 4;
        break;
      case 4: // Right
        snowflake.posx = getRandom(pageWidth / 2 - size) + pageWidth / 2;
        break;
      default: // Full
        snowflake.posx = getRandom(pageWidth - size);
    }

    snowflake.posy = getRandom(pageHeight - 2 * size);
    snowflake.style.left = `${snowflake.posx}px`;
    snowflake.style.top = `${snowflake.posy}px`;

    snowflakes[i] = snowflake;
  }

  moveSnow();
};

function moveSnow() {
  for (let i = 0; i <= SNOWFLAKE_COUNT; i++) {
    const flake = snowflakes[i];
    const size = parseInt(flake.style.fontSize);

    coords[i] += xMovements[i];
    flake.posy += flake.sink;

    flake.style.left = `${flake.posx + leftRight[i] * Math.sin(coords[i])}px`;
    flake.style.top = `${flake.posy}px`;

    if (flake.posy >= pageHeight - 2 * size || parseInt(flake.style.left) > pageWidth - 3 * leftRight[i]) {
      switch (SNOW_AREA) {
        case 2:
          flake.posx = getRandom(pageWidth / 2 - size);
          break;
        case 3:
          flake.posx = getRandom(pageWidth / 2 - size) + pageWidth / 4;
          break;
        case 4:
          flake.posx = getRandom(pageWidth / 2 - size) + pageWidth / 2;
          break;
        default:
          flake.posx = getRandom(pageWidth - size);
      }
      flake.posy = 0;
    }
  }

  setTimeout(moveSnow, 50);
}
