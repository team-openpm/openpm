import {MainTemplate} from '@/components/main-template'

export default async function OpenapiPage() {
  return (
    <MainTemplate>
      <article className="prose prose-slate max-w-prose dark:prose-invert prose-headings:text-xl prose-headings:font-medium prose-a:no-underline dark:prose-p:text-white/70 dark:prose-a:text-blue-500">
        <h1>OpenAPI</h1>

        <p>OpenAPI is a format for describing APIs. </p>
      </article>
    </MainTemplate>
  )
}
