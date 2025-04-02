'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import PortfolioPage from '../PortfolioPage'

function PortfolioPreviewContent() {
  const searchParams = useSearchParams()

  const UserInfoComponentName = searchParams.get('UserInfoComponent')
  const EducationWorkComponentName = searchParams.get('EducationWorkComponent')
  const ProjectsComponentName = searchParams.get('ProjectsComponent')
  const UserSkillsComponentName = searchParams.get('UserSkillsComponent')

  const UserInfoComponent = require(`../(components)/userInfo/${UserInfoComponentName}`).default
  const EducationWorkComponent = require(`../(components)/educationWork/${EducationWorkComponentName}`).default
  const ProjectsComponent = require(`../(components)/projects/${ProjectsComponentName}`).default
  const UserSkillsComponent = require(`../(components)/skills/${UserSkillsComponentName}`).default

  const personalInfo = JSON.parse(searchParams.get('personalInfo') || '{}')
  const education = JSON.parse(searchParams.get('education') || '[]')
  const experiences = JSON.parse(searchParams.get('experiences') || '[]')
  const projects = JSON.parse(searchParams.get('projects') || '[]')
  const userTechnologies = JSON.parse(searchParams.get('userTechnologies') || '[]')

  return (
    <PortfolioPage
      UserInfoComponent={UserInfoComponent}
      EducationWorkComponent={EducationWorkComponent}
      ProjectsComponent={ProjectsComponent}
      UserSkillsComponent={UserSkillsComponent}
      personalInfo={personalInfo}
      education={education}
      experiences={experiences}
      projects={projects}
      userTechnologies={userTechnologies}
    />
  )
}

export default function PortfolioPreviewPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PortfolioPreviewContent />
    </Suspense>
  )
}
