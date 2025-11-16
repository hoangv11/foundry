import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowUp, Loader2, Paperclip, X } from 'lucide-react'
import Image from 'next/image'

interface ChatInputProps {
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

export function ChatInput({
  input,
  setInput,
  files,
  setFiles,
  uploadedImageUrls,
  setUploadedImageUrls,
  isUploading,
  status,
  onSubmit,
}: ChatInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="flex-shrink-0 border-t border-gray-200 bg-white p-4 pb-6">
      <form onSubmit={onSubmit} className="space-y-3">
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

        <div className="flex gap-2 items-center">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="border-gray-300 text-gray-600 hover:bg-gray-50"
          >
            <Paperclip className="h-4 w-4" />
          </Button>

          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={status === 'streaming'}
            className="flex-1 border-gray-200 focus:border-gray-400 focus:ring-gray-400"
          />

          <Button
            type="submit"
            disabled={
              (!input.trim() && (!files || files.length === 0)) ||
              status === 'streaming'
            }
            className="bg-gray-900 hover:bg-gray-800 text-white"
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
  )
}
