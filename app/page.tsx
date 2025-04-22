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
  const { setTheme, theme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const checkAuth = () => {
      const user = localStorage.getItem("currentUser")
      if (user) {
        setIsAuthenticated(true)
      }
    }
    checkAuth()
  }, [])

  const handleCreateResumeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (isAuthenticated) {
      router.push('/dashboard')
    } else {
      router.push('/signup')
    }
  }

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Main Grid Background - Now more visible */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className={`absolute inset-0 ${
          theme === 'dark' 
            ? 'bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)]' 
            : 'bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)]'
        } bg-[size:40px_40px]`}></div>
      </div>

      {/* Gradient Overlay to soften the grid */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-b from-background/80 via-background/50 to-muted/30"></div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-pulse {
          animation: pulse 3s ease-in-out infinite;
        }
        .hover-scale:hover {
          transform: scale(1.03);
          transition: transform 0.3s ease;
        }
        .hover-rotate:hover {
          transform: rotate(5deg);
          transition: transform 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
      `}</style>

<header className="px-4 lg:px-6 h-16 flex items-center border-b bg-background/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full">
  <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
    <Link className="flex items-center justify-center hover-scale" href="/">
      <FileText className="h-6 w-6 text-primary mr-2" />
      <span className="font-bold text-xl">ElevateCV.io</span>
    </Link>
  </div>
  <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
    {isAuthenticated ? (
      <Link className="text-sm font-medium hover:text-primary transition-colors hover-scale" href="/dashboard">
        Dashboard
      </Link>
    ) : (
      <Link className="text-sm font-medium hover:text-primary transition-colors hover-scale" href="/login">
        Login
      </Link>
    )}
    {!isAuthenticated && (
      <div className="hover-scale">
        <Link href="/signup">
          <Button variant="secondary" size="sm">
            Sign Up
          </Button>
        </Link>
      </div>
    )}
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="hover-scale">
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
      
      <main className="flex-1 relative z-10">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative">
          {/* Section-specific grid pattern */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className={`absolute inset-0 ${
              theme === 'dark' 
                ? 'bg-[linear-gradient(45deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(-45deg,rgba(255,255,255,0.08)_1px,transparent_1px)]' 
                : 'bg-[linear-gradient(45deg,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(-45deg,rgba(0,0,0,0.05)_1px,transparent_1px)]'
            } bg-[size:60px_60px]`}></div>
          </div>
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 
                    className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 animate-fade-in"
                    style={{ animationDelay: '0.4s' }}
                  >
                    Create Professional Resumes in Minutes
                  </h1>
                  <p 
                    className="max-w-[600px] text-muted-foreground md:text-xl animate-fade-in"
                    style={{ animationDelay: '0.6s' }}
                  >
                    Build standout resumes with our easy-to-use builder. Choose from professional templates, customize
                    your content, and download as PDF.
                  </p>
                </div>
                <div 
                  className="flex flex-col gap-2 min-[400px]:flex-row animate-fade-in"
                  style={{ animationDelay: '0.8s' }}
                >
                  <Button
                    size="lg"
                    className="gap-1.5 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all hover-scale"
                    onClick={handleCreateResumeClick}
                  >
                    {isAuthenticated ? "Go to Dashboard" : "Create Resume"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/20 to-primary/40 blur-xl opacity-70 animate-pulse"></div>
                  <img
                    alt="Resume Builder Preview"
                    className="relative rounded-xl border shadow-xl hover-rotate transition-transform duration-300"
                    height="310"
                    src="/home2.avif?height=620&width=450"
                    width="550"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30 relative">
          {/* Different grid pattern for features */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className={`absolute inset-0 ${
              theme === 'dark' 
                ? 'bg-[radial-gradient(circle,rgba(255,255,255,0.08)_1px,transparent_1px)]' 
                : 'bg-[radial-gradient(circle,rgba(0,0,0,0.05)_1px,transparent_1px)]'
            } bg-[size:40px_40px]`}></div>
          </div>
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl animate-fade-in">Features</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed animate-fade-in">
                  Everything you need to create a professional resume
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="grid gap-1 bg-background p-6 rounded-xl shadow-sm border card-hover transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 rounded-full bg-primary/10 animate-float" style={{ animationDelay: '0.2s' }}>
                    <Palette className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Multiple Templates</h3>
                </div>
                <p className="text-muted-foreground">
                  Choose from a variety of professional templates to match your style and industry.
                </p>
              </div>
              <div className="grid gap-1 bg-background p-6 rounded-xl shadow-sm border card-hover transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 rounded-full bg-primary/10 animate-float" style={{ animationDelay: '0.4s' }}>
                    <Eye className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Real-time Preview</h3>
                </div>
                <p className="text-muted-foreground">
                  See changes to your resume in real-time as you edit your information.
                </p>
              </div>
              <div className="grid gap-1 bg-background p-6 rounded-xl shadow-sm border card-hover transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 rounded-full bg-primary/10 animate-float" style={{ animationDelay: '0.6s' }}>
                    <Download className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">PDF Export</h3>
                </div>
                <p className="text-muted-foreground">Download your completed resume as a professional PDF document.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonial Section */}
        <section className="w-full py-12 md:py-24 bg-gradient-to-b from-muted/30 to-background relative">
          {/* Dot grid pattern for testimonials */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className={`absolute inset-0 ${
              theme === 'dark' 
                ? 'bg-[radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)]' 
                : 'bg-[radial-gradient(circle,rgba(0,0,0,0.08)_1px,transparent_1px)]'
            } bg-[size:30px_30px]`}></div>
          </div>
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl animate-fade-in">Trusted by Professionals</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed animate-fade-in">
                Join thousands of users who landed their dream jobs with our resumes
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="relative h-64 md:h-96 rounded-xl overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/30 rounded-xl" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-6">
                    <blockquote className="text-xl md:text-2xl font-medium animate-fade-in" style={{ animationDelay: '0.2s' }}>
                      "ElevateCV helped me create a resume that got me interviews at top tech companies. The templates are modern and ATS-friendly."
                    </blockquote>
                    <div className="mt-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                      <div className="font-semibold">Sarah Johnson</div>
                      <div className="text-sm text-muted-foreground">Software Engineer at Google</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative h-64 md:h-96 rounded-xl overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-secondary/30 rounded-xl" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-6">
                    <blockquote className="text-xl md:text-2xl font-medium animate-fade-in" style={{ animationDelay: '0.3s' }}>
                      "I was able to customize my resume perfectly for different job applications. The real-time preview saved me so much time!"
                    </blockquote>
                    <div className="mt-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                      <div className="font-semibold">Michael Chen</div>
                      <div className="text-sm text-muted-foreground">Product Manager at Amazon</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-background/80 backdrop-blur-sm">
        <p className="text-xs text-muted-foreground animate-fade-in">
          © {new Date().getFullYear()} ElevateCV.io. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 hover-scale transition-transform" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 hover-scale transition-transform" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}