export const InitStars = () => {
  function randomPosition(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const totalStars = 30;
  const starGroups = 6;
  const starsPerGroup = totalStars / starGroups;

  const svgMarkup = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 14" fill="none">
  <path d="M7.5 0L9.18386 5.18237H14.6329L10.2245 8.38525L11.9084 13.5676L7.5 10.3647L3.09161 13.5676L4.77547 8.38525L0.367076 5.18237H5.81614L7.5 0Z" fill="#FCF9BF"/>
</svg>`;

  for (let i = 0; i < totalStars; i++) {
    const top = randomPosition(1, 100);
    const left = randomPosition(1, 100);
    const groupNumber = Math.floor(i / starsPerGroup) + 1;

    const wrapper = document.createElement("div");
    wrapper.innerHTML = svgMarkup;

    const svgElement = wrapper.firstElementChild;

    svgElement.style.position = "absolute";
    svgElement.style.top = `${top}%`;
    svgElement.style.left = `${left}%`;
    svgElement.style.height = "10px";
    svgElement.style.width = "10px";

    svgElement.classList.add(`star${groupNumber}`);

    document.body.appendChild(svgElement);
  }
};
