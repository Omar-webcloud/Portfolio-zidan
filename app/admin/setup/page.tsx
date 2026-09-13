"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SetupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const res = await fetch("/api/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()

      if (res.ok) {
        setMessage("Admin created successfully! Redirecting to login...")
        setTimeout(() => {
          router.push("/admin/login")
        }, 2000)
      } else {
        setMessage(data.error || "Something went wrong")
      }
    } catch (error) {
      setMessage("Failed to connect to the server.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-neutral-900 p-8 rounded-xl border border-neutral-800 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-2 text-center">Initial Setup</h1>
        <p className="text-neutral-400 text-sm text-center mb-6">Create your master admin account.</p>
        
        {message && (
          <div className={`p-3 rounded-md mb-6 text-sm ${message.includes("success") ? "bg-green-900/30 text-green-300 border-green-800" : "bg-red-900/30 text-red-300 border-red-800"} border`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-1">Admin Email</label>
            <input 
              type="email" 
              required
              className="w-full bg-neutral-950 border border-neutral-800 rounded-md p-3 text-white focus:outline-none focus:border-neutral-500 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-1">Admin Password</label>
            <input 
              type="password" 
              required
              minLength={6}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-md p-3 text-white focus:outline-none focus:border-neutral-500 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-white text-black font-semibold rounded-md p-3 mt-4 hover:bg-neutral-200 transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Admin"}
          </button>
        </form>
      </div>
    </div>
  )
}
