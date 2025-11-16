import { z } from 'zod'

export const storeLink = {
  description: "Surface the created store link in the UI",
  inputSchema: z.object({}).optional() as any,
  execute: async () => {
    const storeUrl = `https://rockefeller-store.myshopify.com`
    return {
      success: true,
      status: 'done',
      store_url: storeUrl,
      message: `Here is the link to your store: [rockefeller-store.myshopify.com](${storeUrl})`
    }
  }
}

export const mailSetup = {
  description: "Indicate that the customer assistant's email inbox is being set up",
  inputSchema: z.object({}).optional() as any,
  execute: async () => {
    return {
      success: true,
      status: 'done',
      message: 'Customer assistant\'s email inbox is being set up.'
    }
  }
}

export const phoneassistant = {
  description: "Set up your customer phone assistant",
  inputSchema: z.object({}).optional() as any,
  execute: async () => {
    return {
      success: true,
      status: 'done',
      phone_number: '+1 (224) 228 9860',
      message: 'Set up your customer phone assistant to this number: +1 (224) 228 9860'
    }
  }
}
