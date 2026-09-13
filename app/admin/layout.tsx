import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col md:flex-row">
      {session && (
        <aside className="w-full md:w-64 bg-neutral-900 border-r border-neutral-800 p-6 flex flex-col gap-6">
          <div className="font-bold text-xl tracking-tight">Admin Dashboard</div>
          <nav className="flex flex-col gap-2">
            <Link href="/admin" className="px-3 py-2 rounded-md hover:bg-neutral-800 transition">Overview</Link>
            <Link href="/admin/profile" className="px-3 py-2 rounded-md hover:bg-neutral-800 transition">Profile & Bio</Link>
            <Link href="/admin/projects" className="px-3 py-2 rounded-md hover:bg-neutral-800 transition">Projects</Link>
          </nav>
          <div className="mt-auto">
            <Link href="/" className="px-3 py-2 rounded-md hover:bg-neutral-800 transition block text-neutral-400">← Back to Site</Link>
            <Link href="/api/auth/signout" className="px-3 py-2 mt-2 rounded-md bg-red-900/30 text-red-400 hover:bg-red-900/50 transition block text-center">Sign Out</Link>
          </div>
        </aside>
      )}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
