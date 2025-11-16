'use client'

import { cn } from '@/lib/utils'
import { CheckCircle, Loader2, XCircle } from 'lucide-react'
import { TOOL_DISPLAY_NAMES, TOOL_DESCRIPTIONS } from '@/config/tools'
import { ToolProgressBar } from './ToolProgressBar'
import { ToolResultRenderer } from './ToolResultRenderer'

export interface ToolCall {
  id: string
  toolName: string
  status: 'running' | 'completed' | 'error'
  startTime: number
  endTime?: number
  result?: any
}

interface ToolCallProgressProps {
  toolCalls: ToolCall[]
  className?: string
}

export function ToolCallProgress({ toolCalls, className }: ToolCallProgressProps) {
  if (toolCalls.length === 0) return null

  return (
    <div className={cn('space-y-3', className)}>
      {toolCalls.map((toolCall) => {
        const isRunning = toolCall.status === 'running'
        const isCompleted = toolCall.status === 'completed'
        const isError = toolCall.status === 'error'

        const duration = toolCall.endTime
          ? toolCall.endTime - toolCall.startTime
          : Date.now() - toolCall.startTime

        return (
          <div
            key={toolCall.id}
            className={cn(
              'flex items-start gap-3 p-4 rounded-lg border transition-all',
              isRunning && 'bg-blue-50 border-blue-200',
              isCompleted && 'bg-green-50 border-green-200',
              isError && 'bg-red-50 border-red-200'
            )}
          >
            <div className="flex-shrink-0 mt-0.5">
              {isRunning && <Loader2 className="h-5 w-5 animate-spin text-blue-600" />}
              {isCompleted && <CheckCircle className="h-5 w-5 text-green-600" />}
              {isError && <XCircle className="h-5 w-5 text-red-600" />}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="text-sm font-medium text-gray-900 truncate">
                  {TOOL_DISPLAY_NAMES[toolCall.toolName] || toolCall.toolName}
                </h4>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {Math.round(duration / 1000)}s
                </span>
              </div>

              {isRunning && (
                <ToolProgressBar toolName={toolCall.toolName} duration={duration} />
              )}

              <p className="text-xs text-gray-600 mt-1">
                {TOOL_DESCRIPTIONS[toolCall.toolName] || 'Processing your request...'}
              </p>

              {isCompleted && toolCall.result && (
                <div className="mt-2 p-2 bg-white rounded border text-xs text-gray-700">
                  <ToolResultRenderer toolName={toolCall.toolName} result={toolCall.result} />
                </div>
              )}

              {isError && (
                <div className="mt-2 p-2 bg-red-100 rounded border border-red-200 text-xs text-red-700">
                  <span className="font-medium">Error:</span>{' '}
                  {toolCall.result?.message || 'An error occurred'}
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
