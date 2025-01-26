import { Education, Project, UserInfo, Technology, WorkExperience } from '@/types/supabase-types'

interface PortfolioPageProps {
  UserInfoComponent: React.ComponentType<{ personalInfo: UserInfo }>
  EducationWorkComponent: React.ComponentType<{ education: Education[], experiences: WorkExperience[] }>
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
  EducationWorkComponent,
  ProjectsComponent,
  UserSkillsComponent,
  personalInfo,
  education,
  experiences,
  projects,
  userTechnologies
}: PortfolioPageProps) {
  return (
    <div className="container max-w-[750px] px-4 sm:px-6 md:px-8">
      {personalInfo && (
        <UserInfoComponent personalInfo={personalInfo}/>
      )} 

      {experiences && education && (
        <EducationWorkComponent education={education} experiences={experiences} />
      )} 

      {userTechnologies && (
        <UserSkillsComponent userTechnologies={userTechnologies} />
      )} 

      {projects && (
        <ProjectsComponent projects={projects} />
      )} 
    </div>
  )
}