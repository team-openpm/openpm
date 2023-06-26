import {Inter} from 'next/font/google'
import './globals.css'
import Head from 'next/head'

export const metadata = {
  title: 'openpm',
  description: 'AI plugin package manager',
}

const inter = Inter({subsets: ['latin']})

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="search"
          title="openpm"
          href="/api/opensearch.xml"
          type="application/opensearchdescription+xml"
        />
      </Head>

      <body
        className={`${inter.className} bg-white text-slate-900 antialiased dark:bg-slate-900 dark:text-white/90`}
      >
        {children}
      </body>
    </html>
  )
}
