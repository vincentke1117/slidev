---
description: |
  Render interactive HTML, CSS, and JavaScript snippets directly inside your slides.
tags: [developer, interactivity]
relates:
  - guide/syntax#code-blocks
  - features/monaco
---

# LiveCode

The LiveCode block lets you prototype interactive widgets inside your presentation. Provide any combination of HTML, CSS, and JavaScript within a fenced code block marked as `livecode` and Slidev will bundle it into an isolated iframe at runtime.

````md
```livecode { height: 420 }
<div class="counter">
  <button id="increment">Increment</button>
  <p id="value">0</p>
</div>

<style>
.counter {
  display: grid;
  gap: 1rem;
  justify-items: start;
}
</style>

<script>
const button = document.getElementById('increment')
const value = document.getElementById('value')
let count = 0
button.addEventListener('click', () => {
  value.textContent = String(++count)
})
</script>
```
````

## Options

- `height` / `width` — control the iframe dimensions in pixels (numbers) or CSS units (strings). The default width stretches to the container width and the height defaults to `400px`.
- `autoResize` — when set to `true`, Slidev will attempt to resize the iframe to match the rendered content height once it loads.

Scripts run inside an iframe sandbox with `allow-scripts` and `allow-same-origin` permissions so they can execute inline modules and interact with the DOM you define, while keeping the rest of your deck safe.

<SeeAlso :links="[
  'builtin/components#livecode',
]" />
