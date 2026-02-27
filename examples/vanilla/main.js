import { attachPasswordInput } from "@chroma-tion/vanilla";
import { createDotRenderer } from "@chroma-tion/renderer-dot";
import { createBottomBorderRenderer } from "@chroma-tion/renderer-bottom-border";

const dotInput = document.querySelector("#password-dot");
const borderInput = document.querySelector("#password-border");

if (!(dotInput instanceof HTMLInputElement) || !(borderInput instanceof HTMLInputElement)) {
  throw new Error("Expected #password-dot and #password-border inputs");
}

const dotController = attachPasswordInput(dotInput, {
  renderer: createDotRenderer({ sizePx: 14 })
});

const borderController = attachPasswordInput(borderInput, {
  renderer: createBottomBorderRenderer({ widthPx: 3 })
});

window.chromationControllers = {
  dotController,
  borderController
};
