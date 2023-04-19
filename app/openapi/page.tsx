import Link from 'next/link'

import {MainTemplate} from '@/components/main-template'

export default async function OpenapiPage() {
  return (
    <MainTemplate>
      <article className="prose prose-slate max-w-prose dark:prose-invert prose-headings:text-xl prose-headings:font-medium prose-a:no-underline dark:prose-p:text-white/70 dark:prose-a:text-blue-500">
        <p>
          <a href="https://www.openapis.org/">OpenAPI</a> is a widely-adopted standard for
          describing APIs, making it accessible for both machines and humans. It
          simplifies API documentation, client libraries generation, validation, and
          testing.
        </p>

        <h2>Benefits</h2>
        <p>By creating an OpenAPI specification, you can enjoy the following benefits:</p>
        <ul>
          <li>
            <strong>API documentation:</strong> Automatically generate up-to-date and
            interactive API documentation.
          </li>
          <li>
            <strong>Client libraries:</strong> Generate client libraries in multiple
            programming languages to easily interact with your API.
          </li>
          <li>
            <strong>Validation and testing:</strong> Validate API requests and responses,
            ensuring consistency and reducing errors.
          </li>
        </ul>

        <h2>How do we fit in?</h2>

        <p>
          <Link className="text-pink-500 " href="/">
            openpm.ai
          </Link>{' '}
          is a package manager used for publishing and discovering OpenAPI specs.
        </p>

        <h2>Learning by Example</h2>

        <p>
          To learn how to create OpenAPI specifications, it&apos;s best to explore
          existing examples. Here are some good ones:
        </p>

        <ul>
          <li>
            <a href="/apis/openai/openapi">OpenAI</a>
          </li>
          <li>
            <a href="/apis/neon/openapi">Neon</a>
          </li>
          <li>
            <a href="/apis/clearbit/openapi">Clearbit</a>
          </li>
          <li>
            <a href="/apis/petstore/openapi">Petstore (sample)</a>
          </li>
        </ul>

        <h2>Generating OpenAPI with ChatGPT</h2>

        <p>
          You can use <a href="https://chap.openai.com">ChatGPT</a> to generate OpenAPI
          specifications by providing a prompt. Here&apos;s a recommended prompt:
        </p>

        <pre>
          <code>
            {`Generate a JSON OpenAPI 3.0 specification for an API with the following endpoints:
            
1. GET /users - Retrieves a list of users with optional pagination (query parameters: page, limit)
2. POST /users - Creates a new user (request body: name, email, password)
3. GET /users/{userId} - Retrieves a specific user by ID (path parameter: userId)
4. PUT /users/{userId} - Updates a user's information (path parameter: userId, request body: name, email)
5. DELETE /users/{userId} - Deletes a user by ID (path parameter: userId)

The API uses JSON for request and response bodies. The API is authenticated using Bearer tokens.`}
          </code>
        </pre>

        <h2>Further reading</h2>

        <p>We recommend these resources:</p>

        <ul>
          <li>
            <a href="https://blog.readme.com/how-to-use-openapi-and-swagger-spec-for-documentation/">
              ReadMe: How to Use OpenAPI and Swagger for Documentation
            </a>
          </li>
          <li>
            <a href="https://openapi.tools/">openapi.tools</a>
          </li>
        </ul>
      </article>
    </MainTemplate>
  )
}
