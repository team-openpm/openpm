import {Tool} from 'langchain/tools'
import {AIPluginTool} from 'langchain/tools'

export interface AIPluginToolParams {
  name: string
  description: string
  apiSpec: string
}

interface OpenpmPackageResponse {
  id: string
  domain: string
  openapi: string
  name: string
  machine_name: string
  version: string
  user_id: string
  logo_url: string
  contact_email: string
  description: string
  machine_description: string
  legal_info_url: string
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

  static async fromPackageId(packageId: string) {
    const url = `https://openpm.ai/api/packages/${packageId}`
    const request = await fetch(url)

    if (!request.ok) {
      throw new Error(`Failed to fetch plugin from ${url} with status ${request.status}`)
    }

    const pkg = (await request.json()) as OpenpmPackageResponse

    return new AIPluginTool({
      name: pkg.machine_name,
      description: `Call this tool to get the OpenAPI spec (and usage guide) for interacting with the ${pkg.name} API. You should only call this ONCE! What is the ${pkg.name} API useful for? ${pkg.description}`,
      apiSpec: `Usage Guide: ${pkg.machine_description}

OpenAPI Spec: ${pkg.openapi}`,
    })
  }
}
