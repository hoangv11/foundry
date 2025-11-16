import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle } from 'lucide-react'
import { getIntegrationIcon, getIntegrationName } from '@/lib/integrations'
import type { Integration } from '@/types/integration'

interface ConnectedIntegrationCardProps {
  integration: Integration
  onDisconnect: (id: string) => void
}

export function ConnectedIntegrationCard({
  integration,
  onDisconnect,
}: ConnectedIntegrationCardProps) {
  return (
    <Card className="border-gray-200 hover:border-gray-300 transition-colors rounded-md shadow-none group">
      <CardContent>
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-1.5 bg-gray-50 rounded-md group-hover:bg-gray-100 transition-colors">
            {getIntegrationIcon(integration.integration_type)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-1.5">
              <h3 className="font-medium text-gray-900 text-sm truncate">
                {getIntegrationName(integration.integration_type)}
              </h3>
              <Badge
                variant="secondary"
                className="bg-gray-100 text-gray-700 text-xs px-1.5 py-0.5"
              >
                <CheckCircle className="w-2.5 h-2.5 mr-0.5" />
                Active
              </Badge>
            </div>
            <p className="text-xs text-gray-600 truncate">
              {integration.external_id}
            </p>
          </div>
        </div>

        {integration.scopes && integration.scopes.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {integration.scopes.slice(0, 1).map((scope) => (
              <Badge
                key={scope}
                variant="outline"
                className="text-xs px-1.5 py-0.5"
              >
                {scope.replace('_', ' ')}
              </Badge>
            ))}
            {integration.scopes.length > 1 && (
              <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                +{integration.scopes.length - 1}
              </Badge>
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">
            {new Date(integration.created_at).toLocaleDateString()}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDisconnect(integration.id)}
            className="text-red-600 border-red-200 hover:bg-red-50 text-xs h-6 px-2"
          >
            Disconnect
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
