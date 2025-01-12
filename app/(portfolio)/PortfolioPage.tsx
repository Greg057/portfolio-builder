import { Education, Project, UserInfo, Technology, WorkExperience } from '@/types/supabase-types'

interface PortfolioPageProps {
  UserInfoComponent: React.ComponentType<{ personalInfo: UserInfo }>
  WorkExperienceComponent: React.ComponentType<{ experiences: WorkExperience[] }>
  EducationComponent: React.ComponentType<{ education: Education[] }>
  ProjectsComponent: React.ComponentType<{ projects: Project[] }>
  UserSkillsComponent: React.ComponentType<{ userTechnologies: Technology[] }>
  personalInfo: UserInfo;
  education: Education[];
  experiences: WorkExperience[];
  projects: Project[];
  userTechnologies: Technology[];
}

export default function PortfolioPage({
  UserInfoComponent,
  WorkExperienceComponent,
  EducationComponent,
  ProjectsComponent,
  UserSkillsComponent,
  personalInfo,
  education,
  experiences,
  projects,
  userTechnologies
}: PortfolioPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted text-foreground">
      {personalInfo && (
        <UserInfoComponent personalInfo={personalInfo} />
      )} 

      {experiences && (
        <WorkExperienceComponent experiences={experiences} />
      )} 

      {education && (
        <EducationComponent education={education} />
      )} 

      {projects && (
        <ProjectsComponent projects={projects} />
      )} 

      {userTechnologies && (
        <UserSkillsComponent userTechnologies={userTechnologies} />
      )} 
    </div>
  )
}