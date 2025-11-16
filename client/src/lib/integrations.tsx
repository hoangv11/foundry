import Image from 'next/image'

export function getIntegrationIcon(type: string) {
  switch (type) {
    case 'shopify':
      return <Image src="/shopify.svg" alt="Shopify" width={20} height={20} />
    default:
      return <div className="w-5 h-5 bg-gray-300 rounded" />
  }
}

export function getIntegrationName(type: string) {
  switch (type) {
    case 'shopify':
      return 'Shopify'
    default:
      return type.charAt(0).toUpperCase() + type.slice(1)
  }
}
