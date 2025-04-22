"use client"

import type React from "react"

import { useState } from "react"
import { PlusCircle, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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

interface ResumeEditorProps {
  resume: ResumeData | null
  updateResume: (data: Partial<ResumeData>) => void
}

export function ResumeEditor({ resume, updateResume }: ResumeEditorProps) {
  const [newSkill, setNewSkill] = useState("")
  const [activeTab, setActiveTab] = useState("personal") // State to track the active tab

  if (!resume) return null

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    updateResume({
      personalInfo: {
        ...resume.personalInfo,
        [name]: value,
      },
    })
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateResume({ title: e.target.value })
  }

  const handleAddExperience = () => {
    const newExperience = {
      id: Date.now().toString(),
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    }
    updateResume({
      experience: [...resume.experience, newExperience],
    })
  }

  const handleExperienceChange = (id: string, field: string, value: string | boolean) => {
    const updatedExperience = resume.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    updateResume({ experience: updatedExperience })
  }

  const handleRemoveExperience = (id: string) => {
    const updatedExperience = resume.experience.filter((exp) => exp.id !== id)
    updateResume({ experience: updatedExperience })
  }

  const handleAddEducation = () => {
    const newEducation = {
      id: Date.now().toString(),
      degree: "",
      institution: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    }
    updateResume({
      education: [...resume.education, newEducation],
    })
  }

  const handleEducationChange = (id: string, field: string, value: string) => {
    const updatedEducation = resume.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    updateResume({ education: updatedEducation })
  }

  const handleRemoveEducation = (id: string) => {
    const updatedEducation = resume.education.filter((edu) => edu.id !== id)
    updateResume({ education: updatedEducation })
  }

  const handleAddSkill = () => {
    if (!newSkill.trim()) return

    const newSkillItem = {
      id: Date.now().toString(),
      name: newSkill,
    }
    updateResume({
      skills: [...resume.skills, newSkillItem],
    })
    setNewSkill("")
  }

  const handleRemoveSkill = (id: string) => {
    const updatedSkills = resume.skills.filter((skill) => skill.id !== id)
    updateResume({ skills: updatedSkills })
  }

  const handleAddProject = () => {
    const newProject = {
      id: Date.now().toString(),
      title: "",
      description: "",
      technologies: "",
      link: "",
    }
    updateResume({
      projects: [...resume.projects, newProject],
    })
  }

  const handleProjectChange = (id: string, field: string, value: string) => {
    const updatedProjects = resume.projects.map((project) =>
      project.id === id ? { ...project, [field]: value } : project,
    )
    updateResume({ projects: updatedProjects })
  }

  const handleRemoveProject = (id: string) => {
    const updatedProjects = resume.projects.filter((project) => project.id !== id)
    updateResume({ projects: updatedProjects })
  }

  return (
    <div className="space-y-4">
      <Tabs
        value={activeTab} // Controlled value for the active tab
        onValueChange={(value) => setActiveTab(value)} // Update state when a tab is clicked
        className="w-[400px]"
      >
        <TabsList>
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Resume Title</Label>
            <Input
              id="title"
              name="title"
              value={resume.title}
              onChange={handleTitleChange}
              placeholder="e.g., Software Developer Resume"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              value={resume.personalInfo.name}
              onChange={handlePersonalInfoChange}
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={resume.personalInfo.email}
              onChange={handlePersonalInfoChange}
              placeholder="john@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              value={resume.personalInfo.phone}
              onChange={handlePersonalInfoChange}
              placeholder="(123) 456-7890"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              value={resume.personalInfo.address}
              onChange={handlePersonalInfoChange}
              placeholder="City, State"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="summary">Professional Summary</Label>
            <Textarea
              id="summary"
              name="summary"
              value={resume.personalInfo.summary}
              onChange={handlePersonalInfoChange}
              placeholder="A brief summary of your professional background and goals"
              className="min-h-[100px]"
            />
          </div>
        </TabsContent>

        <TabsContent value="experience" className="space-y-4 mt-4">
          {resume.experience.map((exp) => (
            <Card key={exp.id} className="mb-4 border shadow-sm">
              <CardHeader className="flex flex-row items-start justify-between pb-2 space-y-0 bg-muted/30">
                <CardTitle className="text-sm font-medium">Work Experience</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-destructive"
                  onClick={() => handleRemoveExperience(exp.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor={`job-title-${exp.id}`}>Job Title</Label>
                  <Input
                    id={`job-title-${exp.id}`}
                    value={exp.title}
                    onChange={(e) => handleExperienceChange(exp.id, "title", e.target.value)}
                    placeholder="Software Developer"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`company-${exp.id}`}>Company</Label>
                  <Input
                    id={`company-${exp.id}`}
                    value={exp.company}
                    onChange={(e) => handleExperienceChange(exp.id, "company", e.target.value)}
                    placeholder="Acme Inc."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`location-${exp.id}`}>Location</Label>
                  <Input
                    id={`location-${exp.id}`}
                    value={exp.location}
                    onChange={(e) => handleExperienceChange(exp.id, "location", e.target.value)}
                    placeholder="City, State"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`start-date-${exp.id}`}>Start Date</Label>
                    <Input
                      id={`start-date-${exp.id}`}
                      value={exp.startDate}
                      onChange={(e) => handleExperienceChange(exp.id, "startDate", e.target.value)}
                      placeholder="MM/YYYY"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`end-date-${exp.id}`}>End Date</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id={`end-date-${exp.id}`}
                        value={exp.endDate}
                        onChange={(e) => handleExperienceChange(exp.id, "endDate", e.target.value)}
                        placeholder="MM/YYYY"
                        disabled={exp.current}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`current-${exp.id}`}
                    checked={exp.current}
                    onCheckedChange={(checked) => handleExperienceChange(exp.id, "current", checked)}
                  />
                  <Label htmlFor={`current-${exp.id}`}>Current Position</Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`description-${exp.id}`}>Description</Label>
                  <Textarea
                    id={`description-${exp.id}`}
                    value={exp.description}
                    onChange={(e) => handleExperienceChange(exp.id, "description", e.target.value)}
                    placeholder="Describe your responsibilities and achievements"
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
          <Button onClick={handleAddExperience} className="w-full bg-primary/90 hover:bg-primary">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Experience
          </Button>
        </TabsContent>

        <TabsContent value="education" className="space-y-4 mt-4">
          {resume.education.map((edu) => (
            <Card key={edu.id} className="mb-4 border shadow-sm">
              <CardHeader className="flex flex-row items-start justify-between pb-2 space-y-0 bg-muted/30">
                <CardTitle className="text-sm font-medium">Education</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-destructive"
                  onClick={() => handleRemoveEducation(edu.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                  <Input
                    id={`degree-${edu.id}`}
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(edu.id, "degree", e.target.value)}
                    placeholder="Bachelor of Science in Computer Science"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`institution-${edu.id}`}>Institution</Label>
                  <Input
                    id={`institution-${edu.id}`}
                    value={edu.institution}
                    onChange={(e) => handleEducationChange(edu.id, "institution", e.target.value)}
                    placeholder="University Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`edu-location-${edu.id}`}>Location</Label>
                  <Input
                    id={`edu-location-${edu.id}`}
                    value={edu.location}
                    onChange={(e) => handleEducationChange(edu.id, "location", e.target.value)}
                    placeholder="City, State"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`edu-start-date-${edu.id}`}>Start Date</Label>
                    <Input
                      id={`edu-start-date-${edu.id}`}
                      value={edu.startDate}
                      onChange={(e) => handleEducationChange(edu.id, "startDate", e.target.value)}
                      placeholder="MM/YYYY"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`edu-end-date-${edu.id}`}>End Date</Label>
                    <Input
                      id={`edu-end-date-${edu.id}`}
                      value={edu.endDate}
                      onChange={(e) => handleEducationChange(edu.id, "endDate", e.target.value)}
                      placeholder="MM/YYYY"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`edu-description-${edu.id}`}>Description</Label>
                  <Textarea
                    id={`edu-description-${edu.id}`}
                    value={edu.description}
                    onChange={(e) => handleEducationChange(edu.id, "description", e.target.value)}
                    placeholder="Relevant coursework, achievements, etc."
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
          <Button onClick={handleAddEducation} className="w-full bg-primary/90 hover:bg-primary">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Education
          </Button>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4 mt-4">
          <div className="flex space-x-2">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a skill (e.g., JavaScript, Project Management)"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleAddSkill()
                }
              }}
            />
            <Button onClick={handleAddSkill}>Add</Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {resume.skills.map((skill) => (
              <div key={skill.id} className="flex items-center bg-primary/10 px-3 py-1 rounded-full text-sm">
                {skill.name}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 ml-1"
                  onClick={() => handleRemoveSkill(skill.id)}
                >
                  <Trash2 className="h-3 w-3" />
                  <span className="sr-only">Remove</span>
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4 mt-4">
          {resume.projects.map((project) => (
            <Card key={project.id} className="mb-4 border shadow-sm">
              <CardHeader className="flex flex-row items-start justify-between pb-2 space-y-0 bg-muted/30">
                <CardTitle className="text-sm font-medium">Project</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-destructive"
                  onClick={() => handleRemoveProject(project.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor={`project-title-${project.id}`}>Project Title</Label>
                  <Input
                    id={`project-title-${project.id}`}
                    value={project.title}
                    onChange={(e) => handleProjectChange(project.id, "title", e.target.value)}
                    placeholder="E-commerce Website"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`project-description-${project.id}`}>Description</Label>
                  <Textarea
                    id={`project-description-${project.id}`}
                    value={project.description}
                    onChange={(e) => handleProjectChange(project.id, "description", e.target.value)}
                    placeholder="Describe the project and your role"
                    className="min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`project-technologies-${project.id}`}>Technologies Used</Label>
                  <Input
                    id={`project-technologies-${project.id}`}
                    value={project.technologies}
                    onChange={(e) => handleProjectChange(project.id, "technologies", e.target.value)}
                    placeholder="React, Node.js, MongoDB"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`project-link-${project.id}`}>Project Link</Label>
                  <Input
                    id={`project-link-${project.id}`}
                    value={project.link}
                    onChange={(e) => handleProjectChange(project.id, "link", e.target.value)}
                    placeholder="https://github.com/yourusername/project"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
          <Button onClick={handleAddProject} className="w-full bg-primary/90 hover:bg-primary">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Project
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  )
}
