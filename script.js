const [...sectionsElements] = document.querySelectorAll('.zoom-section');

const sections = sectionsElements.map(element => ({ element }));
const viewportHeight = window.innerHeight;
const viewportWidth = window.innerWidth;
const scrollheight = window.scrollHeight;
const zoomMultiplier = 1; //don't know what this effect is

sections.forEach((section, index) => {
  const baseZoomPx = index * viewportHeight;
  section.baseZoomPx = baseZoomPx + 500; // this makes an effect on what point the sharpest part is
});

function onScroll() {
  const scrollY = window.pageYOffset;

  sections.forEach(({ element, baseZoomPx}, index) => {
    window.requestAnimationFrame(() => {
      const zoomFactor =  -1 * (scrollY - baseZoomPx) / viewportHeight; //-1 or 1 changes direction of scrolling
      //const zoomFactor =  1 * (scrollY - baseZoomPx) / viewportHeight;
      const scale = zoomFactor < 1 ? 1 - zoomFactor : 0;
      const blur = Math.abs(zoomFactor) * 4;
      const opacity = 1 - Math.abs(scrollY - baseZoomPx) / viewportHeight;
      const pointerEvents = scale > 1.5 || scale < .5 ? 'none' : 'auto';

      element.style.transform = `scale(${scale > 1 ? scale * 1 : scale })`;

      //element.style.filter = `blur(${blur}px)`;
      element.style.opacity = opacity;
      element.style.pointerEvents = pointerEvents;

      console.log({ opacity });
    })
  });

}

window.addEventListener('scroll', onScroll);
onScroll();
