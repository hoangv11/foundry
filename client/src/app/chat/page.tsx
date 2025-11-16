'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { useChat } from '@ai-sdk/react'
import {
  DefaultChatTransport,
  lastAssistantMessageIsCompleteWithToolCalls,
} from 'ai'
import { useUser } from '@clerk/nextjs'
import { useFileUpload } from '@/hooks/useFileUpload'
import { useToolCallTracking } from '@/hooks/useToolCallTracking'
import { ToolCallProgress } from '@/components/ToolCallProgress'
import { WelcomeScreen } from '@/components/chat/WelcomeScreen'
import { ChatMessage } from '@/components/chat/ChatMessage'
import { ChatInput } from '@/components/chat/ChatInput'

export default function ChatPage() {
  const [input, setInput] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const { user } = useUser()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const {
    files,
    setFiles,
    uploadedImageUrls,
    setUploadedImageUrls,
    isUploading,
    handleFileUpload,
    clearFiles,
  } = useFileUpload()

  const transport = useMemo(() => {
    return new DefaultChatTransport({
      api: '/api/chat',
      fetch: async (url, init) => {
        const body = JSON.parse((init?.body as string) || '{}')
        return fetch(url, {
          ...init,
          body: JSON.stringify({
            ...body,
            model: 'gemini-1.5-flash',
            userId: user?.id || null,
          }),
        })
      },
    })
  }, [user?.id])

  const { messages, sendMessage, status } = useChat({
    transport,
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
    async onToolCall({ toolCall }: any) {
      toolCallHandlers.onToolCall?.({ toolCall })
      if (toolCall?.dynamic) return
    },
  } as any)

  const toolCallHandlers = useToolCallTracking(messages, status)

  useEffect(() => {
    if (status === 'ready') {
      setIsThinking(false)
    }
  }, [status])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, status])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() && (!files || files.length === 0)) return

    setIsThinking(true)

    let imageUrls: string[] = []
    if (files && files.length > 0) {
      imageUrls = await handleFileUpload(files)
    }

    const messageText =
      input +
      (imageUrls.length > 0
        ? `\n\n[Images uploaded: ${imageUrls.length} image(s)]\nImage URLs: ${imageUrls.join(', ')}`
        : '')

    await sendMessage({
      role: 'user',
      parts: [{ type: 'text', text: messageText }],
    })

    setInput('')
    clearFiles()
  }

  const hasMessages = messages.length > 0

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {!hasMessages ? (
        <WelcomeScreen
          input={input}
          setInput={setInput}
          files={files}
          setFiles={setFiles}
          uploadedImageUrls={uploadedImageUrls}
          setUploadedImageUrls={setUploadedImageUrls}
          isUploading={isUploading}
          status={status}
          onSubmit={onSubmit}
        />
      ) : (
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}

            {toolCallHandlers.toolCalls.length > 0 && (
              <div className="flex gap-3 justify-start">
                <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 max-w-[80%]">
                  <ToolCallProgress toolCalls={toolCallHandlers.toolCalls} />
                </div>
              </div>
            )}

            {(isThinking || status === 'streaming') &&
              toolCallHandlers.toolCalls.length === 0 && (
                <div className="flex gap-3 justify-start">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2">
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div
                          className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                          style={{ animationDelay: '0ms' }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                          style={{ animationDelay: '150ms' }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                          style={{ animationDelay: '300ms' }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-700">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}

            <div ref={messagesEndRef} />
          </div>

          <ChatInput
            input={input}
            setInput={setInput}
            files={files}
            setFiles={setFiles}
            uploadedImageUrls={uploadedImageUrls}
            setUploadedImageUrls={setUploadedImageUrls}
            isUploading={isUploading}
            status={status}
            onSubmit={onSubmit}
          />
        </div>
      )}
    </div>
  )
}
