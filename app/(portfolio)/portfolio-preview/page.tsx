'use client'

import { useSearchParams } from 'next/navigation'

export default function PortfolioPage() {
  const searchParams = useSearchParams()
  
  const UserInfoComponentName = searchParams.get('UserInfoComponent')
  const WorkExperienceComponentName = searchParams.get('WorkExperienceComponent')
  const EducationComponentName = searchParams.get('EducationComponent')
  const ProjectsComponentName = searchParams.get('ProjectsComponent')
  const UserSkillsComponentName = searchParams.get('UserSkillsComponent')

  const UserInfoComponent = require(`./userInfo/${UserInfoComponentName}`).default
  const WorkExperienceComponent = require(`./experiences/${WorkExperienceComponentName}`).default
  const EducationComponent = require(`./education/${EducationComponentName}`).default
  const ProjectsComponent = require(`./projects/${ProjectsComponentName}`).default
  const UserSkillsComponent = require(`./skills/${UserSkillsComponentName}`).default

  const personalInfo = JSON.parse(searchParams.get('personalInfo') || '{}')
  const education = JSON.parse(searchParams.get('education') || '[]')
  const experiences = JSON.parse(searchParams.get('experiences') || '[]')
  const projects = JSON.parse(searchParams.get('projects') || '[]')
  const userTechnologies = JSON.parse(searchParams.get('userTechnologies') || '[]')

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <section id="hero">
        {personalInfo && (
          <UserInfoComponent personalInfo={personalInfo}/>
        )}
      </section>
      <section id="work">
        {experiences && (
          <WorkExperienceComponent experiences={experiences}/>
        )} 
      </section>
      <section id="education">
        {education && (
          <EducationComponent education={education}/>
        )} 
      </section>
      <section id="skills">
        {userTechnologies && (
          <UserSkillsComponent userTechnologies={userTechnologies}/>
        )}
      </section>
      <section id="projects">
        {projects && (
          <ProjectsComponent projects={projects}/>
        )} 
      </section>
    </main>
  )
}
