export interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  parts?: MessagePart[]
  toolInvocations?: ToolInvocation[]
  createdAt?: Date
}

export interface MessagePart {
  type: string
  text?: string
  toolCallId?: string
  toolName?: string
  state?: 'input-streaming' | 'input-available' | 'output-available' | 'output-error'
  output?: any
  errorText?: string
}

export interface ToolInvocation {
  toolCallId: string
  toolName: string
  state: 'input-streaming' | 'input-available' | 'result' | 'error'
  result?: any
  args?: any
}

export interface LegalDocument {
  title: string
  content: string
  type: 'privacy_policy' | 'terms_of_service' | 'nda' | 'other'
}
