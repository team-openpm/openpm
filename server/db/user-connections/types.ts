export interface UserConnection {
  id: string
  package_id: string
  user_id: string
  api_key: string | null
  access_token: string | null
  refresh_token: string | null
  expires_at: Date | null
  updated_at: Date
  created_at: Date
}
