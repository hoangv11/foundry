export interface ToolCall {
  id: string
  toolName: string
  status: 'running' | 'completed' | 'error'
  startTime: number
  endTime?: number
  result?: any
}

export interface ToolProgressStep {
  name: string
  threshold: number
}

export interface ToolProgressInfo {
  currentStep: string
  progress: number
  steps: ToolProgressStep[]
}

export interface ToolMetadata {
  displayName: string
  description: string
  progressSteps?: ToolProgressStep[]
}
