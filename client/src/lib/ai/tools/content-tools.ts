import { z } from 'zod'
import { google } from '@ai-sdk/google'
import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'

export const generateLegalDocs = {
  description: "Generate legal documents (privacy policy, terms of service, NDA) for a business idea",
  inputSchema: z.object({
    idea: z.string().describe("The business idea or description to generate legal documents for")
  }),
  execute: async ({ idea }: { idea: string }) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/legal/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idea }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      let parsedDocs
      try {
        let cleanedDocs = result.docs.trim()

        cleanedDocs = cleanedDocs.replace(/^```json\s*/i, '').replace(/\s*```$/i, '')
        cleanedDocs = cleanedDocs.replace(/^```\s*/i, '').replace(/\s*```$/i, '')
        cleanedDocs = cleanedDocs.replace(/^`+|`+$/g, '').trim()

        if (cleanedDocs.includes('```')) {
          const jsonMatch = cleanedDocs.match(/```(?:json)?\s*(\[[\s\S]*?\])\s*```/)
          if (jsonMatch && jsonMatch[1]) {
            cleanedDocs = jsonMatch[1].trim()
          }
        }

        const jsonStart = cleanedDocs.indexOf('[')
        const jsonEnd = cleanedDocs.lastIndexOf(']') + 1

        if (jsonStart === -1 || jsonEnd === 0) {
          throw new Error('No JSON array found in response')
        }

        const jsonString = cleanedDocs.substring(jsonStart, jsonEnd)

        if (!jsonString.startsWith('[')) {
          throw new Error('Response is not valid JSON array')
        }

        console.log('Parsing JSON string:', jsonString.substring(0, 200) + '...')
        parsedDocs = JSON.parse(jsonString)

        if (!Array.isArray(parsedDocs)) {
          throw new Error('Response is not a JSON array')
        }

        console.log('Successfully parsed', parsedDocs.length, 'documents')
      } catch (parseError) {
        console.error('Error parsing legal docs JSON:', parseError)
        console.error('Raw response:', result.docs)

        try {
          const rawDocs = result.docs
          if (rawDocs && typeof rawDocs === 'string') {
            const jsonArrayMatch = rawDocs.match(/```(?:json)?\s*(\[[\s\S]*?\])\s*```/)
            if (jsonArrayMatch && jsonArrayMatch[1]) {
              const extractedJson = jsonArrayMatch[1].trim()
              console.log('Trying to parse extracted JSON:', extractedJson.substring(0, 200) + '...')
              parsedDocs = JSON.parse(extractedJson)

              if (Array.isArray(parsedDocs)) {
                console.log('Successfully parsed extracted JSON:', parsedDocs.length, 'documents')
              } else {
                throw new Error('Extracted content is not a JSON array')
              }
            } else {
              throw new Error('No JSON array found in markdown')
            }
          } else {
            throw new Error('No raw docs available')
          }
        } catch (secondParseError) {
          console.error('Second parse attempt also failed:', secondParseError)

          const rawDocs = result.docs
          let fallbackDocs: any[] = []

          if (rawDocs && typeof rawDocs === 'string') {
            const docMatches = rawDocs.match(/(?:title|name|type)[\s:]*["']?([^"'\n]+)["']?/gi)
            if (docMatches && docMatches.length > 0) {
              fallbackDocs = docMatches.map((match, index) => ({
                doc_type: `Document ${index + 1}`,
                title: match.replace(/^(?:title|name|type)[\s:]*["']?/i, '').replace(/["']?$/i, ''),
                summary: 'Document generated successfully',
                content: 'Content available in the generated PDF',
                placeholders: [],
                defaults_used: {}
              }))
            }
          }

          if (fallbackDocs.length > 0) {
            console.log('Using fallback document extraction:', fallbackDocs.length, 'documents')
            return {
              success: true,
              status: "done",
              docs: fallbackDocs,
              pdfs: result.pdfs || [],
              message: `Generated ${fallbackDocs.length} legal documents (with fallback parsing) for: ${idea}`
            }
          }

          return {
            success: false,
            status: "error",
            message: "Failed to parse legal documents response. Please try again."
          }
        }
      }

      const formattedDocs = parsedDocs.map((doc: any) => ({
        type: doc.doc_type,
        title: doc.title,
        summary: doc.summary,
        content: doc.content,
        placeholders: doc.placeholders || [],
        defaults_used: doc.defaults_used || {}
      }))

      return {
        success: true,
        status: "done",
        docs: formattedDocs,
        pdfs: result.pdfs || [],
        message: `Generated ${formattedDocs.length} legal documents for: ${idea}`
      }
    } catch (error) {
      console.error('Error generating legal docs:', error)
      return {
        success: false,
        status: "error",
        message: `Failed to generate legal documents: ${error instanceof Error ? error.message : 'Unknown error'}`
      }
    }
  }
}

export const generatePitchDeck = {
  description: "Generate a comprehensive pitch deck with market research, financial models, and professional design",
  inputSchema: z.object({
    idea: z.string().describe("The business idea or concept (e.g., 'AI that manages Shopify stores')"),
    problem: z.string().optional().describe("The problem being solved"),
    target_market: z.string().optional().describe("Target market or customer segment"),
    competitors: z.array(z.string()).optional().describe("Known competitors"),
    revenue_model: z.string().optional().describe("Revenue model (subscription, one-time, marketplace, etc.)"),
    funding_amount: z.number().optional().describe("Funding amount being sought (in thousands)"),
    team_size: z.number().optional().describe("Current team size"),
    stage: z.enum(['idea', 'mvp', 'early_traction', 'growth', 'scale']).optional().describe("Current business stage")
  }),
  execute: async ({ idea, problem, target_market, competitors = [] }: {
    idea: string
    problem?: string
    target_market?: string
    competitors?: string[]
  }) => {
    try {
      const marketResearch = await streamText({
        model: openai('gpt-4o'),
        messages: [{
          role: 'user',
          content: `Conduct comprehensive market research for this business idea: "${idea}"

${problem ? `Problem: ${problem}` : ''}
${target_market ? `Target Market: ${target_market}` : ''}
${competitors.length > 0 ? `Competitors: ${competitors.join(', ')}` : ''}

Provide:
1. Market size (TAM, SAM, SOM)
2. Key competitors and their strengths/weaknesses
3. Market trends and opportunities
4. Customer pain points and needs
5. Competitive landscape analysis

Format as structured JSON.`
        }]
      })

      let marketData = ''
      for await (const chunk of marketResearch.textStream) {
        marketData += chunk
      }

      const influencerResearch = await streamText({
        model: openai('gpt-4o'),
        messages: [{
          role: 'user',
          content: `Find the most relevant influencers for this STARTING BUSINESS: "${idea}"

${target_market ? `Target Market: ${target_market}` : ''}
${problem ? `Problem: ${problem}` : ''}

IMPORTANT: This is a starting business, so focus on influencers who are:
1. Accessible and likely to work with new businesses
2. NOT extremely famous (avoid celebrities, mega-influencers with 1M+ followers)
3. More affordable for partnerships and collaborations
4. Have engaged, niche audiences

Search for influencers who:
1. Are relevant to the target market/industry
2. Have 1K-100K followers (micro to mid-tier influencers)
3. Create content related to the problem/solution
4. Are active on social platforms
5. Have high engagement rates relative to their follower count
6. Are known to work with small/starting businesses

For each influencer, provide:
- Name and handle
- Platform (Instagram, Twitter, LinkedIn, YouTube, TikTok)
- Follower count range (1K-100K preferred)
- Engagement rate
- Content focus areas
- Social media links
- Why they're relevant and accessible for a starting business
- Estimated partnership cost range (if known)

Focus on:
- Micro-influencers (1K-10K followers) - most accessible
- Mid-tier influencers (10K-100K followers) - good reach/affordability balance
- Industry experts with smaller but engaged followings
- Content creators who work with startups
- Entrepreneurs who share their journey

AVOID: Celebrities, mega-influencers, or anyone with 1M+ followers

Format as structured JSON with social links.`
        }]
      })

      let influencerData = ''
      for await (const chunk of influencerResearch.textStream) {
        influencerData += chunk
      }

      const deckContent = await streamText({
        model: google('gemini-2.5-flash'),
        messages: [{
          role: 'user',
          content: `Generate a comprehensive 10-slide pitch deck for this business idea: "${idea}"

Market Research Data:
${marketData}

Influencer Research Data:
${influencerData}

Create slides for:
1. Title Slide (Company name, tagline, contact info)
2. Problem (Pain points, market need)
3. Solution (Your product/service)
4. Market Opportunity (TAM/SAM/SOM)
5. Business Model (Revenue streams, pricing)
6. Traction (Metrics, milestones, growth)
7. Competition (Competitive landscape, differentiation)
8. Team (Founders, advisors, key hires)
9. Influencer Strategy (Key influencers, partnership opportunities)
10. Ask (Funding amount, use of funds, next steps)

Each slide should have:
- Compelling headline
- 3-4 bullet points with specific data and insights
- Key metrics and numbers from the research
- Visual suggestions
- Use the market research and influencer data to make it data-driven

Format as structured JSON array with this exact structure:
[
  {
    "title": "Slide Title",
    "icon": "📊",
    "content": [
      "Bullet point 1 with specific data",
      "Bullet point 2 with metrics",
      "Bullet point 3 with insights",
      "Bullet point 4 with call to action"
    ]
  }
]`
        }]
      })

      let deckData = ''
      for await (const chunk of deckContent.textStream) {
        deckData += chunk
      }

      const designSpecs = await streamText({
        model: openai('gpt-4o'),
        messages: [{
          role: 'user',
          content: `Create design specifications for a pitch deck about: "${idea}"

Choose:
1. Color scheme (primary, secondary, accent colors)
2. Typography (headings, body text)
3. Layout style (modern, professional, creative)
4. Icon suggestions for each slide
5. Chart/graph recommendations
6. Visual hierarchy guidelines

Format as structured JSON with specific color codes and design recommendations.`
        }]
      })

      let designData = ''
      for await (const chunk of designSpecs.textStream) {
        designData += chunk
      }

      let slides: any[] = []
      try {
        let cleanedDeck = deckData.trim()
        if (cleanedDeck.startsWith('```json')) {
          cleanedDeck = cleanedDeck.replace('```json', '').replace('```', '').trim()
        } else if (cleanedDeck.startsWith('```')) {
          cleanedDeck = cleanedDeck.replace('```', '').trim()
        }

        const start = cleanedDeck.indexOf('[')
        const end = cleanedDeck.lastIndexOf(']') + 1

        if (start === -1 || end === 0) {
          throw new Error('No JSON array found in response')
        }

        const jsonString = cleanedDeck.substring(start, end)
        slides = JSON.parse(jsonString)

        if (!Array.isArray(slides) || slides.length === 0) {
          throw new Error('Invalid slides array')
        }

        slides = slides.map((slide, index) => ({
          title: slide.title || `Slide ${index + 1}`,
          icon: slide.icon || '📊',
          content: Array.isArray(slide.content) ? slide.content : [String(slide.content || 'Content not available')]
        }))

      } catch (parseError) {
        console.error('Error parsing pitch deck JSON:', parseError)
        console.error('Raw deck data:', deckData)
        slides = [
          { title: idea, icon: '📊', content: ['Pitch deck generated with AI insights.'] },
          { title: 'Problem', icon: '🎯', content: ['Market need identified through research.'] },
          { title: 'Solution', icon: '💡', content: ['Innovative approach to address the problem.'] },
          { title: 'Market Opportunity', icon: '📈', content: ['Significant market potential identified.'] },
          { title: 'Business Model', icon: '💰', content: ['Sustainable revenue streams planned.'] }
        ]
      }

      let deckPdfUrl: string | null = null
      const deckId = `deck_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      try {
        const pdfResp = await fetch('http://127.0.0.1:3000/api/pitchdeck/export', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ deckId, slides })
        })
        if (pdfResp.ok) {
          const pdfBuffer = await pdfResp.arrayBuffer()

          const uint8 = new Uint8Array(pdfBuffer)
          let binary = ''
          const chunkSize = 0x8000
          for (let i = 0; i < uint8.length; i += chunkSize) {
            const chunk = uint8.subarray(i, i + chunkSize)
            binary += String.fromCharCode.apply(null, Array.prototype.slice.call(chunk) as any)
          }
          const b64 = btoa(binary)

          const uploadResp = await fetch('http://127.0.0.1:3000/api/pitchdeck/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              pdfBuffer: b64,
              fileName: `pitch-deck-${deckId}.pdf`
            })
          })

          if (uploadResp.ok) {
            const uploadData = await uploadResp.json()
            deckPdfUrl = uploadData.pdf_url
          } else {
            console.error('Error uploading pitch deck to Supabase')
          }
        }
      } catch (e) {
        console.error('Error exporting pitch deck PDF:', e)
      }

      return {
        success: true,
        status: "done",
        deck_id: deckId,
        idea,
        market_research: marketData,
        influencer_research: influencerData,
        deck_content: deckData,
        design_specs: designData,
        pdf_url: deckPdfUrl,
        message: `Generated comprehensive pitch deck for "${idea}" with market research and influencer strategy.${deckPdfUrl ? ` [Download PDF](${deckPdfUrl})` : ''}`
      }
    } catch (error) {
      console.error('Error generating pitch deck:', error)
      return {
        success: false,
        status: "error",
        message: `Failed to generate pitch deck: ${error instanceof Error ? error.message : 'Unknown error'}`
      }
    }
  }
}

export const generateBranding = {
  description: "Generate branding assets (name, tagline, logo) for a business idea",
  inputSchema: z.object({
    idea: z.string().describe("The business idea or concept to generate branding for")
  }),
  execute: async ({ idea }: { idea: string }) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/brand/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idea_string: idea }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      const branding = data.branding || {}

      return {
        success: true,
        status: "done",
        branding,
        message: `Successfully generated branding for "${idea}"`
      }
    } catch (error) {
      console.error('Error generating branding:', error)
      return {
        success: false,
        status: "error",
        message: `Failed to generate branding: ${error instanceof Error ? error.message : 'Unknown error'}`
      }
    }
  }
}

export const generateBrandingVideo = {
  description: "Generate a branding video for a business idea",
  inputSchema: z.object({
    idea: z.string().describe("The business idea or concept to generate a branding video for")
  }),
  execute: async ({ idea }: { idea: string }) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/brand/generate-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idea_string: idea }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      const videoUrl: string | null = data?.video_url ?? null

      return {
        success: true,
        status: "done",
        video: data.video === true,
        video_url: videoUrl,
        message: `Successfully generated branding video for "${idea}"`
      }
    } catch (error) {
      console.error('Error generating branding video:', error)
      return {
        success: false,
        status: "error",
        message: `Failed to generate branding video: ${error instanceof Error ? error.message : 'Unknown error'}`
      }
    }
  }
}
