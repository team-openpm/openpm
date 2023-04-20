import {initializeAgentExecutorWithOptions} from 'langchain/agents'
import {OpenAI} from 'langchain/llms/openai'
import {SerpAPI, Tool} from 'langchain/tools'
import {Calculator} from 'langchain/tools/calculator'
import {ChatOpenAI} from 'langchain/chat_models/openai'
import {initializeAgentExecutorWithOptions} from 'langchain/agents'
import {RequestsGetTool, RequestsPostTool, AIPluginTool} from 'langchain/tools'

async function main() {
  const tools = [
    new RequestsGetTool(),
    new RequestsPostTool(),
    await AIPluginTool.fromPluginUrl('https://www.klarna.com/.well-known/ai-plugin.json'),
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

export interface AIPluginToolParams {
  name: string
  description: string
  apiSpec: string
}

export class OpenpmTool extends Tool implements AIPluginToolParams {
  private _name: string

  private _description: string

  apiSpec: string

  get name() {
    return this._name
  }

  get description() {
    return this._description
  }

  constructor(params: AIPluginToolParams) {
    super()
    this._name = params.name
    this._description = params.description
    this.apiSpec = params.apiSpec
  }

  /** @ignore */
  async _call(_input: string) {
    return this.apiSpec
  }

  static async fromPackageIds(packageIds: string[]) {
    const aiPluginRes = await fetch(
      'https://openpm.ai/api/packages/lookup?ids=' + packageIds.join(','),
    )

    if (!aiPluginRes.ok) {
      throw new Error(
        `Failed to fetch plugin from ${url} with status ${aiPluginRes.status}`,
      )
    }
    const aiPluginJson = await aiPluginRes.json()

    const apiUrlRes = await fetch(aiPluginJson.api.url)
    if (!apiUrlRes.ok) {
      throw new Error(
        `Failed to fetch API spec from ${aiPluginJson.api.url} with status ${apiUrlRes.status}`,
      )
    }
    const apiUrlJson = await apiUrlRes.text()

    return new AIPluginTool({
      name: aiPluginJson.name_for_model,
      description: `Call this tool to get the OpenAPI spec (and usage guide) for interacting with the ${aiPluginJson.name_for_human} API. You should only call this ONCE! What is the ${aiPluginJson.name_for_human} API useful for? ${aiPluginJson.description_for_human}`,
      apiSpec: `Usage Guide: ${aiPluginJson.description_for_model}

OpenAPI Spec: ${apiUrlJson}`,
    })
  }
}
