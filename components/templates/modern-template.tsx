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

interface ModernTemplateProps {
  resume: ResumeData
}

export function ModernTemplate({ resume }: ModernTemplateProps) {
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
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1" style={{ backgroundColor: `${themeColor}10` }}>
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold" style={{ color: themeColor }}>
                {resume.personalInfo.name || "Your Name"}
              </h1>
            </div>

            <div className="mb-6 space-y-1 text-sm">
              {resume.personalInfo.email && <p>{resume.personalInfo.email}</p>}
              {resume.personalInfo.phone && <p>{resume.personalInfo.phone}</p>}
              {resume.personalInfo.address && <p>{resume.personalInfo.address}</p>}
            </div>

            {resume.skills.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2" style={{ color: themeColor }}>
                  Skills
                </h2>
                <div className="space-y-1">
                  {resume.skills.map((skill) => (
                    <p key={skill.id} className="text-sm">
                      {skill.name}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {resume.education.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2" style={{ color: themeColor }}>
                  Education
                </h2>
                <div className="space-y-3">
                  {resume.education.map((edu) => (
                    <div key={edu.id}>
                      <h3 className="font-medium text-sm">{edu.degree || "Degree"}</h3>
                      <p className="text-sm">{edu.institution || "Institution"}</p>
                      <p className="text-xs">
                        {edu.startDate || "Start Date"} - {edu.endDate || "End Date"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="col-span-2 p-6">
          {resume.personalInfo.summary && (
            <section className="mb-6">
              <h2 className="text-lg font-semibold mb-2" style={{ color: themeColor }}>
                Professional Summary
              </h2>
              <p className="text-sm">{resume.personalInfo.summary}</p>
            </section>
          )}

          {resume.experience.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-semibold mb-2" style={{ color: themeColor }}>
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

          {resume.projects.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-semibold mb-2" style={{ color: themeColor }}>
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
      </div>
    </div>
  )
}
