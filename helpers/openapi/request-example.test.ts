import clearbit from './fixtures/clearbit.json'
import petstore from './fixtures/petstore.json'
import reflect from './fixtures/reflect.json'
import {OpenApiRequestExample} from './request-example'
import {OpenAPI} from './types'

import {parseObjectSpec} from '.'

describe('request-example petstore', async () => {
  const document = await parseObjectSpec(petstore)

  const requestExample = new OpenApiRequestExample({
    securitySchemes: document.securitySchemes,
    security: [],
    servers: document.servers,
    path: '/api/v1/users',
    method: OpenAPI.HttpMethods.POST,
    operation: {
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                properties: {
                  name: {
                    type: 'string',
                    example: 'John Doe',
                  },
                  email: {
                    type: 'string',
                    example: 'john@example.com',
                  },
                },
              },
            },
          },
        },
      },
    },
  })

  it('should return a JavaScript example', () => {
    expect(requestExample.exampleJavaScript).toMatchInlineSnapshot(`
      "fetch(\\"http://petstore.swagger.io/v1/api/v1/users\\", {
        method: \\"POST\\",
        headers: {
          \\"Content-Type\\": \\"application/json\\",
        },
        body: JSON.stringify({
          0: { name: \\"John Doe\\", email: \\"john@example.com\\" },
        }),
      })
      "
    `)
  })

  it('should return a curl example', () => {
    expect(requestExample.exampleCurl).toMatchInlineSnapshot(`
      "curl -X POST 'http://petstore.swagger.io/v1/api/v1/users' \\\\
      	-H 'Content-Type: application/json' \\\\
      	-d '{\\"0\\":{\\"name\\":\\"John Doe\\",\\"email\\":\\"john@example.com\\"}}'"
    `)
  })

  it('should return a python example', () => {
    expect(requestExample.examplePython).toMatchInlineSnapshot(`
      "import requests

      requests.request('POST', 'http://petstore.swagger.io/v1/api/v1/users',
      	headers={
      	},
      	json={
      		\\"0\\": {
        \\"name\\": \\"John Doe\\",
        \\"email\\": \\"john@example.com\\"
      },
      	}
      )"
    `)
  })
})

describe('request-example reflect', async () => {
  const document = await parseObjectSpec(reflect)
  const endpoint = document.endpoints.find(
    (ep) => ep.path === '/graphs/{graphId}/books/sync',
  )!
  const requestExample = endpoint.requestExample

  it('should return a JavaScript example', () => {
    expect(requestExample.exampleJavaScript).toMatchInlineSnapshot(`
      "fetch(
        \\"https://reflect.app/api/graphs/{graphId}/books/sync\\",
        {
          method: \\"POST\\",
          headers: {
            Authorization: \\"Bearer YOUR_ACCESS_TOKEN\\",
            \\"Content-Type\\": \\"application/json\\",
          },
          body: JSON.stringify({
            books: [
              {
                id: \\"string\\",
                asin: \\"string\\",
                title: \\"string\\",
                authors: [\\"string\\"],
                notes: [
                  {
                    type: \\"string\\",
                    page: 0,
                    location: 0,
                    value: \\"string\\",
                  },
                ],
              },
            ],
          }),
        }
      )
      "
    `)
  })

  it('should return a curl example', () => {
    expect(requestExample.exampleCurl).toMatchInlineSnapshot(`
      "curl -X POST 'https://reflect.app/api/graphs/{graphId}/books/sync' \\\\
      	-H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \\\\
      	-H 'Content-Type: application/json' \\\\
      	-d '{\\"books\\":[{\\"id\\":\\"string\\",\\"asin\\":\\"string\\",\\"title\\":\\"string\\",\\"authors\\":[\\"string\\"],\\"notes\\":[{\\"type\\":\\"string\\",\\"page\\":0,\\"location\\":0,\\"value\\":\\"string\\"}]}]}'"
    `)
  })

  it('should return a python example', () => {
    expect(requestExample.examplePython).toMatchInlineSnapshot(`
      "import requests

      requests.request('POST', 'https://reflect.app/api/graphs/{graphId}/books/sync',
      	headers={
      		\\"Authorization\\": \\"Bearer YOUR_ACCESS_TOKEN\\",
      	},
      	json={
      		\\"books\\": [
        {
          \\"id\\": \\"string\\",
          \\"asin\\": \\"string\\",
          \\"title\\": \\"string\\",
          \\"authors\\": [
            \\"string\\"
          ],
          \\"notes\\": [
            {
              \\"type\\": \\"string\\",
              \\"page\\": 0,
              \\"location\\": 0,
              \\"value\\": \\"string\\"
            }
          ]
        }
      ],
      	}
      )"
    `)
  })
})

describe('request-example clearbit', async () => {
  const document = await parseObjectSpec(clearbit)
  const endpoint = document.endpoints[0]
  const requestExample = endpoint.requestExample

  it('should return a JavaScript example', () => {
    expect(requestExample.exampleJavaScript).toMatchInlineSnapshot(`
      "fetch(\\"https://person.clearbit.com/v2/combined/find\\", {
        headers: {
          Authorization: \\"Basic YOUR_API_KEY\\",
        },
      })
      "
    `)
  })
})
