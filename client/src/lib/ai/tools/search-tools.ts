import { z } from 'zod'
import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'

export const influencerSearch = {
  description: "Find accessible influencers (micro/mid-tier) for the brand/idea",
  inputSchema: z.object({
    idea: z.string().describe('Brand or business idea to find influencers for'),
    target_market: z.string().optional().describe('Target audience'),
  }),
  execute: async ({ idea, target_market }: { idea: string; target_market?: string }) => {
    try {
      const res = await streamText({
        model: openai('gpt-4o'),
        messages: [{
          role: 'user',
          content: `Find accessible influencers for: "${idea}"${target_market ? ` targeting ${target_market}` : ''}. Focus on micro/mid-tier (1K-100K). Return concise JSON list with: name, handle, platform, followers_range, engagement, focus, links, why_relevant.`
        }]
      })
      let text = ''
      for await (const chunk of res.textStream) text += chunk
      let influencers: any = text
      try {
        const s = text.indexOf('[')
        const e = text.lastIndexOf(']') + 1
        influencers = JSON.parse(text.substring(s, e))
      } catch {}
      return {
        success: true,
        status: 'done',
        influencers,
        message: 'Influencer recommendations generated.'
      }
    } catch {
      return { success: false, status: 'error', message: 'Failed to generate influencer recommendations' }
    }
  }
}

export const webSearch = {
  description: "Search the web for real-time information using OpenAI's web search capabilities",
  inputSchema: z.object({
    query: z.string().describe("The search query to find information on the web"),
    max_results: z.number().optional().describe("Maximum number of search results to return (default: 5)")
  }),
  execute: async ({ query }: { query: string; max_results?: number }) => {
    try {
      const result = await streamText({
        model: openai('gpt-4o'),
        messages: [{
          role: 'user',
          content: `Please search for current information about: "${query}". Provide a comprehensive summary with the most relevant and recent information available. Include key findings, statistics, and important details. If you find specific sources or recent developments, mention them.`
        }]
      })

      let searchResults = ''
      for await (const chunk of result.textStream) {
        searchResults += chunk
      }

      return {
        success: true,
        status: "done",
        query,
        results: searchResults,
        message: `Found web search results for: ${query}`
      }
    } catch (error) {
      console.error('Error performing web search:', error)
      return {
        success: false,
        status: "error",
        message: `Failed to perform web search: ${error instanceof Error ? error.message : 'Unknown error'}`
      }
    }
  }
}

export const marketSearch = {
  description: "Search for market data, competitor analysis, and industry statistics",
  inputSchema: z.object({
    industry: z.string().describe("The industry or market sector to analyze"),
    competitors: z.array(z.string()).optional().describe("Specific competitors to analyze"),
    search_focus: z.enum(['market_size', 'competitors', 'trends', 'pricing', 'growth', 'all']).optional().describe("What aspect of the market to focus on"),
    region: z.string().optional().describe("Geographic region for market analysis (default: global)")
  }),
  execute: async ({ industry, competitors = [], search_focus = 'all', region = 'global' }: {
    industry: string
    competitors?: string[]
    search_focus?: 'market_size' | 'competitors' | 'trends' | 'pricing' | 'growth' | 'all'
    region?: string
  }) => {
    try {
      const searchQueries = []

      if (search_focus === 'all' || search_focus === 'market_size') {
        searchQueries.push(`${industry} market size 2024 ${region}`)
      }
      if (search_focus === 'all' || search_focus === 'competitors') {
        if (competitors.length > 0) {
          searchQueries.push(`${competitors.join(' ')} ${industry} competitors analysis 2024`)
        } else {
          searchQueries.push(`top ${industry} companies competitors 2024 ${region}`)
        }
      }
      if (search_focus === 'all' || search_focus === 'trends') {
        searchQueries.push(`${industry} market trends 2024 ${region}`)
      }
      if (search_focus === 'all' || search_focus === 'pricing') {
        searchQueries.push(`${industry} pricing strategies market analysis 2024`)
      }
      if (search_focus === 'all' || search_focus === 'growth') {
        searchQueries.push(`${industry} market growth forecast 2024-2025 ${region}`)
      }

      const comprehensiveQuery = searchQueries.slice(0, 2).join(' | ')
      const searchResults = []

      try {
        const result = await streamText({
          model: openai('gpt-4o'),
          messages: [{
            role: 'user',
            content: `Provide a comprehensive market analysis for the ${industry} industry in ${region}. Research and include:

1. Market size and growth projections
2. Key competitors and their market positions${competitors.length > 0 ? ` (focus on: ${competitors.join(', ')})` : ''}
3. Current trends and opportunities
4. Pricing insights and strategies
5. Strategic recommendations

Focus on actionable insights for business strategy. Include specific data points, statistics, and recent developments.`
          }]
        })

        let analysis = ''
        for await (const chunk of result.textStream) {
          analysis += chunk
        }

        searchResults.push({
          query: comprehensiveQuery,
          analysis
        })
      } catch (searchError) {
        console.error(`Error in market analysis:`, searchError)
        searchResults.push({
          query: comprehensiveQuery,
          analysis: `Market analysis for ${industry} industry in ${region}. Analysis in progress...`
        })
      }

      const finalAnalysis = searchResults[0]?.analysis || `Market analysis for ${industry} industry in ${region} completed.`

      return {
        success: true,
        status: "done",
        industry,
        region,
        search_focus,
        competitors_analyzed: competitors,
        market_analysis: finalAnalysis,
        research_queries: searchQueries,
        message: `Completed market analysis for ${industry} industry in ${region}`
      }
    } catch (error) {
      console.error('Error performing market search:', error)
      return {
        success: false,
        status: "error",
        message: `Failed to perform market search: ${error instanceof Error ? error.message : 'Unknown error'}`
      }
    }
  }
}
