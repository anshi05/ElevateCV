"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FilePlus, LogOut, User, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { ResumeCard } from "@/components/resume-card"

interface Resume {
  id: string
  title: string
  template: string
  createdAt: string
  updatedAt: string
}

interface UserType {
  id: string
  name: string
  email: string
  resumes: Resume[]
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserType | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is logged in
    const currentUser = localStorage.getItem("currentUser")
    if (!currentUser) {
      router.push("/login")
      return
    }

    setUser(JSON.parse(currentUser))
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    })
    router.push("/login")
  }

  const handleCreateResume = () => {
    // Create a new resume
    const newResume = {
      id: Date.now().toString(),
      title: "Untitled Resume",
      template: "professional",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      personalInfo: {
        name: user?.name || "",
        email: user?.email || "",
        phone: "",
        address: "",
        summary: "",
      },
      experience: [],
      education: [],
      skills: [],
      projects: [],
      colorTheme: "blue",
    }

    // Update user's resumes
    const updatedUser = {
      ...user!,
      resumes: [...(user?.resumes || []), newResume],
    }

    // Update localStorage
    localStorage.setItem("currentUser", JSON.stringify(updatedUser))

    // Update users array
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const updatedUsers = users.map((u: any) => (u.id === user?.id ? updatedUser : u))
    localStorage.setItem("users", JSON.stringify(updatedUsers))

    // Set current resume
    localStorage.setItem("currentResume", JSON.stringify(newResume))

    // Redirect to editor
    router.push(`/editor/${newResume.id}`)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link className="flex items-center gap-2 text-lg font-semibold" href="/">
            <FileText className="h-5 w-5 text-primary" />
            <span>ElevateCV.io</span>
          </Link>
          <nav className="flex gap-4 sm:gap-6 items-center">
            {user && (
              <div
                className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium"
                title={user.name}
              >
                {user.name.charAt(0)}
              </div>
            )}
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Logout</span>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1 py-6 md:py-10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, {user?.name}</p>
              </div>
              <Button onClick={handleCreateResume} className="bg-primary hover:bg-primary/90 shadow-md">
                <FilePlus className="mr-2 h-4 w-4" />
                Create Resume
              </Button>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Your Resumes</h2>
              {user?.resumes && user.resumes.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {user.resumes.map((resume) => (
                    <ResumeCard key={resume.id} resume={resume} />
                  ))}
                </div>
              ) : (
                <Card className="border shadow-md">
                  <CardContent className="flex flex-col items-center justify-center p-10">
                    <div className="rounded-full bg-primary/10 p-4 mb-4">
                      <User className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium">No resumes yet</h3>
                    <p className="text-sm text-muted-foreground text-center mt-2 mb-6">
                      Create your first resume to get started
                    </p>
                    <Button className="bg-primary hover:bg-primary/90" onClick={handleCreateResume}>
                      <FilePlus className="mr-2 h-4 w-4" />
                      Create Resume
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
