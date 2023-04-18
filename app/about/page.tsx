import Link from 'next/link'

import {MainTemplate} from '@/components/main-template'

export default async function AboutPage() {
  return (
    <MainTemplate>
      <article className="prose prose-slate dark:prose-invert prose-headings:text-xl prose-headings:font-medium prose-a:no-underline dark:prose-p:text-white/70 dark:prose-a:text-blue-500">
        <h1>About</h1>

        <div className="prose max-w-prose">
          <p>
            AI is fundamentally changing the way we live, work, and build software. It has
            the potential to be the biggest platform shift since the iphone and mobile.
          </p>

          <p>
            With mobile we learned the painful lesson of the Apple app-store, controlled
            by a single monopolistic company, stifling innovation and entrepreneurship.
          </p>

          <p>
            AI, our new platform, needs it&apos;s own app-store. One not controlled by a
            single rent-seeking company, but an open and free app-store built upon the
            open web and the OpenAPI specification. This will let AIs discover and
            interact with the world via APIs.
          </p>

          <p>
            We engineers currently have a slim chance of creating this app-store layer
            before some large corporation does it.
          </p>

          <p>We must seize this chance.</p>

          <p>
            <Link prefetch={false} href="/" className="text-pink-500">
              openpm.ai
            </Link>{' '}
            is that store. We are building an open source package-manager for OpenAPI
            files. Everything we release is under the MIT license. We will never charge a
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
