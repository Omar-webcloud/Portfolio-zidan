import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/admin/login")
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">Profile & Bio</h2>
          <p className="text-neutral-400 mb-4 text-sm">Update your main bio, role, and profile image.</p>
          <a href="/admin/profile" className="inline-block bg-white text-black font-medium px-4 py-2 rounded-md hover:bg-neutral-200 transition">
            Manage Profile
          </a>
        </div>
        
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">Projects</h2>
          <p className="text-neutral-400 mb-4 text-sm">Add, remove, or edit the projects shown on your portfolio.</p>
          <a href="/admin/projects" className="inline-block bg-white text-black font-medium px-4 py-2 rounded-md hover:bg-neutral-200 transition">
            Manage Projects
          </a>
        </div>
      </div>
    </div>
  )
}
