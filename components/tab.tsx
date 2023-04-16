'use client'

import dynamic from 'next/dynamic'

const TabGroup = dynamic(() => import('@headlessui/react').then((mod) => mod.Tab.Group), {
  ssr: false,
})
const TabList = dynamic(() => import('@headlessui/react').then((mod) => mod.Tab.List), {
  ssr: false,
})
const TabPanels = dynamic(
  () => import('@headlessui/react').then((mod) => mod.Tab.Panels),
  {ssr: false},
)
const TabPanel = dynamic(() => import('@headlessui/react').then((mod) => mod.Tab.Panel), {
  ssr: false,
})
const Tab = dynamic(() => import('@headlessui/react').then((mod) => mod.Tab), {
  ssr: false,
})

export {TabGroup, TabList, TabPanels, TabPanel, Tab}
