export interface Integration {
  id: string
  integration_type: string
  external_id: string
  scopes: string[]
  metadata: Record<string, unknown>
  created_at: string
  updated_at: string
}

export interface ShopifyTokenData {
  access_token: string
  scopes: string[]
  shop: string
  metadata: Record<string, unknown>
}
