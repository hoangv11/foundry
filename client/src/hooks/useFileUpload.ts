import { useState } from 'react'
import { uploadMultipleImages } from '@/lib/storage'

export function useFileUpload() {
  const [files, setFiles] = useState<FileList | undefined>(undefined)
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)

  const handleFileUpload = async (filesToUpload: FileList) => {
    if (!filesToUpload || filesToUpload.length === 0) return []

    setIsUploading(true)
    try {
      const uploadResults = await uploadMultipleImages(filesToUpload)
      const successfulUploads = uploadResults
        .filter((result) => result.url && !result.error)
        .map((result) => result.url)

      setUploadedImageUrls((prev) => [...prev, ...successfulUploads])
      return successfulUploads
    } catch (error) {
      console.error('Error uploading images:', error)
      return []
    } finally {
      setIsUploading(false)
    }
  }

  const clearFiles = () => {
    setFiles(undefined)
    setUploadedImageUrls([])
  }

  const removeUploadedImage = (index: number) => {
    setUploadedImageUrls((prev) => prev.filter((_, i) => i !== index))
  }

  return {
    files,
    setFiles,
    uploadedImageUrls,
    setUploadedImageUrls,
    isUploading,
    handleFileUpload,
    clearFiles,
    removeUploadedImage,
  }
}
