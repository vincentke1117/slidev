---
relates:
  - guide/faq#adjust-size
  - features/zoom-slide
  - features/transform-component
tags: [layout]
description: |
  Set the size for all your slides.
---

# Slide Canvas Size

Slidev allows you to set the size of the slide canvas via the `canvasWidth` and `aspectRatio` options in the headmatter. The aspect ratio accepts common presets like `16:9`, `4:3`, and `1:1`, or any custom ratio expressed as either a fraction (`3/2`) or decimal value. When a ratio is provided the slide height is inferred automatically from the width.

```md
---
# aspect ratio for the slides
aspectRatio: 4:3
# real width of the canvas, unit in px
canvasWidth: 1024
---

# Your slides here
```

When you need full control over the canvas dimensions you can additionally provide the `canvasHeight` value in pixels. Doing so instructs Slidev to ignore the `aspectRatio` setting and instead derive the ratio from the supplied width and height, making it easy to create perfectly square `1:1` layouts or any other bespoke size:

```md
---
canvasWidth: 1080
canvasHeight: 1080
---

# Square slide deck
```

To scale several slides in your presentation, you can use the `zoom` option:

<LinkCard link="features/zoom-slide" />

To adjust the size of some elements on your slides, you can use the `Transform` component:

<LinkCard link="features/transform-component" />
