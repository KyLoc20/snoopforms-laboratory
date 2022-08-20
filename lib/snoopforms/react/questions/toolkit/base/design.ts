const FORM_GRAY_1 = "#405164"; //for text, contained Button
const FORM_GRAY_2 = "#323d48"; //for contained hovering Button
const FORM_GRAY_LIGHT = "#d2dae2"; //for border
const FORM_BLACK_DARK = "#405164";
const FORM_RED = "#f53b57";

export { withAlpha, FORM_GRAY_1, FORM_GRAY_2, FORM_BLACK_DARK, FORM_GRAY_LIGHT, FORM_RED };
const withAlpha = (hex: string, alpha: number) => {
  let c = hex.substring(1).split("");
  if (c.length == 3) {
    c = [c[0], c[0], c[1], c[1], c[2], c[2]];
  }
  let n = parseInt(c.join(""), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
};
