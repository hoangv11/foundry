import { useState, useEffect, useCallback } from 'react'
import { useUser } from '@clerk/nextjs'
import { createClient } from '@/lib/supabase'
import type { Integration } from '@/types/integration'

export function useIntegrations() {
  const { user } = useUser()
  const [integrations, setIntegrations] = useState<Integration[]>([])
  const [loading, setLoading] = useState(true)

  const fetchIntegrations = useCallback(async () => {
    if (!user) {
      console.log('No user found, cannot fetch integrations')
      return
    }

    console.log('Fetching integrations for user:', user.id)

    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('integrations')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching integrations:', error)
        return
      }

      console.log('Fetched integrations:', data)
      setIntegrations(data || [])
    } catch (error) {
      console.error('Error fetching integrations:', error)
    } finally {
      setLoading(false)
    }
  }, [user])

  const saveIntegration = useCallback(
    async (tokenData: {
      access_token: string
      scopes: string[]
      shop: string
      metadata: Record<string, unknown>
    }) => {
      if (!user) {
        console.log('No user found, cannot save integration')
        return
      }

      console.log('Saving integration with data:', {
        user_id: user.id,
        integration_type: 'shopify',
        external_id: tokenData.shop,
        access_token: tokenData.access_token?.substring(0, 20) + '...',
        scopes: tokenData.scopes,
        metadata: tokenData.metadata,
      })

      try {
        const supabase = createClient()
        console.log('Supabase client created, attempting upsert...')

        const { data, error } = await supabase
          .from('integrations')
          .upsert(
            {
              user_id: user.id,
              integration_type: 'shopify',
              external_id: tokenData.shop,
              access_token: tokenData.access_token,
              refresh_token: null,
              token_expires_at: null,
              scopes: tokenData.scopes,
              metadata: tokenData.metadata,
              is_active: true,
            },
            {
              onConflict: 'user_id,integration_type,external_id',
            }
          )
          .select()

        if (error) {
          console.error('Error saving integration:', error)
          return
        }

        console.log('Integration saved successfully:', data)
        await fetchIntegrations()
      } catch (error) {
        console.error('Error saving integration:', error)
      }
    },
    [user, fetchIntegrations]
  )

  const handleDisconnect = useCallback(
    async (integrationId: string) => {
      if (!user) return

      try {
        const supabase = createClient()
        const { error } = await supabase
          .from('integrations')
          .update({ is_active: false })
          .eq('id', integrationId)
          .eq('user_id', user.id)

        if (error) {
          console.error('Error disconnecting integration:', error)
          return
        }

        await fetchIntegrations()
      } catch (error) {
        console.error('Error disconnecting integration:', error)
      }
    },
    [user, fetchIntegrations]
  )

  useEffect(() => {
    if (user) {
      fetchIntegrations()
    }
  }, [user, fetchIntegrations])

  return {
    integrations,
    loading,
    saveIntegration,
    handleDisconnect,
  }
}
