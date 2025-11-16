import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'

interface IntegrationCardProps {
  name: string
  description: string
  icon: string
  onConnect: () => void
  connecting?: boolean
}

export function IntegrationCard({
  name,
  description,
  icon,
  onConnect,
  connecting = false,
}: IntegrationCardProps) {
  return (
    <Card className="border-gray-200 hover:border-gray-300 transition-colors rounded-md shadow-none group">
      <CardContent>
        <div className="flex items-center space-x-3 mb-3">
          <div className="p-1.5 bg-gray-50 rounded-md group-hover:bg-gray-100 transition-colors">
            <Image src={icon} alt={name} width={20} height={20} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 text-sm">{name}</h3>
          </div>
        </div>
        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{description}</p>
        <Button
          onClick={onConnect}
          disabled={connecting}
          className="w-full bg-gray-900 hover:bg-gray-800 text-xs h-7"
          size="sm"
        >
          {connecting ? 'Connecting...' : 'Connect'}
          <ExternalLink className="w-3 h-3 ml-1.5" />
        </Button>
      </CardContent>
    </Card>
  )
}
