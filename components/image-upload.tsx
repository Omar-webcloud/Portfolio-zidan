"use client"

import { CldUploadWidget } from "next-cloudinary"
import { UploadCloud, X } from "lucide-react"

interface ImageUploadProps {
  value: string
  onChange: (value: string) => void
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  return (
    <div className="space-y-4">
      {value && (
        <div className="relative w-40 h-40 rounded-lg overflow-hidden border border-neutral-800">
          <img src={value} alt="Upload" className="object-cover w-full h-full" />
          <button
            onClick={() => onChange("")}
            className="absolute top-2 right-2 bg-red-500/80 p-1 rounded-md text-white hover:bg-red-500 transition"
            type="button"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <CldUploadWidget 
        uploadPreset="portfolio" // You should create an upload preset in Cloudinary and put its name here, or omit if you use signed uploads.
        onSuccess={(result: any) => {
          onChange(result.info.secure_url)
        }}
      >
        {({ open }) => {
          return (
            <button
              type="button"
              onClick={() => open()}
              className="flex items-center gap-2 px-4 py-2 border border-neutral-700 rounded-md text-sm hover:bg-neutral-800 transition"
            >
              <UploadCloud size={16} />
              Upload Image
            </button>
          )
        }}
      </CldUploadWidget>
    </div>
  )
}
