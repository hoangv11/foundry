import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowUp, Loader2, Paperclip, X } from 'lucide-react'
import Image from 'next/image'

interface WelcomeScreenProps {
  input: string
  setInput: (value: string) => void
  files: FileList | undefined
  setFiles: (files: FileList | undefined) => void
  uploadedImageUrls: string[]
  setUploadedImageUrls: (urls: string[] | ((prev: string[]) => string[])) => void
  isUploading: boolean
  status: string
  onSubmit: (e: React.FormEvent) => void
}

export function WelcomeScreen({
  input,
  setInput,
  files,
  setFiles,
  uploadedImageUrls,
  setUploadedImageUrls,
  isUploading,
  status,
  onSubmit,
}: WelcomeScreenProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 overflow-y-auto">
      <div className="w-full max-w-2xl mx-auto mb-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            How can I help you today?
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Ask me anything about your business, data analysis, or get general
            assistance.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
            <button
              onClick={() =>
                setInput(
                  "Set up a new Shopify store called 'My Fashion Store' and generate all the legal documents"
                )
              }
              className="p-3 text-left bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="font-medium text-gray-900">Set up a store</div>
              <div className="text-sm text-gray-600">Products</div>
            </button>
            <button
              onClick={() =>
                setInput(
                  'Create a complete e-commerce setup with inventory and payment configuration'
                )
              }
              className="p-3 text-left bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="font-medium text-gray-900">Full setup</div>
              <div className="text-sm text-gray-600">
                Store + Docs + ADs + Video
              </div>
            </button>
          </div>
        </div>

        <div className="bg-gray-50 rounded-md border border-gray-200 shadow-sm p-3">
          <form onSubmit={onSubmit} className="space-y-4">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => {
                if (event.target.files) {
                  setFiles(event.target.files)
                }
              }}
              multiple
              ref={fileInputRef}
            />

            {files && files.length > 0 && (
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-700">
                  {isUploading ? 'Uploading images...' : 'Ready to upload:'}
                </div>
                <div className="flex flex-wrap gap-2">
                  {Array.from(files).map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-blue-50 text-blue-800 px-3 py-1 rounded-lg text-sm border border-blue-200"
                    >
                      <span className="truncate max-w-32">{file.name}</span>
                      {isUploading && <Loader2 className="h-3 w-3 animate-spin" />}
                      <button
                        type="button"
                        onClick={() => {
                          const dt = new DataTransfer()
                          Array.from(files).forEach((f, i) => {
                            if (i !== index) dt.items.add(f)
                          })
                          setFiles(dt.files.length > 0 ? dt.files : undefined)
                        }}
                        className="text-blue-600 hover:text-blue-800"
                        disabled={isUploading}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {uploadedImageUrls.length > 0 && (
              <div className="space-y-2">
                <div className="text-sm font-medium text-green-700">
                  Uploaded images:
                </div>
                <div className="flex flex-wrap gap-2">
                  {uploadedImageUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <Image
                        src={url}
                        alt={`Uploaded image ${index + 1}`}
                        width={64}
                        height={64}
                        className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setUploadedImageUrls((prev) =>
                            prev.filter((_, i) => i !== index)
                          )
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-3">
              <Input
                type="text"
                placeholder="e.g., 'Analyze my Shopify sales data' or 'Help me with business insights'"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={status === 'streaming'}
                className="border-0 bg-transparent p-0 text-lg placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 h-10 shadow-none"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                >
                  <Paperclip className="h-4 w-4" />
                  Attach files
                </Button>
              </div>

              <Button
                type="submit"
                size="sm"
                disabled={
                  (!input.trim() && (!files || files.length === 0)) ||
                  status === 'streaming'
                }
                className="h-8 w-8 p-0 rounded-full bg-gray-900 text-white hover:bg-gray-800 disabled:bg-gray-300"
              >
                {status === 'streaming' ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ArrowUp className="h-4 w-4" />
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
