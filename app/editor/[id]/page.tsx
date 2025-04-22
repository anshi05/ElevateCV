"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Download, Save, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { ResumeEditor } from "@/components/resume-editor"
import { ResumePreview } from "@/components/resume-preview"
import { TemplateSelector } from "@/components/template-selector"
import { ColorThemeSelector } from "@/components/color-theme-selector"
import { generatePDF } from "@/lib/generate-pdf"

interface ResumeData {
  id: string
  title: string
  template: string
  personalInfo: {
    name: string
    email: string
    phone: string
    address: string
    summary: string
  }
  experience: Array<{
    id: string
    title: string
    company: string
    location: string
    startDate: string
    endDate: string
    current: boolean
    description: string
  }>
  education: Array<{
    id: string
    degree: string
    institution: string
    location: string
    startDate: string
    endDate: string
    description: string
  }>
  skills: Array<{
    id: string
    name: string
  }>
  projects: Array<{
    id: string
    title: string
    description: string
    technologies: string
    link: string
  }>
  colorTheme: string
  createdAt: string
  updatedAt: string
}

export default function EditorPage({ params }: { params: { id: string } }) {
  const [resume, setResume] = useState<ResumeData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [activeTab, setActiveTab] = useState("personal") // State to track the active tab
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is logged in
    const currentUser = localStorage.getItem("currentUser")
    if (!currentUser) {
      router.push("/login")
      return
    }

    // Get resume from localStorage
    const currentResume = localStorage.getItem("currentResume")
    if (!currentResume) {
      router.push("/dashboard")
      return
    }

    setResume(JSON.parse(currentResume))
    setLoading(false)
  }, [router])

  const handleSave = async () => {
    if (!resume) return

    setSaving(true)
    try {
      // Update resume
      const updatedResume = {
        ...resume,
        updatedAt: new Date().toISOString(),
      }

      // Get current user
      const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")

      // Update user's resumes
      const updatedResumes = currentUser.resumes.map((r: any) => (r.id === updatedResume.id ? updatedResume : r))

      const updatedUser = {
        ...currentUser,
        resumes: updatedResumes,
      }

      // Update localStorage
      localStorage.setItem("currentUser", JSON.stringify(updatedUser))
      localStorage.setItem("currentResume", JSON.stringify(updatedResume))

      // Update users array
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const updatedUsers = users.map((u: any) => (u.id === currentUser.id ? updatedUser : u))
      localStorage.setItem("users", JSON.stringify(updatedUsers))

      toast({
        title: "Resume saved",
        description: "Your resume has been saved successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error saving your resume. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleDownload = async () => {
    if (!resume) return

    setDownloading(true)
    try {
      await generatePDF(resume)

      toast({
        title: "Resume downloaded",
        description: "Your resume has been downloaded as a PDF.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error downloading your resume. Please try again.",
        variant: "destructive",
      })
    } finally {
      setDownloading(false)
    }
  }

  const updateResume = (updatedData: Partial<ResumeData>) => {
    if (!resume) return
    setResume({ ...resume, ...updatedData })
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
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => router.push("/dashboard")}>
              <FileText className="h-5 w-5 text-primary mr-2" />
              <span className="font-semibold">ElevateCV.io</span>
            </Button>
            <div className="text-sm font-medium">{resume?.title}</div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleSave} disabled={saving}>
              <Save className="mr-2 h-4 w-4" />
              {saving ? "Saving..." : "Save"}
            </Button>
            <Button
              size="sm"
              onClick={handleDownload}
              disabled={downloading}
              className="bg-primary hover:bg-primary/90"
            >
              <Download className="mr-2 h-4 w-4" />
              {downloading ? "Downloading..." : "Download PDF"}
            </Button>
            {resume?.personalInfo?.name && (
              <div
                className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium ml-2"
                title={resume.personalInfo.name}
              >
                {resume.personalInfo.name.charAt(0)}
              </div>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 md:p-6">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <TemplateSelector
                currentTemplate={resume?.template || "professional"}
                onSelectTemplate={(template) => updateResume({ template })}
              />
              <ColorThemeSelector
                currentTheme={resume?.colorTheme || "blue"}
                onSelectTheme={(colorTheme) => updateResume({ colorTheme })}
              />
            </div>
            <Tabs
              value={activeTab} // Controlled value for the active tab
              onValueChange={(value) => setActiveTab(value)} // Update state when a tab is clicked
              className="w-full"
            >
              {/* <TabsList className="grid grid-cols-5 w-full bg-muted/50">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
              </TabsList> */}
              <ResumeEditor resume={resume} updateResume={updateResume} />
            </Tabs>
          </div>
          <div className="border rounded-lg overflow-auto h-[calc(100vh-120px)] shadow-md bg-white">
            <ResumePreview resume={resume} />
          </div>
        </div>
      </main>
    </div>
  )
}
