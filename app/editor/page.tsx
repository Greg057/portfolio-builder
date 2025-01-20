'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { EyeIcon, SaveIcon } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import UserInfo1 from '../(portfolio)/(components)/userInfo/UserInfo1'
import UserInfo2 from '../(portfolio)/(components)/userInfo/UserInfo2'
import Experiences1 from '../(portfolio)/(components)/experiences/Experiences1'
import Education1 from '../(portfolio)/(components)/education/Education1'
import Education2 from '../(portfolio)/(components)/education/Education2'
import Projects1 from '../(portfolio)/(components)/projects/Projects1'
import Skills1 from '../(portfolio)/(components)/skills/Skills1'
import Link from 'next/link'
import { Education, Project, UserInfo, Technology, WorkExperience } from '@/types/supabase-types'
import PortfolioPage from '../(portfolio)/PortfolioPage'
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog"
import AuthModal from './components/AuthModal'
import DeployButton from './components/DeployButton'
import Education3 from '../(portfolio)/(components)/education/Education3'
import Education4 from '../(portfolio)/(components)/education/Education4'
import Experiences2 from '../(portfolio)/(components)/experiences/Experiences2'
import UserInfo3 from '../(portfolio)/(components)/userInfo/UserInfo3'
import Experiences3 from '../(portfolio)/(components)/experiences/Experiences3'
import Education5 from '../(portfolio)/(components)/education/Education5'
import Projects2 from '../(portfolio)/(components)/projects/Projects2'
import Skills2 from '../(portfolio)/(components)/skills/Skills2'
import { fetchConfig, getUserTechNames, handleSave } from './utils/helpers'
import { fetchUserData } from './utils/userData'

const userInfoComponents = [UserInfo1, UserInfo2, UserInfo3]
const workExperienceComponents = [Experiences1, Experiences2, Experiences3]
const educationComponents = [Education1, Education2, Education3, Education4, Education5]
const projectsComponents = [Projects1, Projects2]
const userSkillsComponents = [Skills1, Skills2]

const sections = [
  { name: 'User Info', key: 'userInfo', components: userInfoComponents },
  { name: 'Work Experience', key: 'workExperience', components: workExperienceComponents },
  { name: 'Education', key: 'education', components: educationComponents },
  { name: 'Projects', key: 'projects', components: projectsComponents },
  { name: 'User Skills', key: 'userSkills', components: userSkillsComponents },
]

export default function PortfolioEditor() {
  const [personalInfo, setPersonalInfo] = useState<UserInfo>();
  const [education, setEducation] = useState<Education[]>([]);
  const [experiences, setExperiences] = useState<WorkExperience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [userTechnologies, setUserTechnologies] = useState<Technology[]>([]);
  const [selectedComponents, setSelectedComponents] = useState({
    userInfo: UserInfo1,
    workExperience: Experiences1,
    education: Education1,
    projects: Projects1,
    userSkills: Skills1,
  })

  const handleComponentChange = (section: string, componentName: string) => {
    const componentList = sections.find(s => s.key === section)?.components || []
    const selectedComponent = componentList.find(c => c.name === componentName) || componentList[0]
    setSelectedComponents(prev => ({ ...prev, [section]: selectedComponent }))
  }

  useEffect(() => {
  
    const fetchData = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      const userSessionData = sessionStorage.getItem("userSessionData");

      if (userSessionData) {
        let sessionData;
        try {
          sessionData = JSON.parse(userSessionData);
        } catch (error) {
          console.error("Error parsing sessionStorage data:", error);
          return;
        }

        if (!user) {
          const userTechnologyNames = await getUserTechNames(sessionData);

          setPersonalInfo(sessionData.userInfo || null);
          setEducation(sessionData.educations || []);
          setExperiences(sessionData.experiences || []);
          setProjects(sessionData.projects || []);
          setUserTechnologies(userTechnologyNames);
        }

        if (user) {
          try {
            const { error: userInfoError } = await supabase.from('personal_info').insert(sessionData.userInfo);
            if (userInfoError) throw userInfoError;
        
            const { error: educationsError } = await supabase.from('education').insert(sessionData.educations);
            if (educationsError) throw educationsError;
        
            const { error: experiencesError } = await supabase.from('work_experience').insert(sessionData.experiences);
            if (experiencesError) throw experiencesError;
        
            const { error: projectsError } = await supabase.from('projects').insert(sessionData.projects);
            if (projectsError) throw projectsError;
        
            const { error: projectTechnologiesError } = await supabase.from('project_technologies').insert(sessionData.projectTechnologies);
            if (projectTechnologiesError) throw projectTechnologiesError;
        
            const { error: userTechnologiesError } = await supabase.from('user_technologies').insert(sessionData.userTechnologies);
            if (userTechnologiesError) throw userTechnologiesError;
  
            // const { error: portfolioError } = await supabase.from("portfolio_data").upsert(sessionData.portfolioData, { onConflict: "user_id" })
            // if (portfolioError) throw portfolioError;
        
            sessionStorage.removeItem('userSessionData'); // Clear session data to avoid duplicate inserts
          } catch (error) {
            console.error('Error migrating session data to Supabase:', error);
          }
        }
      }

      if (user) {
        const userId = user.id;

        const {
          userInfo,
          educations,
          experiences,
          projects,
          userTechnologies,
          userComponents,
        } = await fetchUserData(userId);

        setSelectedComponents({
          userInfo: require(`@/app/(portfolio)/(components)/userInfo/${userComponents.user_info_component}`).default,
          workExperience: require(`@/app/(portfolio)/(components)/experiences/${userComponents.experiences_component}`).default,
          education: require(`@/app/(portfolio)/(components)/education/${userComponents.education_component}`).default,
          projects: require(`@/app/(portfolio)/(components)/projects/${userComponents.projects_component}`).default,
          userSkills: require(`@/app/(portfolio)/(components)/skills/${userComponents.skills_component}`).default,
        })

        setPersonalInfo(userInfo);
        setEducation(educations);
        setExperiences(experiences);
        setProjects(projects);
        setUserTechnologies(userTechnologies);
      }
    }

    const fetchAndSaveAll = async () => {
      await fetchConfig(selectedComponents, setSelectedComponents);
      await fetchData()
    }
    
    fetchAndSaveAll()
    
  }, []);
  

  return (
    <div className="flex flex-col h-screen">
      <header className="flex justify-between items-center p-4 border-b">
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={() => handleSave(selectedComponents)}>
              <SaveIcon className="w-4 h-4 mr-2" />
              Save
            </Button>
          </DialogTrigger>
          <AuthModal />
        </Dialog>
        <div className="flex space-x-2">
          <Link
            href={{
              pathname: "/portfolio-preview",
              query: {
                UserInfoComponent: selectedComponents.userInfo.name, 
                WorkExperienceComponent: selectedComponents.workExperience.name, 
                EducationComponent: selectedComponents.education.name,
                ProjectsComponent: selectedComponents.projects.name,
                UserSkillsComponent: selectedComponents.userSkills.name,
                personalInfo: JSON.stringify(personalInfo),
                education: JSON.stringify(education),
                experiences: JSON.stringify(experiences),
                projects: JSON.stringify(projects),
                userTechnologies: JSON.stringify(userTechnologies),
              }
            }}
            target="_blank"
          >
            <Button variant="outline">
              <EyeIcon className="w-4 h-4 mr-2" />
              Preview
            </Button>
          </Link>
          <DeployButton />
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden">
        <div className="w-1/3 p-4 border-r">
          <h2 className="text-lg font-semibold mb-4">Customize Sections</h2>
          <ScrollArea className="h-[calc(100vh-8rem)]">
            {sections.map(section => (
              <div key={section.key} className="mb-4">
                <label htmlFor={section.key} className="block text-sm font-medium text-gray-700 mb-1">
                  {section.name} UI Component
                </label>
                <Select
                  value={selectedComponents[section.key as keyof typeof selectedComponents].name}
                  onValueChange={(value) => handleComponentChange(section.key, value)}
                >
                  <SelectTrigger id={section.key}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {section.components.map((Component, index) => (
                      <SelectItem key={index} value={Component.name}>
                        {Component.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </ScrollArea>
        </div>

        <ScrollArea className="h-[100%] w-[100%]">
          {personalInfo && education && experiences && projects && userTechnologies && (
            <PortfolioPage
              UserInfoComponent={selectedComponents.userInfo}
              WorkExperienceComponent={selectedComponents.workExperience}
              EducationComponent={selectedComponents.education}
              ProjectsComponent={selectedComponents.projects}
              UserSkillsComponent={selectedComponents.userSkills}
              personalInfo={personalInfo}
              education={education}
              experiences={experiences}
              projects={projects}
              userTechnologies={userTechnologies}
            />
          )}
        </ScrollArea>
      </main>
    </div>
  )
}