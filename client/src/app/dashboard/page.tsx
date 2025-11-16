'use client'

import { useUser } from '@clerk/nextjs'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MessageSquare, Plug } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { user } = useUser()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.firstName || user?.primaryEmailAddress?.emailAddress?.split('@')[0]}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
        <Link href="/chat">
          <Card className="border-gray-200 hover:border-gray-300 transition-colors cursor-pointer h-full rounded-md shadow-none">
            <CardContent className="p-6">
              <MessageSquare className="w-8 h-8 text-gray-900 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Start Chat</h3>
              <p className="text-sm text-gray-600">Build your business with AI</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/integrations">
          <Card className="border-gray-200 hover:border-gray-300 transition-colors cursor-pointer h-full rounded-md shadow-none">
            <CardContent className="p-6">
              <Plug className="w-8 h-8 text-gray-900 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Integrations</h3>
              <p className="text-sm text-gray-600">Connect your apps</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
