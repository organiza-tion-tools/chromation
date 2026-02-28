import { createApp, ref } from "vue";
import { createDotRenderer } from "@chroma-tion/renderer-dot";
import { usePasswordColor, usePasswordRenderer } from "@chroma-tion/vue";

createApp({
  setup() {
    const password = ref("");
    const inputRef = ref(null);

    const { color, hash } = usePasswordColor(password);
    usePasswordRenderer(inputRef, {
      renderer: createDotRenderer({ sizePx: 14 })
    });

    return {
      password,
      inputRef,
      color,
      hash
    };
  },
  template: `
    <section class="card">
      <h1>Vue 3 Composition API Demo</h1>
      <p>
        This demo uses <code>@chroma-tion/vue</code> composables.
        Dot renderer is attached through the Vue adapter lifecycle.
      </p>

      <div class="field">
        <label for="password-vue">Password</label>
        <input
          id="password-vue"
          ref="inputRef"
          v-model="password"
          type="password"
          autocomplete="current-password"
        />
      </div>

      <p>Current deterministic color:</p>
      <div class="swatch" :style="{ backgroundColor: color }"></div>
      <p class="meta">hash: {{ hash }}</p>
    </section>
  `
}).mount("#app");
