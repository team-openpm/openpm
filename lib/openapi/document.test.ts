import {OpenApiDocument} from './document'
import petstore from './fixtures/petstore.json'

import {parseOpenApiObject} from '.'

describe('OpenApiDocument', () => {
  let document: OpenApiDocument

  beforeEach(async () => {
    document = await parseOpenApiObject(petstore)
  })

  test('toJSON', () => {
    expect(document.toJSON())
  })

  test('name', () => {
    expect(document.name).toMatchInlineSnapshot('"Swagger Petstore"')
  })

  test('domain', () => {
    expect(document.domain).toMatchInlineSnapshot('"petstore.swagger.io"')
  })

  test('baseUrl', () => {
    expect(document.origin).toMatchInlineSnapshot('"http://petstore.swagger.io/v1"')
  })

  test('allServerUrls', () => {
    expect(document.allServerUrls).toMatchInlineSnapshot(`
      [
        "http://petstore.swagger.io/v1",
      ]
    `)
  })

  test('description', () => {
    expect(document.description).toMatchInlineSnapshot('null')
  })

  test('version', () => {
    expect(document.version).toMatchInlineSnapshot('"1.0.0"')
  })

  test('paths', async () => {
    expect(document.paths).toMatchInlineSnapshot(`
      [
        "/pets",
        "/pets",
        "/pets/{petId}",
      ]
    `)
  })

  test('commonPathPrefix', async () => {
    expect(document.commonPathPrefix).toMatchInlineSnapshot('""')
  })

  test('endpoints', async () => {
    const map = document.groupedEndpoints.keys()

    expect(Array.from(map)).toMatchInlineSnapshot(`
      [
        "pets",
      ]
    `)
  })
})
