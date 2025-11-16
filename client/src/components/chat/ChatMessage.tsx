import * as React from 'react'
import { cn } from '@/lib/utils'
import { MarkdownContent } from './MarkdownContent'
import { LegalDocsDisplay } from '@/components/LegalDocsDisplay'

interface ChatMessageProps {
  message: any
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={cn(
        'flex gap-3',
        message.role === 'user' ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={cn(
          'max-w-[80%] rounded-lg px-4 py-2',
          message.role === 'user'
            ? 'bg-gray-900 text-white'
            : 'bg-gray-50 text-gray-900 border border-gray-200'
        )}
      >
        {(message.parts ?? []).map((part: any, i: number) => {
          switch (part?.type) {
            case 'text': {
              const text = part.text || ''
              return message.role === 'user' ? (
                <p key={i} className="text-sm whitespace-pre-wrap">
                  {text}
                </p>
              ) : (
                <MarkdownContent key={i}>{text}</MarkdownContent>
              )
            }
            case 'tool-generateLegalDocs': {
              const callId = part.toolCallId
              console.log('Legal docs tool part:', part)
              switch (part.state) {
                case 'input-streaming':
                  return (
                    <div key={callId} className="text-sm text-gray-600">
                      Preparing legal docs...
                    </div>
                  )
                case 'input-available':
                  return (
                    <div key={callId} className="text-sm text-gray-700">
                      Generating legal documents...
                    </div>
                  )
                case 'output-available': {
                  const docs =
                    part.output?.docs || part.output?.output?.docs || []
                  const pdfs =
                    part.output?.pdfs || part.output?.output?.pdfs || []
                  console.log('Legal docs output:', docs)
                  console.log('Legal docs PDFs:', pdfs)
                  if (!Array.isArray(docs) || docs.length === 0) {
                    console.log('No docs found in output')
                    return null
                  }
                  return (
                    <div key={callId} className="mt-2">
                      <LegalDocsDisplay docs={docs} pdfs={pdfs} />
                    </div>
                  )
                }
                case 'output-error':
                  return (
                    <div key={callId} className="text-sm text-red-600">
                      {part.errorText || 'Failed to generate legal documents.'}
                    </div>
                  )
              }
              return null
            }
            case 'tool-phoneassistant': {
              const callId = part.toolCallId
              switch (part.state) {
                case 'input-streaming':
                  return (
                    <div key={callId} className="text-sm text-gray-600">
                      Setting up phone assistant...
                    </div>
                  )
                case 'input-available':
                  return (
                    <div key={callId} className="text-sm text-gray-700">
                      Configuring phone assistant...
                    </div>
                  )
                case 'output-available': {
                  const result = part.output || part.output?.output || {}
                  return (
                    <div
                      key={callId}
                      className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm font-medium text-blue-900">
                          Phone Assistant Ready
                        </span>
                      </div>
                      <div className="text-sm text-blue-800 mb-2">
                        {result.message ||
                          'Your customer phone assistant is ready!'}
                      </div>
                      {result.phone_number && (
                        <div className="text-lg font-mono text-blue-900 bg-white px-3 py-2 rounded border border-blue-300">
                          📞 {result.phone_number}
                        </div>
                      )}
                    </div>
                  )
                }
                case 'output-error':
                  return (
                    <div key={callId} className="text-sm text-red-600">
                      {part.errorText || 'Failed to set up phone assistant.'}
                    </div>
                  )
              }
              return null
            }
            case 'dynamic-tool': {
              const callId = part.toolCallId || i
              if (part.toolName === 'generateLegalDocs') {
                switch (part.state) {
                  case 'input-streaming':
                    return (
                      <div key={callId} className="text-sm text-gray-600">
                        Preparing legal docs...
                      </div>
                    )
                  case 'input-available':
                    return (
                      <div key={callId} className="text-sm text-gray-700">
                        Generating legal documents...
                      </div>
                    )
                  case 'output-available': {
                    const docs =
                      part.output?.docs || part.output?.output?.docs || []
                    if (!Array.isArray(docs) || docs.length === 0) return null
                    return (
                      <div key={callId} className="mt-2">
                        <LegalDocsDisplay docs={docs} />
                      </div>
                    )
                  }
                  case 'output-error':
                    return (
                      <div key={callId} className="text-sm text-red-600">
                        {part.errorText || 'Failed to generate legal documents.'}
                      </div>
                    )
                }
              }
              if (part.toolName === 'phoneassistant') {
                switch (part.state) {
                  case 'input-streaming':
                    return (
                      <div key={callId} className="text-sm text-gray-600">
                        Setting up phone assistant...
                      </div>
                    )
                  case 'input-available':
                    return (
                      <div key={callId} className="text-sm text-gray-700">
                        Configuring phone assistant...
                      </div>
                    )
                  case 'output-available': {
                    const result = part.output || part.output?.output || {}
                    return (
                      <div
                        key={callId}
                        className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm font-medium text-blue-900">
                            Phone Assistant Ready
                          </span>
                        </div>
                        <div className="text-sm text-blue-800 mb-2">
                          {result.message ||
                            'Your customer phone assistant is ready!'}
                        </div>
                        {result.phone_number && (
                          <div className="text-lg font-mono text-blue-900 bg-white px-3 py-2 rounded border border-blue-300">
                            📞 {result.phone_number}
                          </div>
                        )}
                      </div>
                    )
                  }
                  case 'output-error':
                    return (
                      <div key={callId} className="text-sm text-red-600">
                        {part.errorText || 'Failed to set up phone assistant.'}
                      </div>
                    )
                }
              }
              return null
            }
            default:
              return <React.Fragment key={i}></React.Fragment>
          }
        })}
      </div>
    </div>
  )
}
