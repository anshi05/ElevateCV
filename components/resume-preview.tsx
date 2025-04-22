"use client"

import { useRef } from "react"
import { ProfessionalTemplate } from "@/components/templates/professional-template"
import { ModernTemplate } from "@/components/templates/modern-template"
import { MinimalistTemplate } from "@/components/templates/minimalist-template"

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

interface ResumePreviewProps {
  resume: ResumeData | null
}

export function ResumePreview({ resume }: ResumePreviewProps) {
  const resumeRef = useRef<HTMLDivElement>(null)

  if (!resume) return null

  const renderTemplate = () => {
    switch (resume.template) {
      case "professional":
        return <ProfessionalTemplate resume={resume} />
      case "modern":
        return <ModernTemplate resume={resume} />
      case "minimalist":
        return <MinimalistTemplate resume={resume} />
      default:
        return <ProfessionalTemplate resume={resume} />
    }
  }

  return (
    <div ref={resumeRef} className="p-6 bg-white min-h-full">
      {renderTemplate()}
    </div>
  )
}
