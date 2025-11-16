import Image from 'next/image'

interface ToolResultRendererProps {
  toolName: string
  result: any
}

export function ToolResultRenderer({ toolName, result }: ToolResultRendererProps) {
  if (!result) return null

  if (result.pdf_data_url && toolName !== 'generatePitchDeck') {
    return (
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm font-medium text-gray-900 truncate">Document</div>
          <div className="text-xs text-gray-600 truncate">A PDF has been generated for download.</div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={result.pdf_data_url}
            download="document.pdf"
            className="inline-flex items-center px-2.5 py-1.5 rounded bg-gray-900 text-white hover:bg-gray-800"
          >
            Download PDF
          </a>
          <a
            href={result.pdf_data_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-2.5 py-1.5 rounded border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Preview
          </a>
        </div>
      </div>
    )
  }

  switch (toolName) {
    case 'generateBranding':
      return (
        <div className="flex items-center gap-3">
          {!!result?.branding?.logo && typeof result.branding.logo === 'string' ? (
            <Image
              src={result.branding.logo}
              alt={result.branding?.brand_name || 'Generated logo'}
              width={64}
              height={64}
              className="w-16 h-16 rounded border border-gray-200 object-contain bg-white"
            />
          ) : (
            <div className="w-16 h-16 rounded border border-dashed border-gray-300 flex items-center justify-center text-gray-400 bg-white">
              No logo
            </div>
          )}
          <div className="min-w-0">
            <div className="text-sm font-medium text-gray-900 truncate">
              {result?.branding?.brand_name || 'Brand name'}
            </div>
            <div className="text-xs text-gray-600 truncate">
              {result?.branding?.tagline || 'Tagline not available'}
            </div>
          </div>
        </div>
      )

    case 'generatePitchDeck':
      return (
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="text-sm font-medium text-gray-900 truncate">Pitch Deck</div>
            <div className="text-xs text-gray-600 truncate">A PDF has been generated for download.</div>
          </div>
          {result?.pdf_data_url ? (
            <div className="flex items-center gap-2">
              <a
                href={result.pdf_data_url}
                download="pitch-deck.pdf"
                className="inline-flex items-center px-2.5 py-1.5 rounded bg-gray-900 text-white hover:bg-gray-800"
              >
                Download PDF
              </a>
              <a
                href={result.pdf_data_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-2.5 py-1.5 rounded border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Preview
              </a>
            </div>
          ) : (
            <div className="text-xs text-gray-500">PDF not available</div>
          )}
        </div>
      )

    case 'storeLink':
      return (
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="text-sm font-medium text-gray-900 truncate">Store Link</div>
            <div className="text-xs text-gray-600 truncate">Your store is ready.</div>
          </div>
          {result?.store_url ? (
            <a
              href={result.store_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-2.5 py-1.5 rounded bg-gray-900 text-white hover:bg-gray-800"
            >
              Open Store
            </a>
          ) : null}
        </div>
      )

    case 'mailSetup':
      return (
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="text-sm font-medium text-gray-900 truncate">Assistant Inbox</div>
            <div className="text-xs text-gray-600 truncate">
              {result?.message || 'Inbox is being set up.'}
            </div>
          </div>
        </div>
      )

    case 'phoneassistant':
      return (
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="text-sm font-medium text-gray-900 truncate">Phone Assistant</div>
            <div className="text-xs text-gray-600 truncate">
              {result?.message || 'Phone assistant is being set up.'}
            </div>
            {result?.phone_number && (
              <div className="mt-1 text-sm font-mono text-blue-600 bg-blue-50 px-2 py-1 rounded border">
                {result.phone_number}
              </div>
            )}
          </div>
        </div>
      )

    case 'influencerSearch':
      return (
        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-900">Influencers</div>
          <div className="space-y-1">
            {Array.isArray(result?.influencers) ? (
              (result.influencers as any[]).slice(0, 5).map((inf, idx) => (
                <div key={idx} className="text-xs text-gray-700 truncate">
                  {inf.name || inf.handle || 'Influencer'}
                  {inf.platform ? ` • ${inf.platform}` : ''}
                </div>
              ))
            ) : (
              <div className="text-xs text-gray-600 whitespace-pre-wrap">
                {typeof result?.influencers === 'string'
                  ? result.influencers.slice(0, 500)
                  : 'No influencer data'}
              </div>
            )}
          </div>
        </div>
      )

    default:
      return (
        <>
          <span className="font-medium">Result:</span>{' '}
          {result.message || 'Completed successfully'}
        </>
      )
  }
}
