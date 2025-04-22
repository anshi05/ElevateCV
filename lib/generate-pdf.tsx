"use client"

import html2canvas from "html2canvas"
import jsPDF from "jspdf"

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

export const generatePDF = async (resume: ResumeData): Promise<void> => {
  // Create a temporary container for the resume
  const container = document.createElement("div")
  container.style.position = "absolute"
  container.style.left = "-9999px"
  container.style.top = "-9999px"
  container.style.width = "800px" // Fixed width for PDF
  document.body.appendChild(container)

  // Render the appropriate template based on resume.template
  const templateHTML = renderTemplate(resume)
  container.innerHTML = templateHTML

  try {
    // Wait for any fonts or images to load
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Use html2canvas to capture the rendered resume
    const canvas = await html2canvas(container, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      logging: false,
    })

    // Create PDF with A4 dimensions
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    // Calculate dimensions to fit the canvas to A4
    const imgData = canvas.toDataURL("image/png")
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    const canvasRatio = canvas.height / canvas.width
    const pdfRatio = pdfHeight / pdfWidth

    let finalWidth = pdfWidth
    let finalHeight = pdfWidth * canvasRatio

    // If the height exceeds the page, scale down
    if (finalHeight > pdfHeight) {
      finalHeight = pdfHeight
      finalWidth = pdfHeight / canvasRatio
    }

    // Center the image on the page
    const xOffset = (pdfWidth - finalWidth) / 2
    const yOffset = 0 // Start from the top

    // Add the image to the PDF
    pdf.addImage(imgData, "PNG", xOffset, yOffset, finalWidth, finalHeight)

    // Save the PDF
    const fileName = `${resume.title.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.pdf`
    pdf.save(fileName)
  } catch (error) {
    console.error("Error generating PDF:", error)
    throw error
  } finally {
    // Clean up the temporary container
    document.body.removeChild(container)
  }
}

// Helper function to render the template HTML
const renderTemplate = (resume: ResumeData): string => {
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

  // Common styles
  const styles = `
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        background-color: white;
      }
      h1, h2, h3 {
        margin: 0;
      }
      .section {
        margin-bottom: 20px;
      }
      .theme-color {
        color: ${themeColor};
      }
      .theme-border {
        border-color: ${themeColor};
      }
      .theme-bg {
        background-color: ${themeColor}20;
      }
    </style>
  `

  // Choose template based on resume.template
  switch (resume.template) {
    case "professional":
      return `
        <!DOCTYPE html>
        <html>
        <head>
          ${styles}
        </head>
        <body>
          <div class="container">
            <header style="text-align: center; margin-bottom: 24px;">
              <h1 style="font-size: 24px; font-weight: bold; color: ${themeColor};">
                ${resume.personalInfo.name || "Your Name"}
              </h1>
              <div style="font-size: 14px; margin-top: 8px;">
                ${resume.personalInfo.email ? `<span>${resume.personalInfo.email}</span>` : ""}
                ${resume.personalInfo.phone ? `<span> • ${resume.personalInfo.phone}</span>` : ""}
                ${resume.personalInfo.address ? `<span> • ${resume.personalInfo.address}</span>` : ""}
              </div>
            </header>

            ${
              resume.personalInfo.summary
                ? `
              <section class="section">
                <h2 style="font-size: 18px; font-weight: 600; border-bottom: 2px solid ${themeColor}; margin-bottom: 8px;">
                  Professional Summary
                </h2>
                <p style="font-size: 14px;">${resume.personalInfo.summary}</p>
              </section>
            `
                : ""
            }

            ${
              resume.experience.length > 0
                ? `
              <section class="section">
                <h2 style="font-size: 18px; font-weight: 600; border-bottom: 2px solid ${themeColor}; margin-bottom: 8px;">
                  Experience
                </h2>
                <div style="display: flex; flex-direction: column; gap: 16px;">
                  ${resume.experience
                    .map(
                      (exp) => `
                    <div>
                      <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <div>
                          <h3 style="font-weight: 500;">${exp.title || "Job Title"}</h3>
                          <p style="font-size: 14px;">
                            ${exp.company || "Company"}${exp.location ? `, ${exp.location}` : ""}
                          </p>
                        </div>
                        <p style="font-size: 14px;">
                          ${exp.startDate || "Start Date"} - ${exp.current ? "Present" : exp.endDate || "End Date"}
                        </p>
                      </div>
                      ${exp.description ? `<p style="font-size: 14px; margin-top: 4px;">${exp.description}</p>` : ""}
                    </div>
                  `,
                    )
                    .join("")}
                </div>
              </section>
            `
                : ""
            }

            ${
              resume.education.length > 0
                ? `
              <section class="section">
                <h2 style="font-size: 18px; font-weight: 600; border-bottom: 2px solid ${themeColor}; margin-bottom: 8px;">
                  Education
                </h2>
                <div style="display: flex; flex-direction: column; gap: 16px;">
                  ${resume.education
                    .map(
                      (edu) => `
                    <div>
                      <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <div>
                          <h3 style="font-weight: 500;">${edu.degree || "Degree"}</h3>
                          <p style="font-size: 14px;">
                            ${edu.institution || "Institution"}${edu.location ? `, ${edu.location}` : ""}
                          </p>
                        </div>
                        <p style="font-size: 14px;">
                          ${edu.startDate || "Start Date"} - ${edu.endDate || "End Date"}
                        </p>
                      </div>
                      ${edu.description ? `<p style="font-size: 14px; margin-top: 4px;">${edu.description}</p>` : ""}
                    </div>
                  `,
                    )
                    .join("")}
                </div>
              </section>
            `
                : ""
            }

            ${
              resume.skills.length > 0
                ? `
              <section class="section">
                <h2 style="font-size: 18px; font-weight: 600; border-bottom: 2px solid ${themeColor}; margin-bottom: 8px;">
                  Skills
                </h2>
                <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                  ${resume.skills
                    .map(
                      (skill) => `
                    <span style="font-size: 14px; padding: 4px 8px; border-radius: 4px; background-color: ${themeColor}20;">
                      ${skill.name}
                    </span>
                  `,
                    )
                    .join("")}
                </div>
              </section>
            `
                : ""
            }

            ${
              resume.projects.length > 0
                ? `
              <section class="section">
                <h2 style="font-size: 18px; font-weight: 600; border-bottom: 2px solid ${themeColor}; margin-bottom: 8px;">
                  Projects
                </h2>
                <div style="display: flex; flex-direction: column; gap: 16px;">
                  ${resume.projects
                    .map(
                      (project) => `
                    <div>
                      <h3 style="font-weight: 500;">${project.title || "Project Title"}</h3>
                      ${
                        project.technologies
                          ? `
                        <p style="font-size: 14px; font-style: italic;">
                          Technologies: ${project.technologies}
                        </p>
                      `
                          : ""
                      }
                      ${project.description ? `<p style="font-size: 14px; margin-top: 4px;">${project.description}</p>` : ""}
                      ${
                        project.link
                          ? `
                        <p style="font-size: 14px; margin-top: 4px;">
                          <a href="${project.link}" style="color: ${themeColor}; text-decoration: underline;">
                            Project Link
                          </a>
                        </p>
                      `
                          : ""
                      }
                    </div>
                  `,
                    )
                    .join("")}
                </div>
              </section>
            `
                : ""
            }
          </div>
        </body>
        </html>
      `

    case "modern":
      return `
        <!DOCTYPE html>
        <html>
        <head>
          ${styles}
        </head>
        <body>
          <div class="container">
            <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 24px;">
              <div style="background-color: ${themeColor}10; padding: 24px;">
                <div style="margin-bottom: 24px;">
                  <h1 style="font-size: 20px; font-weight: bold; color: ${themeColor};">
                    ${resume.personalInfo.name || "Your Name"}
                  </h1>
                </div>

                <div style="margin-bottom: 24px; font-size: 14px; display: flex; flex-direction: column; gap: 4px;">
                  ${resume.personalInfo.email ? `<p>${resume.personalInfo.email}</p>` : ""}
                  ${resume.personalInfo.phone ? `<p>${resume.personalInfo.phone}</p>` : ""}
                  ${resume.personalInfo.address ? `<p>${resume.personalInfo.address}</p>` : ""}
                </div>

                ${
                  resume.skills.length > 0
                    ? `
                  <div style="margin-bottom: 24px;">
                    <h2 style="font-size: 18px; font-weight: 600; color: ${themeColor}; margin-bottom: 8px;">
                      Skills
                    </h2>
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                      ${resume.skills
                        .map(
                          (skill) => `
                        <p style="font-size: 14px;">${skill.name}</p>
                      `,
                        )
                        .join("")}
                    </div>
                  </div>
                `
                    : ""
                }

                ${
                  resume.education.length > 0
                    ? `
                  <div style="margin-bottom: 24px;">
                    <h2 style="font-size: 18px; font-weight: 600; color: ${themeColor}; margin-bottom: 8px;">
                      Education
                    </h2>
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                      ${resume.education
                        .map(
                          (edu) => `
                        <div>
                          <h3 style="font-size: 14px; font-weight: 500;">${edu.degree || "Degree"}</h3>
                          <p style="font-size: 14px;">${edu.institution || "Institution"}</p>
                          <p style="font-size: 12px;">
                            ${edu.startDate || "Start Date"} - ${edu.endDate || "End Date"}
                          </p>
                        </div>
                      `,
                        )
                        .join("")}
                    </div>
                  </div>
                `
                    : ""
                }
              </div>

              <div style="padding: 24px;">
                ${
                  resume.personalInfo.summary
                    ? `
                  <section style="margin-bottom: 24px;">
                    <h2 style="font-size: 18px; font-weight: 600; color: ${themeColor}; margin-bottom: 8px;">
                      Professional Summary
                    </h2>
                    <p style="font-size: 14px;">${resume.personalInfo.summary}</p>
                  </section>
                `
                    : ""
                }

                ${
                  resume.experience.length > 0
                    ? `
                  <section style="margin-bottom: 24px;">
                    <h2 style="font-size: 18px; font-weight: 600; color: ${themeColor}; margin-bottom: 8px;">
                      Experience
                    </h2>
                    <div style="display: flex; flex-direction: column; gap: 16px;">
                      ${resume.experience
                        .map(
                          (exp) => `
                        <div>
                          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                            <div>
                              <h3 style="font-weight: 500;">${exp.title || "Job Title"}</h3>
                              <p style="font-size: 14px;">
                                ${exp.company || "Company"}${exp.location ? `, ${exp.location}` : ""}
                              </p>
                            </div>
                            <p style="font-size: 14px;">
                              ${exp.startDate || "Start Date"} - ${exp.current ? "Present" : exp.endDate || "End Date"}
                            </p>
                          </div>
                          ${exp.description ? `<p style="font-size: 14px; margin-top: 4px;">${exp.description}</p>` : ""}
                        </div>
                      `,
                        )
                        .join("")}
                    </div>
                  </section>
                `
                    : ""
                }

                ${
                  resume.projects.length > 0
                    ? `
                  <section style="margin-bottom: 24px;">
                    <h2 style="font-size: 18px; font-weight: 600; color: ${themeColor}; margin-bottom: 8px;">
                      Projects
                    </h2>
                    <div style="display: flex; flex-direction: column; gap: 16px;">
                      ${resume.projects
                        .map(
                          (project) => `
                        <div>
                          <h3 style="font-weight: 500;">${project.title || "Project Title"}</h3>
                          ${
                            project.technologies
                              ? `
                            <p style="font-size: 14px; font-style: italic;">
                              Technologies: ${project.technologies}
                            </p>
                          `
                              : ""
                          }
                          ${project.description ? `<p style="font-size: 14px; margin-top: 4px;">${project.description}</p>` : ""}
                          ${
                            project.link
                              ? `
                            <p style="font-size: 14px; margin-top: 4px;">
                              <a href="${project.link}" style="color: ${themeColor}; text-decoration: underline;">
                                Project Link
                              </a>
                            </p>
                          `
                              : ""
                          }
                        </div>
                      `,
                        )
                        .join("")}
                    </div>
                  </section>
                `
                    : ""
                }
              </div>
            </div>
          </div>
        </body>
        </html>
      `

    case "minimalist":
      return `
        <!DOCTYPE html>
        <html>
        <head>
          ${styles}
        </head>
        <body>
          <div class="container">
            <header style="margin-bottom: 32px;">
              <h1 style="font-size: 24px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px;">
                ${resume.personalInfo.name || "Your Name"}
              </h1>
              <div style="display: flex; flex-wrap: wrap; gap: 16px; margin-top: 8px; font-size: 14px;">
                ${resume.personalInfo.email ? `<span>${resume.personalInfo.email}</span>` : ""}
                ${resume.personalInfo.phone ? `<span>${resume.personalInfo.phone}</span>` : ""}
                ${resume.personalInfo.address ? `<span>${resume.personalInfo.address}</span>` : ""}
              </div>
            </header>

            ${
              resume.personalInfo.summary
                ? `
              <section style="margin-bottom: 24px;">
                <p style="font-size: 14px;">${resume.personalInfo.summary}</p>
              </section>
            `
                : ""
            }

            ${
              resume.skills.length > 0
                ? `
              <section style="margin-bottom: 24px;">
                <h2 style="font-size: 16px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; color: ${themeColor}; margin-bottom: 8px;">
                  Skills
                </h2>
                <div style="display: flex; flex-wrap: wrap; gap: 8px 8px;">
                  ${resume.skills
                    .map(
                      (skill, index) => `
                    <span style="font-size: 14px;">
                      ${skill.name}${index < resume.skills.length - 1 ? "," : ""}
                    </span>
                  `,
                    )
                    .join(" ")}
                </div>
              </section>
            `
                : ""
            }

            ${
              resume.experience.length > 0
                ? `
              <section style="margin-bottom: 24px;">
                <h2 style="font-size: 16px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; color: ${themeColor}; margin-bottom: 8px;">
                  Experience
                </h2>
                <div style="display: flex; flex-direction: column; gap: 16px;">
                  ${resume.experience
                    .map(
                      (exp) => `
                    <div>
                      <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <div>
                          <h3 style="font-weight: 500;">${exp.title || "Job Title"}</h3>
                          <p style="font-size: 14px;">
                            ${exp.company || "Company"}${exp.location ? `, ${exp.location}` : ""}
                          </p>
                        </div>
                        <p style="font-size: 14px;">
                          ${exp.startDate || "Start Date"} - ${exp.current ? "Present" : exp.endDate || "End Date"}
                        </p>
                      </div>
                      ${exp.description ? `<p style="font-size: 14px; margin-top: 4px;">${exp.description}</p>` : ""}
                    </div>
                  `,
                    )
                    .join("")}
                </div>
              </section>
            `
                : ""
            }

            ${
              resume.education.length > 0
                ? `
              <section style="margin-bottom: 24px;">
                <h2 style="font-size: 16px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; color: ${themeColor}; margin-bottom: 8px;">
                  Education
                </h2>
                <div style="display: flex; flex-direction: column; gap: 16px;">
                  ${resume.education
                    .map(
                      (edu) => `
                    <div>
                      <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <div>
                          <h3 style="font-weight: 500;">${edu.degree || "Degree"}</h3>
                          <p style="font-size: 14px;">
                            ${edu.institution || "Institution"}${edu.location ? `, ${edu.location}` : ""}
                          </p>
                        </div>
                        <p style="font-size: 14px;">
                          ${edu.startDate || "Start Date"} - ${edu.endDate || "End Date"}
                        </p>
                      </div>
                      ${edu.description ? `<p style="font-size: 14px; margin-top: 4px;">${edu.description}</p>` : ""}
                    </div>
                  `,
                    )
                    .join("")}
                </div>
              </section>
            `
                : ""
            }

            ${
              resume.projects.length > 0
                ? `
              <section style="margin-bottom: 24px;">
                <h2 style="font-size: 16px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; color: ${themeColor}; margin-bottom: 8px;">
                  Projects
                </h2>
                <div style="display: flex; flex-direction: column; gap: 16px;">
                  ${resume.projects
                    .map(
                      (project) => `
                    <div>
                      <h3 style="font-weight: 500;">${project.title || "Project Title"}</h3>
                      ${
                        project.technologies
                          ? `
                        <p style="font-size: 14px; font-style: italic;">
                          Technologies: ${project.technologies}
                        </p>
                      `
                          : ""
                      }
                      ${project.description ? `<p style="font-size: 14px; margin-top: 4px;">${project.description}</p>` : ""}
                      ${
                        project.link
                          ? `
                        <p style="font-size: 14px; margin-top: 4px;">
                          <a href="${project.link}" style="color: ${themeColor}; text-decoration: underline;">
                            Project Link
                          </a>
                        </p>
                      `
                          : ""
                      }
                    </div>
                  `,
                    )
                    .join("")}
                </div>
              </section>
            `
                : ""
            }
          </div>
        </body>
        </html>
      `

    default:
      return `<p>Template not found</p>`
  }
}
