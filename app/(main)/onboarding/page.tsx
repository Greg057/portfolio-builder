'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { UserInfo, WorkExperience, Education, Project, Skill } from '@/types/supabase-types'
import EducationSection from './EducationSection'
import UserInfoSection from './UserInfoSection'
import ExperienceSection from './ExperienceSection'
import ProjectSection from './ProjectSection'
import SkillsSection from './SkillSection'

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
        <UserInfoSection userInfo={userInfo} setUserInfo={setUserInfo} />
        <EducationSection educations={educations} setEducations={setEducations} />
        <ExperienceSection experiences={experiences} setExperiences={setExperiences} />
        <ProjectSection projects={projects} setProjects={setProjects} />
        <SkillsSection skills={skills} setSkills={setSkills} />

        <Button type="submit" className="w-full">Save Profile</Button>
      </form>
    </div>
  )
}








