export function GET() {
  return new Response(
    `
  <OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">
    <ShortName>openpm</ShortName>
    <Description>Search openpm</Description>
    <InputEncoding>UTF-8</InputEncoding>
    <OutputEncoding>UTF-8</OutputEncoding>
    <Url type="application/x-suggestions+json" method="GET" template="https://openpm.ai/opensearch/suggest">
      <Param name="q" value="{searchTerms}"/>
    </Url>
    <Url type="text/html" method="GET" template="https://openpm.ai/packages">
      <Param name="q" value="{searchTerms}"/>
    </Url>
  </OpenSearchDescription>  
`,
    {
      headers: {
        'Content-Type': 'application/opensearchdescription+xml',
      },
    },
  )
}
