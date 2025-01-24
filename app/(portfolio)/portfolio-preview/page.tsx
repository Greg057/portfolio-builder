'use client'

import { useSearchParams } from 'next/navigation'
import PortfolioPage from '../PortfolioPage'

export default function PortfolioPreviewPage() {
  const searchParams = useSearchParams()
  
  const UserInfoComponentName = searchParams.get('UserInfoComponent')
  const WorkExperienceComponentName = searchParams.get('WorkExperienceComponent')
  const EducationComponentName = searchParams.get('EducationComponent')
  const ProjectsComponentName = searchParams.get('ProjectsComponent')
  const UserSkillsComponentName = searchParams.get('UserSkillsComponent')

  const UserInfoComponent = require(`../(components)/userInfo/${UserInfoComponentName}`).default
  const WorkExperienceComponent = require(`../(components)/experiences/${WorkExperienceComponentName}`).default
  const EducationComponent = require(`../(components)/education/${EducationComponentName}`).default
  const ProjectsComponent = require(`../(components)/projects/${ProjectsComponentName}`).default
  const UserSkillsComponent = require(`../(components)/skills/${UserSkillsComponentName}`).default

  const personalInfo = JSON.parse(searchParams.get('personalInfo') || '{}')
  const education = JSON.parse(searchParams.get('education') || '[]')
  const experiences = JSON.parse(searchParams.get('experiences') || '[]')
  const projects = JSON.parse(searchParams.get('projects') || '[]')
  const userTechnologies = JSON.parse(searchParams.get('userTechnologies') || '[]')

  return (
    <>
      {personalInfo && education && experiences && projects && userTechnologies && (
        <PortfolioPage
          UserInfoComponent={UserInfoComponent}
          WorkExperienceComponent={WorkExperienceComponent}
          EducationComponent={EducationComponent}
          ProjectsComponent={ProjectsComponent}
          UserSkillsComponent={UserSkillsComponent}
          personalInfo={personalInfo}
          education={education}
          experiences={experiences}
          projects={projects}
          userTechnologies={userTechnologies}
        />
      )}
    </>
  );
}
