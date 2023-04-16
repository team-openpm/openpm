'use client'

import clsx from 'clsx'
import {Fragment, useEffect, useState} from 'react'

import {Code} from '@/components/code'
import {TabGroup, TabList, TabPanel, TabPanels, Tab as BaseTab} from '@/components/tab'
import {useMessageListener} from '@/lib/use-message'

const namespace = 'example-language'

export function DocumentEndpointRequestExampleTabs({
  exampleCurlHtml,
  exampleJavaScriptHtml,
  examplePythonHtml,
}: {
  exampleCurlHtml: string
  exampleJavaScriptHtml: string
  examplePythonHtml: string
}) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onTabChange = (index: number) => {
    setSelectedIndex(index)
    window.localStorage.setItem(namespace, String(index))
    window.parent.postMessage({type: namespace, newValue: index}, window.location.origin)
  }

  useEffect(() => {
    const defaultSelectedIndex = window.localStorage.getItem(namespace)

    if (defaultSelectedIndex) {
      setSelectedIndex(Number(defaultSelectedIndex))
    }
  }, [])

  useMessageListener((event) => {
    if (event.data.type === namespace) {
      setSelectedIndex(event.data.newValue)
    }
  })

  return (
    <TabGroup selectedIndex={selectedIndex} onChange={onTabChange}>
      <div className="my-6 overflow-hidden rounded-2xl bg-slate-900 shadow-md dark:ring-1 dark:ring-white/10">
        <div className="flex flex-wrap items-start gap-x-4 border-b border-slate-700 bg-slate-800 px-4 dark:border-slate-800 dark:bg-transparent">
          <h3 className="mr-auto pt-3 text-xs font-semibold text-white">Request</h3>

          <TabList className="-mb-px flex gap-4 text-xs font-medium">
            <Tab>cURL</Tab>
            <Tab>JavaScript</Tab>
            <Tab>Python</Tab>
          </TabList>
        </div>

        <TabPanels className="border-t border-white border-opacity-15 bg-slate-900 bg-white/2.5 dark:border-b-white/5 dark:bg-white/1">
          <TabPanel>
            <Code html={exampleCurlHtml} />
          </TabPanel>
          <TabPanel>
            <Code html={exampleJavaScriptHtml} />
          </TabPanel>
          <TabPanel>
            <Code html={examplePythonHtml} />
          </TabPanel>
        </TabPanels>
      </div>
    </TabGroup>
  )
}

export function Tab({children}: {children: React.ReactNode}) {
  return (
    <BaseTab as={Fragment}>
      {({selected}) => (
        <button
          className={clsx(
            'increase-click-area border-b py-3 transition focus-visible:outline-none',
            {'border-emerald-500 text-emerald-400': selected},
            {'border-transparent text-slate-400 hover:text-slate-300': !selected},
          )}
        >
          {children}
        </button>
      )}
    </BaseTab>
  )
}
