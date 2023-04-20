// Manifest schema
// {
//   "schema_version": "v1",
//   "name_for_human": "TODO Plugin",
//   "name_for_model": "todo",
//   "description_for_human": "Plugin for managing a TODO list. You can add, remove and view your TODOs.",
//   "description_for_model": "Plugin for managing a TODO list. You can add, remove and view your TODOs.",
//   "auth": {
//     "type": "none"
//   },
//   "api": {
//     "type": "openapi",
//     "url": "http://localhost:3333/openapi.yaml",
//     "is_user_authenticated": false
//   },
//   "logo_url": "http://localhost:3333/logo.png",
//   "contact_email": "support@example.com",
//   "legal_info_url": "http://www.example.com/legal"
// }

export interface AiPlugin {
  schema_version: string
  name_for_human: string | null
  name_for_model: string | null
  description_for_human: string | null
  description_for_model: string | null
  auth: {
    type: string
  }
  api: {
    type: string
    url: string
    is_user_authenticated: boolean
  }
  logo_url: string | null
  contact_email: string | null
  legal_info_url: string | null
}
