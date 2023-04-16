import {OpenApiDocument} from './document'
import petstore from './fixtures/petstore.json'

import {parseSpec} from '.'

describe('OpenApiDocument', () => {
  let document: OpenApiDocument

  beforeEach(async () => {
    document = await parseSpec(petstore)
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
    expect(document.baseUrl).toMatchInlineSnapshot('"http://petstore.swagger.io/v1"')
  })

  test('description', () => {
    expect(document.description).toMatchInlineSnapshot('""')
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
    expect(document.groupedEndpoints).toMatchInlineSnapshot(`
      Map {
        "pets" => [
          OpenApiEndpoint {
            "method": "GET",
            "operationObject": {
              "operationId": "listPets",
              "parameters": [
                {
                  "description": "How many items to return at one time (max 100)",
                  "in": "query",
                  "name": "limit",
                  "required": false,
                  "schema": {
                    "format": "int32",
                    "maximum": 100,
                    "type": "integer",
                  },
                },
              ],
              "responses": {
                "200": {
                  "content": {
                    "application/json": {
                      "schema": {
                        "items": {
                          "properties": {
                            "id": {
                              "format": "int64",
                              "type": "integer",
                            },
                            "name": {
                              "type": "string",
                            },
                            "tag": {
                              "type": "string",
                            },
                          },
                          "required": [
                            "id",
                            "name",
                          ],
                          "type": "object",
                        },
                        "maxItems": 100,
                        "type": "array",
                      },
                    },
                  },
                  "description": "A paged array of pets",
                  "headers": {
                    "x-next": {
                      "description": "A link to the next page of responses",
                      "schema": {
                        "type": "string",
                      },
                    },
                  },
                },
                "default": {
                  "content": {
                    "application/json": {
                      "schema": {
                        "properties": {
                          "code": {
                            "format": "int32",
                            "type": "integer",
                          },
                          "message": {
                            "type": "string",
                          },
                        },
                        "required": [
                          "code",
                          "message",
                        ],
                        "type": "object",
                      },
                    },
                  },
                  "description": "unexpected error",
                },
              },
              "summary": "List all pets",
              "tags": [
                "pets",
              ],
            },
            "origin": "http://petstore.swagger.io/v1",
            "path": "/pets",
          },
          OpenApiEndpoint {
            "method": "POST",
            "operationObject": {
              "operationId": "createPets",
              "responses": {
                "201": {
                  "description": "Null response",
                },
                "default": {
                  "content": {
                    "application/json": {
                      "schema": {
                        "properties": {
                          "code": {
                            "format": "int32",
                            "type": "integer",
                          },
                          "message": {
                            "type": "string",
                          },
                        },
                        "required": [
                          "code",
                          "message",
                        ],
                        "type": "object",
                      },
                    },
                  },
                  "description": "unexpected error",
                },
              },
              "summary": "Create a pet",
              "tags": [
                "pets",
              ],
            },
            "origin": "http://petstore.swagger.io/v1",
            "path": "/pets",
          },
          OpenApiEndpoint {
            "method": "GET",
            "operationObject": {
              "operationId": "showPetById",
              "parameters": [
                {
                  "description": "The id of the pet to retrieve",
                  "in": "path",
                  "name": "petId",
                  "required": true,
                  "schema": {
                    "type": "string",
                  },
                },
              ],
              "responses": {
                "200": {
                  "content": {
                    "application/json": {
                      "schema": {
                        "properties": {
                          "id": {
                            "format": "int64",
                            "type": "integer",
                          },
                          "name": {
                            "type": "string",
                          },
                          "tag": {
                            "type": "string",
                          },
                        },
                        "required": [
                          "id",
                          "name",
                        ],
                        "type": "object",
                      },
                    },
                  },
                  "description": "Expected response to a valid request",
                },
                "default": {
                  "content": {
                    "application/json": {
                      "schema": {
                        "properties": {
                          "code": {
                            "format": "int32",
                            "type": "integer",
                          },
                          "message": {
                            "type": "string",
                          },
                        },
                        "required": [
                          "code",
                          "message",
                        ],
                        "type": "object",
                      },
                    },
                  },
                  "description": "unexpected error",
                },
              },
              "summary": "Info for a specific pet",
              "tags": [
                "pets",
              ],
            },
            "origin": "http://petstore.swagger.io/v1",
            "path": "/pets/{petId}",
          },
        ],
      }
    `)
  })
})
