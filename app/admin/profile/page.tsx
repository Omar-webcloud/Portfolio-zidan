"use client"

import { useState, useEffect } from "react"
import { ImageUpload } from "@/components/image-upload"

export default function ProfilePage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    bio: "",
    profileImage: "",
    heroImage: "",
    aboutText: "",
    email: "",
    linkedin: "",
    instagram: "",
    dribbble: "",
    behance: ""
  })

  useEffect(() => {
    fetch("/api/profile")
      .then(res => res.json())
      .then(data => {
        if (data.profile) {
          setFormData({
            name: data.profile.name || "",
            role: data.profile.role || "",
            bio: data.profile.bio || "",
            profileImage: data.profile.profileImage || "",
            heroImage: data.profile.heroImage || "",
            aboutText: data.profile.aboutText || "",
            email: data.profile.email || "",
            linkedin: data.profile.linkedin || "",
            instagram: data.profile.instagram || "",
            dribbble: data.profile.dribbble || "",
            behance: data.profile.behance || ""
          })
        }
        setLoading(false)
      })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage("")

    const res = await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })

    setSaving(false)

    if (res.ok) {
      setMessage("Profile saved successfully!")
      setTimeout(() => setMessage(""), 3000)
    } else {
      setMessage("Error saving profile.")
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Profile & Bio</h1>

      {message && (
        <div className={`p-4 rounded-md mb-6 text-sm ${message.includes("Error") ? "bg-red-900/30 text-red-300 border border-red-800" : "bg-green-900/30 text-green-300 border border-green-800"}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl space-y-4">
          <h2 className="text-xl font-semibold mb-4 border-b border-neutral-800 pb-2">Basic Info</h2>
          
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-1">Name</label>
            <input 
              type="text" 
              className="w-full bg-neutral-950 border border-neutral-800 rounded-md p-3 text-white focus:outline-none focus:border-neutral-500"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-1">Role / Title</label>
            <input 
              type="text" 
              className="w-full bg-neutral-950 border border-neutral-800 rounded-md p-3 text-white focus:outline-none focus:border-neutral-500"
              value={formData.role}
              onChange={e => setFormData({ ...formData, role: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-1">Short Bio</label>
            <textarea 
              rows={3}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-md p-3 text-white focus:outline-none focus:border-neutral-500"
              value={formData.bio}
              onChange={e => setFormData({ ...formData, bio: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-1">Extended About Text</label>
            <textarea 
              rows={5}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-md p-3 text-white focus:outline-none focus:border-neutral-500"
              value={formData.aboutText}
              onChange={e => setFormData({ ...formData, aboutText: e.target.value })}
            />
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl space-y-4">
          <h2 className="text-xl font-semibold mb-4 border-b border-neutral-800 pb-2">Images</h2>
          
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">Profile Image</label>
            <ImageUpload 
              value={formData.profileImage}
              onChange={(url) => setFormData({ ...formData, profileImage: url })}
            />
          </div>
          
          <div className="pt-4">
            <label className="block text-sm font-medium text-neutral-400 mb-2">Hero / Banner Image (optional)</label>
            <ImageUpload 
              value={formData.heroImage}
              onChange={(url) => setFormData({ ...formData, heroImage: url })}
            />
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl space-y-4">
          <h2 className="text-xl font-semibold mb-4 border-b border-neutral-800 pb-2">Contact & Socials</h2>
          
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-1">Primary Email Address</label>
            <input 
              type="email" 
              className="w-full bg-neutral-950 border border-neutral-800 rounded-md p-3 text-white focus:outline-none focus:border-neutral-500"
              value={formData.email}
              placeholder="hello@example.com"
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-1">LinkedIn URL</label>
            <input 
              type="url" 
              className="w-full bg-neutral-950 border border-neutral-800 rounded-md p-3 text-white focus:outline-none focus:border-neutral-500"
              value={formData.linkedin}
              placeholder="https://linkedin.com/in/..."
              onChange={e => setFormData({ ...formData, linkedin: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-1">Instagram URL</label>
            <input 
              type="url" 
              className="w-full bg-neutral-950 border border-neutral-800 rounded-md p-3 text-white focus:outline-none focus:border-neutral-500"
              value={formData.instagram}
              placeholder="https://instagram.com/..."
              onChange={e => setFormData({ ...formData, instagram: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-1">Dribbble URL</label>
            <input 
              type="url" 
              className="w-full bg-neutral-950 border border-neutral-800 rounded-md p-3 text-white focus:outline-none focus:border-neutral-500"
              value={formData.dribbble}
              placeholder="https://dribbble.com/..."
              onChange={e => setFormData({ ...formData, dribbble: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-1">Behance URL</label>
            <input 
              type="url" 
              className="w-full bg-neutral-950 border border-neutral-800 rounded-md p-3 text-white focus:outline-none focus:border-neutral-500"
              value={formData.behance}
              placeholder="https://behance.net/..."
              onChange={e => setFormData({ ...formData, behance: e.target.value })}
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={saving}
          className="bg-white text-black font-semibold rounded-md px-6 py-3 hover:bg-neutral-200 transition disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  )
}
