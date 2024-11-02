'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PlusIcon, TrashIcon } from '@radix-ui/react-icons'

interface Education {
  institution: string;
  degree: string;
  year: string;
}

interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string;
}

interface Project {
  name: string;
  description: string;
  technologies: string;
}

export default function OnboardingPage() {
  const [educations, setEducations] = useState<Education[]>([{ institution: '', degree: '', year: '' }])
  const [experiences, setExperiences] = useState<Experience[]>([{ company: '', position: '', duration: '', description: '' }])
  const [skills, setSkills] = useState<string[]>([''])
  const [projects, setProjects] = useState<Project[]>([{ name: '', description: '', technologies: '' }])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log({ educations, experiences, skills, projects })
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
              <Input id="fullName" placeholder="John Doe" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" required />
            </div>
          </CardContent>
        </Card>

        <EducationSection educations={educations} setEducations={setEducations} />
        <ExperienceSection experiences={experiences} setExperiences={setExperiences} />
        <SkillsSection skills={skills} setSkills={setSkills} />
        <ProjectsSection projects={projects} setProjects={setProjects} />

        <Button type="submit" className="w-full">Save Profile</Button>
      </form>
    </div>
  )
}

interface EducationSectionProps {
  educations: Education[];
  setEducations: React.Dispatch<React.SetStateAction<Education[]>>;
}

function EducationSection({ educations, setEducations }: EducationSectionProps) {
  const addEducation = () => {
    setEducations([...educations, { institution: '', degree: '', year: '' }])
  }

  const removeEducation = (index: number) => {
    setEducations(educations.filter((_, i) => i !== index))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Education</CardTitle>
        <CardDescription>Add your educational background</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {educations.map((edu, index) => (
          <div key={index} className="space-y-2">
            <Input
              placeholder="Institution"
              value={edu.institution}
              onChange={(e) => {
                const newEducations = [...educations]
                newEducations[index].institution = e.target.value
                setEducations(newEducations)
              }}
            />
            <Input
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) => {
                const newEducations = [...educations]
                newEducations[index].degree = e.target.value
                setEducations(newEducations)
              }}
            />
            <Input
              placeholder="Year"
              value={edu.year}
              onChange={(e) => {
                const newEducations = [...educations]
                newEducations[index].year = e.target.value
                setEducations(newEducations)
              }}
            />
            {index > 0 && (
              <Button variant="destructive" size="icon" onClick={() => removeEducation(index)}>
                <TrashIcon className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        <Button onClick={addEducation} className="w-full">
          <PlusIcon className="mr-2 h-4 w-4" /> Add Education
        </Button>
      </CardContent>
    </Card>
  )
}

interface ExperienceSectionProps {
  experiences: Experience[];
  setExperiences: React.Dispatch<React.SetStateAction<Experience[]>>;
}

function ExperienceSection({ experiences, setExperiences }: ExperienceSectionProps) {
  const addExperience = () => {
    setExperiences([...experiences, { company: '', position: '', duration: '', description: '' }])
  }

  const removeExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Work Experience</CardTitle>
        <CardDescription>Add your relevant work experience</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {experiences.map((exp, index) => (
          <div key={index} className="space-y-2">
            <Input
              placeholder="Company"
              value={exp.company}
              onChange={(e) => {
                const newExperiences = [...experiences]
                newExperiences[index].company = e.target.value
                setExperiences(newExperiences)
              }}
            />
            <Input
              placeholder="Position"
              value={exp.position}
              onChange={(e) => {
                const newExperiences = [...experiences]
                newExperiences[index].position = e.target.value
                setExperiences(newExperiences)
              }}
            />
            <Input
              placeholder="Duration"
              value={exp.duration}
              onChange={(e) => {
                const newExperiences = [...experiences]
                newExperiences[index].duration = e.target.value
                setExperiences(newExperiences)
              }}
            />
            <Textarea
              placeholder="Description"
              value={exp.description}
              onChange={(e) => {
                const newExperiences = [...experiences]
                newExperiences[index].description = e.target.value
                setExperiences(newExperiences)
              }}
            />
            {index > 0 && (
              <Button variant="destructive" size="icon" onClick={() => removeExperience(index)}>
                <TrashIcon className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        <Button onClick={addExperience} className="w-full">
          <PlusIcon className="mr-2 h-4 w-4" /> Add Experience
        </Button>
      </CardContent>
    </Card>
  )
}

interface SkillsSectionProps {
  skills: string[];
  setSkills: React.Dispatch<React.SetStateAction<string[]>>;
}

function SkillsSection({ skills, setSkills }: SkillsSectionProps) {
  const addSkill = () => {
    setSkills([...skills, ''])
  }

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
        <CardDescription>List your technical skills</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {skills.map((skill, index) => (
          <div key={index} className="flex space-x-2">
            <Input
              placeholder="Skill"
              value={skill}
              onChange={(e) => {
                const newSkills = [...skills]
                newSkills[index] = e.target.value
                setSkills(newSkills)
              }}
            />
            {index > 0 && (
              <Button variant="destructive" size="icon" onClick={() => removeSkill(index)}>
                <TrashIcon className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        <Button onClick={addSkill} className="w-full">
          <PlusIcon className="mr-2 h-4 w-4" /> Add Skill
        </Button>
      </CardContent>
    </Card>
  )
}

interface ProjectsSectionProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

function ProjectsSection({ projects, setProjects }: ProjectsSectionProps) {
  const addProject = () => {
    setProjects([...projects, { name: '', description: '', technologies: '' }])
  }

  const removeProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Projects</CardTitle>
        <CardDescription>Showcase your coding projects</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {projects.map((project, index) => (
          <div key={index} className="space-y-2">
            <Input
              placeholder="Project Name"
              value={project.name}
              onChange={(e) => {
                const newProjects = [...projects]
                newProjects[index].name = e.target.value
                setProjects(newProjects)
              }}
            />
            <Textarea
              placeholder="Project Description"
              value={project.description}
              onChange={(e) => {
                const newProjects = [...projects]
                newProjects[index].description = e.target.value
                setProjects(newProjects)
              }}
            />
            <Input
              placeholder="Technologies Used"
              value={project.technologies}
              onChange={(e) => {
                const newProjects = [...projects]
                newProjects[index].technologies = e.target.value
                setProjects(newProjects)
              }}
            />
            {index > 0 && (
              <Button variant="destructive" size="icon" onClick={() => removeProject(index)}>
                <TrashIcon className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        <Button onClick={addProject} className="w-full">
          <PlusIcon className="mr-2 h-4 w-4" /> Add Project
        </Button>
      </CardContent>
    </Card>
  )
}