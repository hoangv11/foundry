import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import type { ShopifyTokenData } from '@/types/integration'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

interface UseShopifyOAuthProps {
  onSaveIntegration: (tokenData: ShopifyTokenData) => Promise<void>
}

export function useShopifyOAuth({ onSaveIntegration }: UseShopifyOAuthProps) {
  const { user } = useUser()
  const [connecting, setConnecting] = useState(false)
  const [oauthProcessed, setOauthProcessed] = useState(false)

  const shopifyStore =
    process.env.NEXT_PUBLIC_SHOPIFY_STORE_LINK || 'your-store.myshopify.com'

  useEffect(() => {
    if (oauthProcessed) return

    const urlParams = new URLSearchParams(window.location.search)
    console.log('URL params on mount:', Object.fromEntries(urlParams.entries()))

    if (urlParams.get('shopify_installed') === '1') {
      const shop = urlParams.get('shop')
      const tokenData = urlParams.get('token_data')

      console.log('OAuth success detected on mount:', {
        shop,
        tokenData: tokenData ? 'present' : 'missing',
        user: user ? 'present' : 'missing',
      })

      setOauthProcessed(true)

      if (tokenData && user) {
        const handleSave = async () => {
          try {
            const decodedData = JSON.parse(atob(tokenData))
            console.log('Decoded token data:', decodedData)
            await onSaveIntegration(decodedData)
          } catch (error) {
            console.error('Error decoding token data:', error)
          }
        }
        handleSave()
      }

      setTimeout(() => {
        window.history.replaceState({}, document.title, window.location.pathname)
      }, 1000)
    }
  }, [user, onSaveIntegration, oauthProcessed])

  const handleShopifyConnect = () => {
    setConnecting(true)
    const authUrl = `${API_BASE}/api/shopify/auth?shop=${encodeURIComponent(shopifyStore)}`
    window.open(authUrl, '_blank', 'width=600,height=700')

    setTimeout(() => {
      setConnecting(false)
    }, 10000)
  }

  return {
    connecting,
    handleShopifyConnect,
  }
}
