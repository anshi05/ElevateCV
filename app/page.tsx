"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, FileText, Palette, Download, Eye, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Home() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { setTheme } = useTheme()

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      const token = localStorage.getItem("authToken")
      if (token) {
        setIsAuthenticated(true)
      }
    }

    checkAuth()
  }, [])

  const handleCreateResumeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isAuthenticated) {
      e.preventDefault()
      router.push('/dashboard') // Redirect to dashboard if authenticated
    }
    // If not authenticated, the default link behavior will proceed to /signup
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-muted/30">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Link className="flex items-center justify-center" href="/">
          <FileText className="h-6 w-6 text-primary mr-2" />
          <span className="font-bold text-xl">ElevateCV.io</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          {isAuthenticated ? (
            <Link className="text-sm font-medium hover:text-primary transition-colors" href="/dashboard">
              Dashboard
            </Link>
          ) : (
            <Link className="text-sm font-medium hover:text-primary transition-colors" href="/login">
              Login
            </Link>
          )}
          {!isAuthenticated && (
            <Link href="/signup">
              <Button variant="secondary" size="sm">
                Sign Up
              </Button>
            </Link>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                    Create Professional Resumes in Minutes
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Build standout resumes with our easy-to-use builder. Choose from professional templates, customize
                    your content, and download as PDF.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    size="lg"
                    className="gap-1.5 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
                    onClick={handleCreateResumeClick}
                  >
                    {isAuthenticated ? "Go to Dashboard" : "Create Resume"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/20 to-primary/40 blur-xl"></div>
                  <img
                    alt="Resume Builder Preview"
                    className="relative rounded-xl border shadow-xl"
                    height="310"
                    src="/home2.avif?height=620&width=450"
                    width="550"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Features</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to create a professional resume
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="grid gap-1 bg-background p-6 rounded-xl shadow-sm border">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Palette className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Multiple Templates</h3>
                </div>
                <p className="text-muted-foreground">
                  Choose from a variety of professional templates to match your style and industry.
                </p>
              </div>
              <div className="grid gap-1 bg-background p-6 rounded-xl shadow-sm border">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Eye className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Real-time Preview</h3>
                </div>
                <p className="text-muted-foreground">
                  See changes to your resume in real-time as you edit your information.
                </p>
              </div>
              <div className="grid gap-1 bg-background p-6 rounded-xl shadow-sm border">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Download className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">PDF Export</h3>
                </div>
                <p className="text-muted-foreground">Download your completed resume as a professional PDF document.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© 2023 ElevateCV.io. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}