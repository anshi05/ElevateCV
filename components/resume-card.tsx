"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Edit, MoreVertical, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

interface Resume {
  id: string
  title: string
  template: string
  createdAt: string
  updatedAt: string
}

interface ResumeCardProps {
  resume: Resume
}

export function ResumeCard({ resume }: ResumeCardProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isDeleting, setIsDeleting] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const handleEdit = () => {
    // Set current resume
    localStorage.setItem("currentResume", JSON.stringify(resume))
    router.push(`/editor/${resume.id}`)
  }

  const handleDelete = () => {
    setIsDeleting(true)
    try {
      // Get current user
      const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")

      // Filter out the resume
      const updatedResumes = currentUser.resumes.filter((r: Resume) => r.id !== resume.id)

      // Update current user
      const updatedUser = {
        ...currentUser,
        resumes: updatedResumes,
      }
      localStorage.setItem("currentUser", JSON.stringify(updatedUser))

      // Update users array
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const updatedUsers = users.map((u: any) => (u.id === currentUser.id ? updatedUser : u))
      localStorage.setItem("users", JSON.stringify(updatedUsers))

      toast({
        title: "Resume deleted",
        description: "Your resume has been deleted successfully.",
      })

      // Force refresh
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error deleting your resume. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Card className="border shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 bg-muted/30">
        <CardTitle className="text-sm font-medium">{resume.title}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleEdit}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              <Trash className="mr-2 h-4 w-4" />
              {isDeleting ? "Deleting..." : "Delete"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="text-xs text-muted-foreground space-y-1">
          <p>Template: {resume.template.charAt(0).toUpperCase() + resume.template.slice(1)}</p>
          <p>Created: {formatDate(resume.createdAt)}</p>
          <p>Last updated: {formatDate(resume.updatedAt)}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full" onClick={handleEdit}>
          <Edit className="mr-2 h-4 w-4" />
          Edit Resume
        </Button>
      </CardFooter>
    </Card>
  )
}
