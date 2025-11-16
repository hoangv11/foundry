'use client'

import { AlertCircle } from 'lucide-react'
import { useIntegrations } from '@/hooks/useIntegrations'
import { useShopifyOAuth } from '@/hooks/useShopifyOAuth'
import { IntegrationCard } from '@/components/integrations/IntegrationCard'
import { ConnectedIntegrationCard } from '@/components/integrations/ConnectedIntegrationCard'

export default function IntegrationsPage() {
  const { integrations, loading, saveIntegration, handleDisconnect } =
    useIntegrations()
  const { connecting, handleShopifyConnect } = useShopifyOAuth({
    onSaveIntegration: saveIntegration,
  })

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
          <p className="text-gray-600">
            Connect your favorite apps and services
          </p>
        </div>
        <div className="text-center text-gray-600">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-gray-600"></div>
          <span className="ml-2">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
        <p className="text-gray-600">
          Connect your favorite apps and services
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Available Integrations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <IntegrationCard
            name="Shopify"
            description="Manage products and orders"
            icon="/shopify.svg"
            onConnect={handleShopifyConnect}
            connecting={connecting}
          />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Connected Integrations
        </h2>
        {integrations.length === 0 ? (
          <div className="text-center py-6 text-gray-600">
            <AlertCircle className="w-8 h-8 mx-auto mb-3 text-gray-400" />
            <p className="text-sm">No integrations connected yet</p>
            <p className="text-xs text-gray-500">
              Connect an app above to get started
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {integrations.map((integration) => (
              <ConnectedIntegrationCard
                key={integration.id}
                integration={integration}
                onDisconnect={handleDisconnect}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
