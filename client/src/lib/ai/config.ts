import { google } from '@ai-sdk/google'
import { DEFAULT_AI_MODEL } from '@/constants'

export const AI_CONFIG = {
  defaultModel: google('gemini-2.5-flash'),
  maxSteps: 12,
  runtime: 'nodejs', // Using Node.js runtime for better compatibility
} as const

export function detectFullFlowRequest(messages: any[]): boolean {
  const lastUserMsg = [...messages].reverse().find(m => m.role === 'user')
  const lastText = (typeof (lastUserMsg as any)?.content === 'string'
    ? (lastUserMsg as any).content
    : ''
  ).toLowerCase()

  return /full\s*flow|complete\s*setup|end[- ]?to[- ]?end|all\s*steps|run\s*everything/.test(lastText)
}
