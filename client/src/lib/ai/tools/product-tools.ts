import { z } from 'zod'
import { createServerClient } from '@/lib/supabase-server'

export function createProductTools(userId?: string) {
  return {
    addProduct: {
      description: "Add a new product to the user's Shopify store",
      inputSchema: z.object({
        title: z.string().describe("The product title/name"),
        description: z.string().optional().describe("Product description"),
        price: z.number().describe("Product price in dollars (e.g., 19.99 for $19.99)"),
        sku: z.string().optional().describe("Product SKU"),
        inventory_quantity: z.number().optional().describe("Initial inventory quantity (defaults to 10 if not specified)"),
        product_type: z.string().optional().describe("Product type/category"),
        vendor: z.string().optional().describe("Product vendor/brand"),
        tags: z.array(z.string()).optional().describe("Product tags"),
        images: z.array(z.string()).optional().describe("Product image URLs")
      }),
      execute: async ({ title, description, price, sku, inventory_quantity = 10, product_type, vendor, tags, images }: {
        title: string
        description?: string
        price: number
        sku?: string
        inventory_quantity?: number
        product_type?: string
        vendor?: string
        tags?: string[]
        images?: string[]
      }) => {
        try {
          if (!userId) {
            return {
              success: false,
              status: "error",
              message: "User ID is required to add products"
            }
          }

          const supabase = createServerClient()
          const { data: shopifyIntegration, error } = await supabase
            .from('integrations')
            .select('*')
            .eq('user_id', userId)
            .eq('integration_type', 'shopify')
            .eq('is_active', true)
            .single()

          if (error || !shopifyIntegration) {
            return {
              success: false,
              status: "error",
              message: "No active Shopify integration found. Please connect your Shopify store first."
            }
          }

          const shopDomain = shopifyIntegration.external_id
          const accessToken = shopifyIntegration.access_token

          const productData = {
            product: {
              title,
              body_html: description ? `<p>${description}</p>` : undefined,
              vendor,
              product_type,
              tags: tags ? tags.join(', ') : undefined,
              variants: [{
                price: price.toFixed(2),
                sku,
                inventory_quantity,
                inventory_management: "shopify"
              }],
              images: images ? images.map((url: string) => ({ src: url })) : undefined
            }
          }

          const response = await fetch(`https://${shopDomain}/admin/api/2023-10/products.json`, {
            method: 'POST',
            headers: {
              'X-Shopify-Access-Token': accessToken,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData)
          })

          if (!response.ok) {
            const errorData = await response.text()
            throw new Error(`Shopify API error: ${response.status} - ${errorData}`)
          }

          const result = await response.json()
          const product = result.product

          return {
            success: true,
            status: "done",
            product: {
              id: product.id,
              title: product.title,
              handle: product.handle,
              price: product.variants[0]?.price,
              sku: product.variants[0]?.sku,
              inventory_quantity: product.variants[0]?.inventory_quantity,
              admin_url: `https://${shopDomain}/admin/products/${product.id}`,
              store_url: `https://${shopDomain}/products/${product.handle}`
            },
            message: `Successfully added product "${title}" to your Shopify store`
          }
        } catch (error) {
          console.error('Error adding product to Shopify:', error)
          return {
            success: false,
            status: "error",
            message: `Failed to add product: ${error instanceof Error ? error.message : 'Unknown error'}`
          }
        }
      }
    },

    deleteProduct: {
      description: "Delete a product from the user's Shopify store",
      inputSchema: z.object({
        product_id: z.string().describe("The Shopify product ID to delete"),
        product_title: z.string().optional().describe("The product title for confirmation (optional)")
      }),
      execute: async ({ product_id, product_title }: { product_id: string; product_title?: string }) => {
        try {
          if (!userId) {
            return {
              success: false,
              status: "error",
              message: "User ID is required to delete products"
            }
          }

          const supabase = createServerClient()
          const { data: shopifyIntegration, error } = await supabase
            .from('integrations')
            .select('*')
            .eq('user_id', userId)
            .eq('integration_type', 'shopify')
            .eq('is_active', true)
            .single()

          if (error || !shopifyIntegration) {
            return {
              success: false,
              status: "error",
              message: "No active Shopify integration found. Please connect your Shopify store first."
            }
          }

          const shopDomain = shopifyIntegration.external_id
          const accessToken = shopifyIntegration.access_token

          const response = await fetch(`https://${shopDomain}/admin/api/2023-10/products/${product_id}.json`, {
            method: 'DELETE',
            headers: {
              'X-Shopify-Access-Token': accessToken,
              'Content-Type': 'application/json',
            }
          })

          if (!response.ok) {
            if (response.status === 404) {
              return {
                success: false,
                status: "error",
                message: `Product with ID ${product_id} not found. It may have already been deleted.`
              }
            }
            const errorData = await response.text()
            throw new Error(`Shopify API error: ${response.status} - ${errorData}`)
          }

          return {
            success: true,
            status: "done",
            product_id,
            message: `Successfully deleted product${product_title ? ` "${product_title}"` : ''} (ID: ${product_id}) from your Shopify store`
          }
        } catch (error) {
          console.error('Error deleting product from Shopify:', error)
          return {
            success: false,
            status: "error",
            message: `Failed to delete product: ${error instanceof Error ? error.message : 'Unknown error'}`
          }
        }
      }
    },

    deleteAllProducts: {
      description: "Delete all products from the user's Shopify store",
      inputSchema: z.object({
        confirm: z.boolean().optional().describe("Confirmation to delete all products (defaults to true)")
      }),
      execute: async ({ confirm = true }: { confirm?: boolean }) => {
        try {
          if (!userId) {
            return {
              success: false,
              status: "error",
              message: "User ID is required to delete products"
            }
          }

          if (!confirm) {
            return {
              success: false,
              status: "error",
              message: "Operation cancelled - confirmation required to delete all products"
            }
          }

          const supabase = createServerClient()
          const { data: shopifyIntegration, error } = await supabase
            .from('integrations')
            .select('*')
            .eq('user_id', userId)
            .eq('integration_type', 'shopify')
            .eq('is_active', true)
            .single()

          if (error || !shopifyIntegration) {
            return {
              success: false,
              status: "error",
              message: "No active Shopify integration found. Please connect your Shopify store first."
            }
          }

          const shopDomain = shopifyIntegration.external_id
          const accessToken = shopifyIntegration.access_token

          const productsResponse = await fetch(`https://${shopDomain}/admin/api/2023-10/products.json?limit=250`, {
            method: 'GET',
            headers: {
              'X-Shopify-Access-Token': accessToken,
              'Content-Type': 'application/json',
            }
          })

          if (!productsResponse.ok) {
            const errorData = await productsResponse.text()
            throw new Error(`Failed to fetch products: ${productsResponse.status} - ${errorData}`)
          }

          const productsData = await productsResponse.json()
          const products = productsData.products || []

          if (products.length === 0) {
            return {
              success: true,
              status: "done",
              deleted_count: 0,
              message: "No products found in your store to delete"
            }
          }

          const deletedProducts = []
          const failedProducts = []

          for (const product of products) {
            try {
              const deleteResponse = await fetch(`https://${shopDomain}/admin/api/2023-10/products/${product.id}.json`, {
                method: 'DELETE',
                headers: {
                  'X-Shopify-Access-Token': accessToken,
                  'Content-Type': 'application/json',
                }
              })

              if (deleteResponse.ok) {
                deletedProducts.push({
                  id: product.id,
                  title: product.title
                })
              } else {
                failedProducts.push({
                  id: product.id,
                  title: product.title,
                  error: `HTTP ${deleteResponse.status}`
                })
              }
            } catch (error) {
              failedProducts.push({
                id: product.id,
                title: product.title,
                error: error instanceof Error ? error.message : 'Unknown error'
              })
            }
          }

          return {
            success: true,
            status: "done",
            deleted_count: deletedProducts.length,
            failed_count: failedProducts.length,
            deleted_products: deletedProducts,
            failed_products: failedProducts,
            message: `Successfully deleted ${deletedProducts.length} products from your Shopify store${failedProducts.length > 0 ? ` (${failedProducts.length} failed)` : ''}`
          }
        } catch (error) {
          console.error('Error deleting all products from Shopify:', error)
          return {
            success: false,
            status: "error",
            message: `Failed to delete all products: ${error instanceof Error ? error.message : 'Unknown error'}`
          }
        }
      }
    }
  }
}
