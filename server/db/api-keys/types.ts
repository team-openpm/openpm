export interface RedactedApiKey {
  id: string
  keyExcerpt: string
  createdAt: Date
  revokedAt: Date | null
}
