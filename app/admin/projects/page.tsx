"use client"

import { useState, useEffect } from "react"
import { ImageUpload } from "@/components/image-upload"
import { Pencil, Trash2, Plus } from "lucide-react"

type Project = {
  id: string
  title: string
  description: string
  imageUrl: string | null
  link: string | null
  repoUrl: string | null
  tags: string[]
  order: number
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState<string | null>(null)
  
  const [formData, setFormData] = useState<Partial<Project>>({
    title: "",
    description: "",
    imageUrl: "",
    link: "",
    repoUrl: "",
    tags: [],
    order: 0
  })

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    setLoading(true)
    const res = await fetch("/api/projects")
    const data = await res.json()
    if (data.projects) setProjects(data.projects)
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return
    
    await fetch(`/api/projects?id=${id}`, { method: "DELETE" })
    fetchProjects()
  }

  const handleEdit = (project: Project) => {
    setFormData(project)
    setIsEditing(project.id)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      let res;
      if (isEditing && isEditing !== "new") {
        res = await fetch("/api/projects", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: isEditing, ...formData })
        })
      } else {
        res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        })
      }
      
      const data = await res.json()
      if (!res.ok) {
        alert("Failed to save project: " + (data.error || "Unknown error"))
        return
      }

      setIsEditing(null)
      setFormData({
        title: "", description: "", imageUrl: "", link: "", repoUrl: "", tags: [], order: 0
      })
      fetchProjects()
    } catch (err) {
      alert("Network error. Check console.")
      console.error(err)
    }
  }

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsArray = e.target.value.split(",").map(t => t.trim()).filter(Boolean)
    setFormData({ ...formData, tags: tagsArray })
  }

  if (loading) return <div>Loading projects...</div>

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing("new")}
            className="flex items-center gap-2 bg-white text-black font-semibold px-4 py-2 rounded-md hover:bg-neutral-200 transition"
          >
            <Plus size={18} /> Add Project
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl space-y-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 border-b border-neutral-800 pb-2">
            {isEditing === "new" ? "New Project" : "Edit Project"}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-1">Title</label>
              <input required type="text" className="w-full bg-neutral-950 border border-neutral-800 rounded-md p-3 text-white focus:outline-none focus:border-neutral-500"
                value={formData.title || ""} onChange={e => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-1">Order (Sort index)</label>
              <input type="number" className="w-full bg-neutral-950 border border-neutral-800 rounded-md p-3 text-white focus:outline-none focus:border-neutral-500"
                value={formData.order || 0} onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) })}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-1">Description</label>
            <textarea required rows={3} className="w-full bg-neutral-950 border border-neutral-800 rounded-md p-3 text-white focus:outline-none focus:border-neutral-500"
              value={formData.description || ""} onChange={e => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-1">Live Demo URL</label>
              <input type="url" className="w-full bg-neutral-950 border border-neutral-800 rounded-md p-3 text-white focus:outline-none focus:border-neutral-500"
                value={formData.link || ""} onChange={e => setFormData({ ...formData, link: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-1">Repository URL</label>
              <input type="url" className="w-full bg-neutral-950 border border-neutral-800 rounded-md p-3 text-white focus:outline-none focus:border-neutral-500"
                value={formData.repoUrl || ""} onChange={e => setFormData({ ...formData, repoUrl: e.target.value })}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-1">Tags (Comma separated)</label>
            <input type="text" placeholder="React, Next.js, Tailwind..." className="w-full bg-neutral-950 border border-neutral-800 rounded-md p-3 text-white focus:outline-none focus:border-neutral-500"
              value={formData.tags?.join(", ") || ""} onChange={handleTagsChange}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">Project Image</label>
            <ImageUpload 
              value={formData.imageUrl || ""}
              onChange={(url) => setFormData({ ...formData, imageUrl: url })}
            />
          </div>

          <div className="flex gap-4 pt-4 border-t border-neutral-800">
            <button type="submit" className="bg-white text-black font-semibold rounded-md px-6 py-2 hover:bg-neutral-200 transition">
              Save Project
            </button>
            <button type="button" onClick={() => setIsEditing(null)} className="bg-neutral-800 text-white font-semibold rounded-md px-6 py-2 hover:bg-neutral-700 transition">
              Cancel
            </button>
          </div>
        </form>
      ) : null}

      <div className="grid grid-cols-1 gap-4">
        {projects.length === 0 && !isEditing && (
          <div className="text-center py-10 text-neutral-500 bg-neutral-900 border border-neutral-800 rounded-xl">
            No projects found. Add one to get started!
          </div>
        )}
        
        {projects.map(project => (
          <div key={project.id} className="bg-neutral-900 border border-neutral-800 p-5 rounded-xl flex gap-6 items-center">
            <div className="w-32 h-24 bg-neutral-950 rounded-md overflow-hidden flex-shrink-0">
              {project.imageUrl ? (
                <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-neutral-600 text-xs">No image</div>
              )}
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p className="text-neutral-400 text-sm line-clamp-2 mt-1">{project.description}</p>
              <div className="flex gap-2 mt-3">
                {project.tags?.map((tag, i) => (
                  <span key={i} className="text-xs bg-neutral-800 text-neutral-300 px-2 py-1 rounded-md">{tag}</span>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <button onClick={() => handleEdit(project)} className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-md transition" title="Edit">
                <Pencil size={18} />
              </button>
              <button onClick={() => handleDelete(project.id)} className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded-md transition" title="Delete">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
