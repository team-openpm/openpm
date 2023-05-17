import {readdir} from 'fs/promises'
import {join as pathJoin} from 'path'

import {Highlighter, getHighlighter, renderToHtml} from 'shiki'

import {assertString} from './assert'

import type {Theme} from 'shiki'

let highlighter: Highlighter

export async function highlight(
  code: string,
  lang: 'shellscript' | 'javascript' | 'python' | 'json',
  theme: Theme = 'css-variables',
): Promise<string> {
  assertString(code, 'code must be a string')

  if (!highlighter) {
    // Touch the file system to ensure vercel bundles it
    const path = pathJoin(process.cwd(), 'lib', 'shiki')
    readdir(path)

    highlighter = await getHighlighter({
      langs: ['shellscript', 'javascript', 'python', 'json'],
      theme: theme,
      paths: {
        languages: `${path}/languages/`,
        themes: `${path}/themes/`,
      },
    })
  }

  const tokens = highlighter.codeToThemedTokens(code, lang, theme, {
    includeExplanation: false,
  })

  const html = renderToHtml(tokens, {bg: 'transparent'})

  return html
}

export async function safeHighlight(
  code: string,
  lang: 'shellscript' | 'javascript' | 'python' | 'json',
  theme: Theme = 'css-variables',
): Promise<string> {
  try {
    return await highlight(code, lang, theme)
  } catch (error) {
    console.error('Error highlighting lang=', lang, code)
    console.error(error)
    return `<pre>${code}</pre>`
  }
}
