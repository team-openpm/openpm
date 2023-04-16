import {MainTemplate} from '@/components/main-template'

export default async function AboutPage() {
  return (
    <MainTemplate>
      <article className="prose prose-headings:text-xl prose-headings:font-medium">
        <h1>Export</h1>

        <div className="prose max-w-prose">
          <p>
            At any point you can choose to export all of our packages. The export is MIT
            licensed. You are free to use it for your personal use, create a new
            package-manager, or whatever you want to do with it.
          </p>

          <p>
            Currently the export in JSON format. We&apos;re working on more export formats
            in the future.
          </p>

          <p>
            <a href="/api/export/packages" download="openpm-export.json">
              Download Export
            </a>
          </p>
        </div>
      </article>
    </MainTemplate>
  )
}
