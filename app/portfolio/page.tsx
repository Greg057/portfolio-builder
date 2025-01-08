'use client'

import { useSearchParams } from 'next/navigation'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Education, Project, UserInfo, Technology, WorkExperience } from '@/types/supabase-types'

// Default Components as placeholders
const DefaultUserInfoComponent = ({ personalInfo }: { personalInfo: UserInfo }) => (
  <div>{personalInfo?.about_me}</div>
)
const DefaultWorkExperienceComponent = ({ experiences }: { experiences: WorkExperience[] }) => (
  <div>{experiences.map(exp => <div key={exp.id}>{exp.company}</div>)}</div>
)
const DefaultEducationComponent = ({ education }: { education: Education[] }) => (
  <div>{education.map(edu => <div key={edu.id}>{edu.university}</div>)}</div>
)
const DefaultProjectsComponent = ({ projects }: { projects: Project[] }) => (
  <div>{projects.map(proj => <div key={proj.id}>{proj.name}</div>)}</div>
)
const DefaultUserSkillsComponent = ({ userTechnologies }: { userTechnologies: Technology[] }) => (
  <div>{userTechnologies.map(tech => <div key={tech.id}>{tech.name}</div>)}</div>
)

export default function PortfolioPage() {
  const searchParams = useSearchParams()
  
  const UserInfoComponentName = searchParams.get('UserInfoComponent') || 'DefaultUserInfoComponent'
  const WorkExperienceComponentName = searchParams.get('WorkExperienceComponent') || 'DefaultWorkExperienceComponent'
  const EducationComponentName = searchParams.get('EducationComponent') || 'DefaultEducationComponent'
  const ProjectsComponentName = searchParams.get('ProjectsComponent') || 'DefaultProjectsComponent'
  const UserSkillsComponentName = searchParams.get('UserSkillsComponent') || 'DefaultUserSkillsComponent'

  // Dynamically import components based on the query parameters
  const UserInfoComponent = require(`./userInfo/${UserInfoComponentName}`).default || DefaultUserInfoComponent
  const WorkExperienceComponent = require(`./experiences/${WorkExperienceComponentName}`).default || DefaultWorkExperienceComponent
  const EducationComponent = require(`./education/${EducationComponentName}`).default || DefaultEducationComponent
  const ProjectsComponent = require(`./projects/${ProjectsComponentName}`).default || DefaultProjectsComponent
  const UserSkillsComponent = require(`./skills/${UserSkillsComponentName}`).default || DefaultUserSkillsComponent

  const personalInfo = JSON.parse(searchParams.get('personalInfo') || '{}')
  const education = JSON.parse(searchParams.get('education') || '[]')
  const experiences = JSON.parse(searchParams.get('experiences') || '[]')
  const projects = JSON.parse(searchParams.get('projects') || '[]')
  const userTechnologies = JSON.parse(searchParams.get('userTechnologies') || '[]')

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted text-foreground">
      {personalInfo && (
        <UserInfoComponent personalInfo={personalInfo}/>
      )} 

      <main className="container mx-auto px-4 py-12">
        <section id="about" className="mb-20">
          <h2 className="text-3xl font-bold mb-8">About Me</h2>
          <Card className="bg-card">
            <CardContent className="prose prose-lg dark:prose-invert">
              <p>{personalInfo?.about_me}</p>
            </CardContent>
          </Card>
        </section>

        {experiences && (
          <WorkExperienceComponent experiences={experiences}/>
        )} 

        {education && (
          <EducationComponent education={education}/>
        )} 

        {projects && (
          <ProjectsComponent projects={projects}/>
        )} 

        {userTechnologies && (
          <UserSkillsComponent userTechnologies={userTechnologies}/>
        )} 

      </main>
    </div>
  )
}
