import color from "color";

const primary = "#0052CC";
const primaryLight = color(primary)
  .lighten(0.2)
  .hex(); //"#1E748B";
const primaryDark = color(primary)
  .darken(0.2)
  .hex();
//"rgba(14, 20, 43, 1)";
const primaryOpaque = (opacity: number) => `rgba(18, 25, 50, ${opacity})`;

const primaryText = "white";

const highlight = "#61dafb";

const colors = {
  primary,
  highlight,
  primaryLight,
  primaryDark,
  primaryOpaque,
  primaryText
};

const typography = {
  primary: "Gotham Rounded",
  secondary: "Gotham Rounded",
  medium: "GothamRnd Medium",
  bold: "Gotham Bold"
};

export { colors, typography };
