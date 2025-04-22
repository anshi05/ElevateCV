"use client"

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

interface ProfessionalTemplateProps {
  resume: ResumeData
}

export function ProfessionalTemplate({ resume }: ProfessionalTemplateProps) {
  const getThemeColor = () => {
    switch (resume.colorTheme) {
      case "blue":
        return "#3b82f6"
      case "green":
        return "#10b981"
      case "purple":
        return "#8b5cf6"
      case "red":
        return "#ef4444"
      case "gray":
        return "#6b7280"
      default:
        return "#3b82f6"
    }
  }

  const themeColor = getThemeColor()

  return (
    <div className="font-sans max-w-[800px] mx-auto">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold" style={{ color: themeColor }}>
          {resume.personalInfo.name || "Your Name"}
        </h1>
        <div className="text-sm mt-2 space-x-2">
          {resume.personalInfo.email && <span>{resume.personalInfo.email}</span>}
          {resume.personalInfo.phone && (
            <>
              <span>•</span>
              <span>{resume.personalInfo.phone}</span>
            </>
          )}
          {resume.personalInfo.address && (
            <>
              <span>•</span>
              <span>{resume.personalInfo.address}</span>
            </>
          )}
        </div>
      </header>

      {resume.personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b-2 mb-2" style={{ borderColor: themeColor }}>
            Professional Summary
          </h2>
          <p className="text-sm">{resume.personalInfo.summary}</p>
        </section>
      )}

      {resume.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b-2 mb-2" style={{ borderColor: themeColor }}>
            Experience
          </h2>
          <div className="space-y-4">
            {resume.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{exp.title || "Job Title"}</h3>
                    <p className="text-sm">
                      {exp.company || "Company"}
                      {exp.location ? `, ${exp.location}` : ""}
                    </p>
                  </div>
                  <p className="text-sm">
                    {exp.startDate || "Start Date"} - {exp.current ? "Present" : exp.endDate || "End Date"}
                  </p>
                </div>
                {exp.description && <p className="text-sm mt-1">{exp.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {resume.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b-2 mb-2" style={{ borderColor: themeColor }}>
            Education
          </h2>
          <div className="space-y-4">
            {resume.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{edu.degree || "Degree"}</h3>
                    <p className="text-sm">
                      {edu.institution || "Institution"}
                      {edu.location ? `, ${edu.location}` : ""}
                    </p>
                  </div>
                  <p className="text-sm">
                    {edu.startDate || "Start Date"} - {edu.endDate || "End Date"}
                  </p>
                </div>
                {edu.description && <p className="text-sm mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {resume.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b-2 mb-2" style={{ borderColor: themeColor }}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill) => (
              <span key={skill.id} className="text-sm px-2 py-1 rounded" style={{ backgroundColor: `${themeColor}20` }}>
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {resume.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b-2 mb-2" style={{ borderColor: themeColor }}>
            Projects
          </h2>
          <div className="space-y-4">
            {resume.projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-medium">{project.title || "Project Title"}</h3>
                {project.technologies && <p className="text-sm italic">Technologies: {project.technologies}</p>}
                {project.description && <p className="text-sm mt-1">{project.description}</p>}
                {project.link && (
                  <p className="text-sm mt-1">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                      style={{ color: themeColor }}
                    >
                      Project Link
                    </a>
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
