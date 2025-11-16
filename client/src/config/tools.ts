import { ToolProgressStep } from '@/types'

export const TOOL_DISPLAY_NAMES: Record<string, string> = {
  setupStore: 'Setting up your store',
  configurePayment: 'Configuring payment methods',
  setupInventory: 'Setting up product inventory',
  generateLegalDocs: 'Generating comprehensive legal documents',
  addProduct: 'Adding product to your store',
  deleteProduct: 'Deleting product from your store',
  deleteAllProducts: 'Deleting all products from your store',
  webSearch: 'Searching the web',
  marketSearch: 'Analyzing market data',
  generatePitchDeck: 'Generating pitch deck',
  generateBranding: 'Creating branding assets',
  generateBrandingVideo: 'Generating branding video',
  storeLink: 'Store link ready',
  mailSetup: 'Setting up assistant inbox',
  phoneassistant: 'Setting up phone assistant',
  influencerSearch: 'Finding influencers',
}

export const TOOL_DESCRIPTIONS: Record<string, string> = {
  setupStore: 'Creating store with all necessary configurations',
  configurePayment: 'Setting up payment methods',
  setupInventory: 'Creating sample products and organizing catalog',
  generateLegalDocs: 'Creating privacy policy, terms of use, and NDA documents',
  addProduct: 'Adding new product to your Shopify store',
  deleteProduct: 'Removing product from your Shopify store',
  deleteAllProducts: 'Removing all products from your Shopify store',
  webSearch: 'Gathering real-time information from the web',
  marketSearch: 'Researching competitors, trends, and market statistics',
  generatePitchDeck: 'Creating comprehensive investor presentation with market research and financial models',
  generateBranding: 'Creating business name, tagline, and logo design',
  generateBrandingVideo: 'Generating promotional video content for your brand',
  storeLink: 'Surface the link to your created store',
  mailSetup: 'Setting up the customer assistant inbox',
  phoneassistant: 'Setting up your customer phone assistant',
  influencerSearch: 'Recommending accessible influencers (micro/mid-tier)',
}

export const TOOL_PROGRESS_STEPS: Record<string, ToolProgressStep[]> = {
  marketSearch: [
    { name: 'Gathering market data', threshold: 5000 },
    { name: 'Analyzing competitors', threshold: 15000 },
    { name: 'Researching trends', threshold: 25000 },
    { name: 'Compiling insights', threshold: 35000 },
    { name: 'Finalizing report', threshold: 45000 },
  ],
  webSearch: [
    { name: 'Searching the web', threshold: 3000 },
    { name: 'Analyzing results', threshold: 8000 },
    { name: 'Compiling information', threshold: 15000 },
  ],
  generatePitchDeck: [
    { name: 'Researching market', threshold: 8000 },
    { name: 'Finding influencers', threshold: 16000 },
    { name: 'Generating slide content', threshold: 24000 },
    { name: 'Creating design specs', threshold: 32000 },
    { name: 'Finalizing presentation', threshold: 40000 },
  ],
}

export function getToolDisplayName(toolName: string): string {
  return TOOL_DISPLAY_NAMES[toolName] || toolName
}

export function getToolDescription(toolName: string): string {
  return TOOL_DESCRIPTIONS[toolName] || 'Processing your request...'
}

export function getToolProgressSteps(toolName: string) {
  return TOOL_PROGRESS_STEPS[toolName] || null
}
