'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PlusIcon, TrashIcon } from '@radix-ui/react-icons'
import { UserInfo, WorkExperience, Education, Project, Skill } from '@/types/supabase-types'

export default function OnboardingPage() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    full_name: '',
    title: '',
    email: '',
    phone: '',
    github: '',
    linkedin: '',
    about_me: '',
  })
  const [educations, setEducations] = useState<Education[]>([{ degree: '', university: '', start_year: '', end_year: '', description: '' }])
  const [experiences, setExperiences] = useState<WorkExperience[]>([{ company: '', position: '', start_date: '', end_date: '', description: '' }])
  const [projects, setProjects] = useState<Project[]>([{ name: '', description: '', github_link: '', technologies: [] }])
  const [skills, setSkills] = useState<Skill[]>([{ name: '' }])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ userInfo, educations, experiences, projects, skills })
    // Send data to your backend or Supabase
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Create Your Developer Profile</h1>
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Enter your basic details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="John Doe"
                required
                value={userInfo.full_name}
                onChange={(e) => setUserInfo({ ...userInfo, full_name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                placeholder="Software Engineer"
                value={userInfo.title || ''}
                onChange={(e) => setUserInfo({ ...userInfo, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                required
                value={userInfo.email}
                onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                placeholder="123-456-7890"
                value={userInfo.phone || ''}
                onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="github">GitHub</Label>
              <Input
                id="github"
                placeholder="https://github.com/yourusername"
                value={userInfo.github || ''}
                onChange={(e) => setUserInfo({ ...userInfo, github: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                placeholder="https://linkedin.com/in/yourprofile"
                value={userInfo.linkedin || ''}
                onChange={(e) => setUserInfo({ ...userInfo, linkedin: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aboutMe">About Me</Label>
              <Textarea
                id="aboutMe"
                placeholder="Tell us about yourself..."
                value={userInfo.about_me || ''}
                onChange={(e) => setUserInfo({ ...userInfo, about_me: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        <EducationSection educations={educations} setEducations={setEducations} />
        <ExperienceSection experiences={experiences} setExperiences={setExperiences} />
        <ProjectSection projects={projects} setProjects={setProjects} />
        <SkillsSection skills={skills} setSkills={setSkills} />

        <Button type="submit" className="w-full">Save Profile</Button>
      </form>
    </div>
  )
}

function EducationSection({
  educations,
  setEducations,
}: {
  educations: Education[]
  setEducations: React.Dispatch<React.SetStateAction<Education[]>>
}) {
  const addEducation = () => {
    setEducations([...educations, { id: '', user_id: '', degree: '', university: '', start_year: '', end_year: '', description: '' }])
  }

  const removeEducation = (index: number) => {
    setEducations(educations.filter((_, i) => i !== index))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Education</CardTitle>
        <CardDescription>List your educational background</CardDescription>
      </CardHeader>
      <CardContent>
        {educations.map((edu, index) => (
          <div key={index} className="space-y-4 mb-4">
            <div className="space-y-2">
              <Label>Degree</Label>
              <Input
                placeholder="e.g., Bachelor of Science in Computer Science"
                value={edu.degree}
                onChange={(e) =>
                  setEducations(
                    educations.map((item, i) =>
                      i === index ? { ...item, degree: e.target.value } : item
                    )
                  )
                }
              />
            </div>
            <div className="space-y-2">
              <Label>University</Label>
              <Input
                placeholder="e.g., University of Technology"
                value={edu.university}
                onChange={(e) =>
                  setEducations(
                    educations.map((item, i) =>
                      i === index ? { ...item, university: e.target.value } : item
                    )
                  )
                }
              />
            </div>
            <div className="flex space-x-4">
              <div className="flex-1 space-y-2">
                <Label>Start Year</Label>
                <Input
                  placeholder="e.g., 2018"
                  value={edu.start_year}
                  onChange={(e) =>
                    setEducations(
                      educations.map((item, i) =>
                        i === index ? { ...item, start_year: e.target.value } : item
                      )
                    )
                  }
                />
              </div>
              <div className="flex-1 space-y-2">
                <Label>End Year</Label>
                <Input
                  placeholder="e.g., 2022"
                  value={edu.end_year || ""}
                  onChange={(e) =>
                    setEducations(
                      educations.map((item, i) =>
                        i === index ? { ...item, end_year: e.target.value } : item
                      )
                    )
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Optional details about your education"
                value={edu.description || ""}
                onChange={(e) =>
                  setEducations(
                    educations.map((item, i) =>
                      i === index ? { ...item, description: e.target.value } : item
                    )
                  )
                }
              />
            </div>
            <Button
              variant="destructive"
              onClick={() => removeEducation(index)}
              className="mt-2"
            >
              <TrashIcon className="mr-2 h-4 w-4" />
              Remove
            </Button>
          </div>
        ))}
        <Button variant="outline" onClick={addEducation} className="mt-4">
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Education
        </Button>
      </CardContent>
    </Card>
  )
}

function ExperienceSection({
  experiences,
  setExperiences,
}: {
  experiences: WorkExperience[]
  setExperiences: React.Dispatch<React.SetStateAction<WorkExperience[]>>
}) {
  const addExperience = () => {
    setExperiences([
      ...experiences,
      { id: '', user_id: '', company: '', position: '', start_date: '', end_date: '', description: '' },
    ])
  }

  const removeExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Work Experience</CardTitle>
        <CardDescription>Add your professional experience</CardDescription>
      </CardHeader>
      <CardContent>
        {experiences.map((exp, index) => (
          <div key={index} className="space-y-4 mb-4">
            <div className="space-y-2">
              <Label>Company</Label>
              <Input
                placeholder="e.g., Tech Innovators Inc."
                value={exp.company}
                onChange={(e) =>
                  setExperiences(
                    experiences.map((item, i) =>
                      i === index ? { ...item, company: e.target.value } : item
                    )
                  )
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Position</Label>
              <Input
                placeholder="e.g., Full Stack Developer"
                value={exp.position}
                onChange={(e) =>
                  setExperiences(
                    experiences.map((item, i) =>
                      i === index ? { ...item, position: e.target.value } : item
                    )
                  )
                }
              />
            </div>
            <div className="flex space-x-4">
              <div className="flex-1 space-y-2">
                <Label>Start Date</Label>
                <Input
                  placeholder="e.g., January 2023"
                  value={exp.start_date}
                  onChange={(e) =>
                    setExperiences(
                      experiences.map((item, i) =>
                        i === index ? { ...item, start_date: e.target.value } : item
                      )
                    )
                  }
                />
              </div>
              <div className="flex-1 space-y-2">
                <Label>End Date</Label>
                <Input
                  placeholder="e.g., December 2023 or Present"
                  value={exp.end_date || ""}
                  onChange={(e) =>
                    setExperiences(
                      experiences.map((item, i) =>
                        i === index ? { ...item, end_date: e.target.value } : item
                      )
                    )
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Describe your role and achievements"
                value={exp.description || ""}
                onChange={(e) =>
                  setExperiences(
                    experiences.map((item, i) =>
                      i === index ? { ...item, description: e.target.value } : item
                    )
                  )
                }
              />
            </div>
            <Button
              variant="destructive"
              onClick={() => removeExperience(index)}
              className="mt-2"
            >
              <TrashIcon className="mr-2 h-4 w-4" />
              Remove
            </Button>
          </div>
        ))}
        <Button variant="outline" onClick={addExperience} className="mt-4">
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Experience
        </Button>
      </CardContent>
    </Card>
  )
}

export function ProjectSection({
  projects,
  setProjects,
}: {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Projects</CardTitle>
        <CardDescription>Showcase your coding projects</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {projects.map((proj, index) => (
          <div key={index} className="flex flex-col space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1 space-y-2">
                <Label>Name</Label>
                <Input
                  placeholder="Project Name"
                  value={proj.name || ""}
                  onChange={(e) =>
                    setProjects(
                      projects.map((item, i) =>
                        i === index ? { ...item, name: e.target.value } : item
                      )
                    )
                  }
                />
              </div>
              <div className="flex-1 space-y-2">
                <Label>GitHub Link</Label>
                <Input
                  placeholder="e.g., https://github.com/project"
                  value={proj.github_link || ""}
                  onChange={(e) =>
                    setProjects(
                      projects.map((item, i) =>
                        i === index
                          ? { ...item, github_link: e.target.value }
                          : item
                      )
                    )
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Short description of the project"
                value={proj.description || ""}
                onChange={(e) =>
                  setProjects(
                    projects.map((item, i) =>
                      i === index
                        ? { ...item, description: e.target.value }
                        : item
                    )
                  )
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Technologies</Label>
              <Input
                placeholder="e.g., React, Node.js (comma-separated)"
                value={proj.technologies.join(", ") || ""}
                onChange={(e) =>
                  setProjects(
                    projects.map((item, i) =>
                      i === index
                        ? { ...item, technologies: e.target.value.split(",").map(tech => tech.trim()) }
                        : item
                    )
                  )
                }
              />
            </div>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() =>
                setProjects(projects.filter((_, i) => i !== index))
              }
            >
              Remove Project
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            setProjects([
              ...projects,
              { name: "", github_link: "", description: "", technologies: [] }, // Initialize technologies as an empty array
            ])
          }
        >
          Add Project
        </Button>
      </CardContent>
    </Card>
  );
}

export function SkillsSection({
  skills,
  setSkills,
}: {
  skills: Skill[];
  setSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
        <CardDescription>List your key technical skills</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {skills.map((skill, index) => (
          <div key={index} className="flex space-x-4">
            <div className="flex-1 space-y-2">
              <Label>Skill</Label>
              <Input
                placeholder="e.g., JavaScript"
                value={skill.name || ""}
                onChange={(e) =>
                  setSkills(
                    skills.map((item, i) =>
                      i === index ? { ...item, name: e.target.value } : item
                    )
                  )
                }
              />
            </div>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => setSkills(skills.filter((_, i) => i !== index))}
            >
              Remove Skill
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() => setSkills([...skills, { name: "" }])}
        >
          Add Skill
        </Button>
      </CardContent>
    </Card>
  );
}
