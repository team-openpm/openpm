'use client'

import ReactJson from 'react-json-view'

export default function JsonViewer({json}: {json: any}) {
  return (
    <ReactJson
      src={json}
      theme="monokai"
      iconStyle="triangle"
      indentWidth={4}
      collapseStringsAfterLength={100}
      enableClipboard={false}
      displayDataTypes={false}
      displayObjectSize={false}
      collapsed={2}
    />
  )
}
