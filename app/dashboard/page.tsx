"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FilePlus, LogOut, User, FileText, Plus } from "lucide-react"

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

    const updatedUser = {
      ...user!,
      resumes: [...(user?.resumes || []), newResume],
    }

    localStorage.setItem("currentUser", JSON.stringify(updatedUser))
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const updatedUsers = users.map((u: any) => (u.id === user?.id ? updatedUser : u))
    localStorage.setItem("users", JSON.stringify(updatedUsers))
    localStorage.setItem("currentResume", JSON.stringify(newResume))
    router.push(`/editor/${newResume.id}`)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/20"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .hover-scale:hover {
          transform: scale(1.03);
          transition: transform 0.2s ease;
        }
        .hover-grow:hover {
          transform: scale(1.02);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
      `}</style>

      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 shadow-sm">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link className="flex items-center gap-2 text-lg font-semibold hover-scale" href="/">
            <FileText className="h-5 w-5 text-primary" />
            <span>ElevateCV.io</span>
          </Link>
          <nav className="flex gap-4 sm:gap-6 items-center">
            {user && (
              <div
                className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium hover-scale"
                title={user.name}
              >
                {user.name.charAt(0)}
              </div>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="hover:bg-primary/10 hover:text-primary"
            >
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Logout</span>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1 py-6 md:py-10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-8">
            {/* Header Section */}
            <div className="flex items-center justify-between animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, {user?.name}</p>
              </div>
              <Button 
                onClick={handleCreateResume} 
                className="bg-primary hover:bg-primary/90 shadow-md hover-grow"
              >
                <FilePlus className="mr-2 h-4 w-4" />
                Create Resume
              </Button>
            </div>

            {/* Resumes Section */}
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-xl font-semibold mb-4">Your Resumes</h2>
              {user?.resumes && user.resumes.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {user.resumes.map((resume, index) => (
                    <div 
                      key={resume.id} 
                      className="card-hover"
                      style={{ animationDelay: `${0.3 + (index * 0.1)}s` }}
                    >
                      <ResumeCard resume={resume} />
                    </div>
                  ))}
                </div>
              ) : (
                <Card className="border shadow-md hover-grow">
                  <CardContent className="flex flex-col items-center justify-center p-10 text-center">
                    <div className="rounded-full bg-primary/10 p-4 mb-4 animate-pulse">
                      <Plus className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium">No resumes yet</h3>
                    <p className="text-sm text-muted-foreground mt-2 mb-6">
                      Create your first resume to get started
                    </p>
                    <Button 
                      className="bg-primary hover:bg-primary/90 hover-scale" 
                      onClick={handleCreateResume}
                    >
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

      {/* Stats Section */}
      {user?.resumes && user.resumes.length > 0 && (
        <div className="bg-muted/50 py-8 border-t animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-background hover-grow">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold">{user.resumes.length}</div>
                  <p className="text-sm text-muted-foreground">Total Resumes</p>
                </CardContent>
              </Card>
              <Card className="bg-background hover-grow">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold">
                    {new Date(user.resumes[0]?.updatedAt).toLocaleDateString()}
                  </div>
                  <p className="text-sm text-muted-foreground">Last Updated</p>
                </CardContent>
              </Card>
              <Card className="bg-background hover-grow">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold">
                    {user.resumes.filter(r => r.template === 'professional').length}
                  </div>
                  <p className="text-sm text-muted-foreground">Professional Templates</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}