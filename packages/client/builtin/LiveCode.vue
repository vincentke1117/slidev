<script setup lang="ts">
import lz from 'lz-string'
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  htmlLz: string
  cssLz?: string
  jsLz?: string
  width?: number | string
  height?: number | string
  autoResize?: boolean
}>()

const frame = ref<HTMLIFrameElement | null>(null)

const html = computed(() => lz.decompressFromBase64(props.htmlLz) || '')
const css = computed(() =>
  props.cssLz ? lz.decompressFromBase64(props.cssLz) || '' : '',
)
const js = computed(() =>
  props.jsLz ? lz.decompressFromBase64(props.jsLz) || '' : '',
)

const normalizedWidth = computed(() => {
  if (props.width == null)
    return '100%'
  return typeof props.width === 'number' ? `${props.width}px` : props.width
})

const normalizedHeight = computed(() => {
  if (props.height == null)
    return '400px'
  return typeof props.height === 'number' ? `${props.height}px` : props.height
})

const containerStyle = computed(() => ({
  width: normalizedWidth.value,
  height: normalizedHeight.value,
}))

const srcdoc = computed(() => {
  const styleBlock = css.value.trim().length
    ? `<style>${css.value}</style>`
    : ''
  const scriptBlock = js.value.trim().length
    ? `<script type="module">${js.value}<\/script>`
    : ''

  return `<!DOCTYPE html><html><head><meta charset=\"utf-8\"/>${styleBlock}</head><body>${html.value}${scriptBlock}</body></html>`
})

watch(
  () => srcdoc.value,
  () => {
    if (!props.autoResize || !frame.value)
      return

    const iframe = frame.value
    const updateSize = () => {
      try {
        const doc = iframe.contentDocument
        if (!doc)
          return
        const height = doc.documentElement.scrollHeight || doc.body.scrollHeight
        if (height)
          iframe.style.height = `${height}px`
      }
      catch {
        // noop - accessing cross origin content will throw
      }
    }

    iframe.addEventListener('load', updateSize, { once: true })
  },
)
</script>

<template>
  <div class="slidev-livecode" :style="containerStyle">
    <iframe
      ref="frame"
      class="slidev-livecode__frame"
      :srcdoc="srcdoc"
      sandbox="allow-scripts allow-same-origin"
      loading="lazy"
      frameborder="0"
      allowfullscreen
    />
  </div>
</template>

<style scoped>
.slidev-livecode {
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 0.75rem;
  overflow: hidden;
  background-color: var(--slidev-code-block-bg, #111827);
}

.slidev-livecode__frame {
  width: 100%;
  height: 100%;
  border: 0;
  background-color: inherit;
}
</style>
