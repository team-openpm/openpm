import DOMPurify from 'isomorphic-dompurify'
import {marked} from 'marked'

export function Markdown({text}: {text: string}) {
  return (
    <div
      className="contents"
      dangerouslySetInnerHTML={{__html: generateMarkdown(text)}}
    />
  )
}

const generateMarkdown = (text: string) => {
  const html = marked.parse(text)
  return DOMPurify.sanitize(html)
}
