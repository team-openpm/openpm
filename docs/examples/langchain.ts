import {initializeAgentExecutorWithOptions} from 'langchain/agents'
import {ChatOpenAI} from 'langchain/chat_models/openai'
import {RequestsGetTool, RequestsPostTool} from 'langchain/tools'

import {OpenpmTool} from './openpm-tool'

async function main() {
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
}

main()
