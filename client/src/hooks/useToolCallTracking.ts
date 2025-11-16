import { useState, useEffect, useRef } from 'react'
import { ToolCall } from '@/components/ToolCallProgress'

export function useToolCallTracking(messages: any[], status: string) {
  const [toolCalls, setToolCalls] = useState<ToolCall[]>([])
  const processedToolResultsRef = useRef<Set<string>>(new Set())

  const onToolCall = ({ toolCall }: any) => {
    const { toolCallId, toolName } = toolCall
    setToolCalls((prev) => {
      const existingIndex = prev.findIndex((tc) => tc.id === toolCallId)
      if (existingIndex >= 0) {
        return prev.map((tc, index) =>
          index === existingIndex
            ? { ...tc, status: 'running' as const, startTime: Date.now() }
            : tc
        )
      }
      const progressed = prev.map((tc) =>
        tc.status === 'running'
          ? { ...tc, status: 'completed' as const, endTime: Date.now() }
          : tc
      )

      const newToolCall: ToolCall = {
        id:
          toolCallId ||
          `tool-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        toolName,
        status: 'running',
        startTime: Date.now(),
      }
      return [...progressed, newToolCall]
    })
  }

  const onToolResult = (evt: any) => {
    const { toolCallId } = evt || {}
    const payload =
      evt?.result ??
      evt?.output ??
      evt?.toolResult?.output ??
      evt?.toolResult ??
      evt ??
      null
    if (!toolCallId || !payload) {
      return
    }

    if (payload?.docs) {
      console.log('Legal docs tool result:', payload)
    }

    setToolCalls((prev) => {
      const updated = prev.map((tc) =>
        tc.id === toolCallId
          ? {
              ...tc,
              status: 'completed' as const,
              result: payload,
              endTime: Date.now(),
            }
          : tc
      )
      return updated
    })
  }

  const onError = () => {
    setToolCalls((prev) =>
      prev.map((tc) =>
        tc.status === 'running'
          ? { ...tc, status: 'error' as const, endTime: Date.now() }
          : tc
      )
    )
  }

  useEffect(() => {
    if (status === 'ready') {
      setToolCalls((prev) =>
        prev.map((tc) =>
          tc.status === 'running'
            ? { ...tc, status: 'completed' as const, endTime: Date.now() }
            : tc
        )
      )
    }
  }, [status])

  useEffect(() => {
    if (messages.length === 0) {
      setToolCalls([])
    }
  }, [messages.length])

  useEffect(() => {
    messages.forEach((message) => {
      if (message.role !== 'assistant') return

      const toolInvocations = (message as any).toolInvocations || []

      toolInvocations.forEach((invocation: any) => {
        const toolCallId = invocation.toolCallId
        if (
          invocation.state === 'result' &&
          toolCallId &&
          !processedToolResultsRef.current.has(toolCallId)
        ) {
          processedToolResultsRef.current.add(toolCallId)
          setToolCalls((prev) =>
            prev.map((tc) =>
              tc.id === toolCallId
                ? {
                    ...tc,
                    status: 'completed' as const,
                    result: invocation.result,
                    endTime: Date.now(),
                  }
                : tc
            )
          )
        }
      })

      const parts = (message as any).parts || []
      parts.forEach((part: any) => {
        const isToolResult =
          part?.type === 'tool-result' || part?.type === 'toolResult'
        if (
          isToolResult &&
          part.toolCallId &&
          !processedToolResultsRef.current.has(part.toolCallId)
        ) {
          processedToolResultsRef.current.add(part.toolCallId)
          setToolCalls((prev) =>
            prev.map((tc) =>
              tc.id === part.toolCallId
                ? {
                    ...tc,
                    status: 'completed' as const,
                    result: part.result,
                    endTime: Date.now(),
                  }
                : tc
            )
          )
        }
      })

      const experimental = (message as any).experimental_providerMetadata
      if (experimental?.toolResults) {
        experimental.toolResults.forEach((toolResult: any) => {
          const toolCallId = toolResult.toolCallId
          if (toolCallId && !processedToolResultsRef.current.has(toolCallId)) {
            processedToolResultsRef.current.add(toolCallId)
            setToolCalls((prev) =>
              prev.map((tc) =>
                tc.id === toolCallId
                  ? {
                      ...tc,
                      status: 'completed' as const,
                      result: toolResult.result || toolResult,
                      endTime: Date.now(),
                    }
                  : tc
              )
            )
          }
        })
      }
    })
  }, [messages, toolCalls])

  return {
    toolCalls,
    onToolCall,
    onToolResult,
    onError,
  }
}
