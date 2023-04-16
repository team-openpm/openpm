import Link from 'next/link'

import {MainTemplate} from '@/components/main-template'

export default async function AboutPage() {
  return (
    <MainTemplate>
      <article className="prose prose-headings:text-xl prose-headings:font-medium">
        <h1>About</h1>

        <div className="prose max-w-prose">
          <p>
            AI is the next platform. It will fundamentally change how we live and work.
          </p>

          <p>
            A new platform needs a new app-store. We engineers currently have a slim
            chance of creating our own app-store before some large corporation does it.
          </p>

          <p>We must seize this chance.</p>

          <p>
            It is vitally important that we don&apos;t repeat the travesty that is
            Apple&apos;s App store. Fundamental layers of the internet are too important
            to be controlled by any single monopolistic tax-collecting company.
          </p>

          <p>
            APIs serve as the apps on the AI platform. We need a headless app-store so
            that AIs can discover and use APIs. A store that is built upon the open web
            and the OpenAPI specification.
          </p>

          <p>
            <Link prefetch={false} href="/" className="text-pink-500">
              openpm.ai
            </Link>{' '}
            is that store. We are an open source package-manager for OpenAPI files.
            Everything we release is under the MIT license. We will never charge a
            transaction fee for our services. We will never wield editorial control. We
            will only take down packages that are scams or illegal under US law. At any
            point you can choose to{' '}
            <Link prefetch={false} href="/export">
              export all of our packages
            </Link>{' '}
            and run them on your own server.
          </p>
        </div>
      </article>
    </MainTemplate>
  )
}
