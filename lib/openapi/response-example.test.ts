import petstore from './fixtures/petstore.json'
import reflect from './fixtures/reflect.json'
import {OpenApiResponseExample} from './response-example'

import {parseSpec} from '.'

describe('response-example', () => {
  it('should return a json example for petstore', async () => {
    const document = await parseSpec(petstore)

    const responseExample = new OpenApiResponseExample({
      schema: document.endpoints[0].successResponseSchema!,
    })

    expect(responseExample.exampleJson).toMatchInlineSnapshot(`
      "[
        {
          \\"id\\": 0,
          \\"name\\": \\"string\\",
          \\"tag\\": \\"string\\"
        }
      ]"
    `)
  })

  it('should return a json example for reflect schema', async () => {
    const document = await parseSpec(reflect)
    const firstEndpoint = document.endpoints[0]

    expect(firstEndpoint.path).toMatchInlineSnapshot('"/graphs/{graphId}/books"')

    const responseExample = new OpenApiResponseExample({
      schema: firstEndpoint.successResponseSchema!,
    })

    expect(responseExample.exampleJson).toMatchInlineSnapshot(`
      "[
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
      ]"
    `)
  })
})
