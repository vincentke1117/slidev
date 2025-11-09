import type { MarkdownTransformContext } from '@slidev/types'
import lz from 'lz-string'

interface LiveCodeSections {
  html: string
  css: string
  js: string
}

function extractSections(code: string): LiveCodeSections {
  let html = code
  const cssBlocks: string[] = []
  const jsBlocks: string[] = []

  html = html.replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, (_, block: string) => {
    cssBlocks.push(block.trim())
    return ''
  })

  html = html.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, (_, block: string) => {
    jsBlocks.push(block.trim())
    return ''
  })

  return {
    html: html.trim(),
    css: cssBlocks.join('\n\n'),
    js: jsBlocks.join('\n\n'),
  }
}

export function transformLiveCode(ctx: MarkdownTransformContext) {
  ctx.s.replace(
    /^```livecode *(\{[^\n]*\})?\n([\s\S]+?)\n```/gm,
    (full, options = '', content = '') => {
      const { html, css, js } = extractSections(content)
      const optionString = (options || '').trim() || '{}'
      const attrs = [`html-lz="${lz.compressToBase64(html)}"`]

      if (css)
        attrs.push(`css-lz="${lz.compressToBase64(css)}"`)
      if (js)
        attrs.push(`js-lz="${lz.compressToBase64(js)}"`)

      return `<LiveCode ${attrs.join(' ')} v-bind="${optionString}" />`
    },
  )
}
