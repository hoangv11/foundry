import { streamText, convertToModelMessages, UIMessage, stepCountIs } from 'ai'
import { AI_CONFIG, detectFullFlowRequest } from '@/lib/ai/config'
import { SYSTEM_PROMPT, FULL_FLOW_SEQUENCE } from '@/lib/ai/system-prompt'
import {
  storeLink,
  mailSetup,
  phoneassistant,
  influencerSearch,
  webSearch,
  marketSearch,
  generateLegalDocs,
  generatePitchDeck,
  generateBranding,
  generateBrandingVideo,
  createProductTools,
} from '@/lib/ai/tools'

export async function POST(req: Request) {
  try {
    const { messages, userId }: { messages: UIMessage[]; userId?: string } = await req.json()

    const wantsFullFlow = detectFullFlowRequest(messages)
    const productTools = createProductTools(userId)

    const result = streamText({
      model: AI_CONFIG.defaultModel,
      system: SYSTEM_PROMPT,
      messages: convertToModelMessages(messages),
      stopWhen: stepCountIs(AI_CONFIG.maxSteps),
      prepareStep: async ({ steps }) => {
        if (!wantsFullFlow) return {}

        const usedTools = new Set<string>()
        try {
          for (const s of (steps as any) || []) {
            const toolCalls = (s.toolCalls || []).map((t: any) => t.toolName)
            const toolResults = (s.toolResults || []).map((t: any) => t.toolName)
            for (const name of [...toolCalls, ...toolResults]) usedTools.add(name)
          }
        } catch {}

        const nextTool = FULL_FLOW_SEQUENCE.find(name => !usedTools.has(name))
        if (!nextTool) return {}
        return { activeTools: [nextTool] } as any
      },
      tools: {
        storeLink,
        mailSetup,
        phoneassistant,
        influencerSearch,
        webSearch,
        marketSearch,
        generateLegalDocs,
        generatePitchDeck,
        generateBranding,
        generateBrandingVideo,
        ...productTools,
      },
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error('Chat API error:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
