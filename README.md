# openpm

[openpm](https://openpm.ai) is a package manager for OpenAPI files.

## Why do we exist?

AI is fundamentally changing the way we live, work, and build software. It has the potential to be the biggest platform shift since the iphone and mobile.

With mobile we learned the painful lesson of the Apple app-store, controlled by a single monopolistic company, stifling innovation and entrepreneurship.

AI, our new platform, needs it's own app-store. One not controlled by a single rent-seeking company, but an open and free app-store built upon the open web and the OpenAPI specification. This will let AIs discover and interact with the world via APIs.

We engineers currently have a slim chance of creating this app-store layer before some large corporation does it. We must seize this chance.

That's why we're building [openpm.ai](https://openpm.ai), an open source package-manager for OpenAPI files.

Everything we release is under the MIT license. We will never charge a transaction fee for our services. We will never wield editorial control. We will only remove packages that are scams or illegal under US law. At any point you can choose to export all of our packages and run them on your own server.

## Example usage with Langchain

First install our package:

```bash
npm install @openpm/langchain
```

Then use it in your code:

```typescript
import {initializeAgentExecutorWithOptions} from 'langchain/agents'
import {ChatOpenAI} from 'langchain/chat_models/openai'
import {RequestsGetTool, RequestsPostTool} from 'langchain/tools'

import {OpenpmTool} from '@openpm/langchain'

const tools = [
  new RequestsGetTool(),
  new RequestsPostTool(),
  await OpenpmTool.fromPackageId('klarna'),
]
const agent = await initializeAgentExecutorWithOptions(
  tools,
  new ChatOpenAI({temperature: 0, modelName: 'gpt-4'}),
  {agentType: 'chat-zero-shot-react-description', verbose: true},
)

const result = await agent.call({
  input: 'what t shirts are available in klarna?',
})

console.log({result})
```

## Retriving OpenAPI files

You can browse OpenAPI 'packages' on openpm.ai. You can also download the entire database of packages as a [single JSON file](https://openpm.ai/export).

Every package has a unique ID. You can use this ID to retrieve the OpenAPI file via the API:

```bash
curl https://openpm.ai/api/packages/neon/openapi?format=json
```

You can search for packages via the API:

```bash
curl 'https://openpm.ai/api/packages/search?query=neon'
```

You can lookup multiple packages at once:

```bash
curl 'https://openpm.ai/api/packages/lookup?ids=neon,openai'
```

Lastly, you can return the package's ai-plugin manifest:

```bash
curl 'https://openpm.ai/api/packages/neon/ai-plugin'
```

For more details, please see the [API documentation](https://openpm.ai/packages/openpm).

# Development

## Setup

You will need to create a .env.local file with the following environment variables:

- `NEXT_PUBLIC_HANKO_API_URL` (sign up for a free account at https://hanko.io)
- `DATABASE_URL` (postgres database url)

## Running locally:

```bash
yarn
yarn dev
```

## Running tests:

```bash
yarn test
```

## Deploying

You can deploy openpm to any provider that supports Next.js.
We recommend using [Vercel](https://vercel.com).
