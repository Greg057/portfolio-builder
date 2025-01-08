import { Card, CardContent } from "@/components/ui/card"
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

      </main>
    </div>
  )
}