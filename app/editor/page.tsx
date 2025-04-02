'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { EyeIcon, SaveIcon } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import UserInfo1 from '../(portfolio)/(components)/userInfo/UserInfo1'
import UserInfo2 from '../(portfolio)/(components)/userInfo/UserInfo2'
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
import UserInfo3 from '../(portfolio)/(components)/userInfo/UserInfo3'
import Projects2 from '../(portfolio)/(components)/projects/Projects2'
import Skills2 from '../(portfolio)/(components)/skills/Skills2'
import { fetchConfig, getUserTechNames, handleSave } from './utils/helpers'
import { fetchUserData } from './utils/userData'
import EducationWork1 from '../(portfolio)/(components)/educationWork/EducationWork1'
import EducationWork2 from '../(portfolio)/(components)/educationWork/EducationWork2'
import EducationWork3 from '../(portfolio)/(components)/educationWork/EducationWork3'
import UserInfo4 from '../(portfolio)/(components)/userInfo/UserInfo4'
import EducationWork4 from '../(portfolio)/(components)/educationWork/EducationWork4'

const userInfoComponents = [UserInfo1, UserInfo2, UserInfo3, UserInfo4]
const educationWorkComponents = [EducationWork1, EducationWork2, EducationWork3, EducationWork4]
const projectsComponents = [Projects1, Projects2]
const userSkillsComponents = [Skills1, Skills2]

const sections = [
  { name: 'User Info', key: 'userInfo', components: userInfoComponents },
  { name: 'Education Work', key: 'educationWork', components: educationWorkComponents },
  { name: 'User Skills', key: 'userSkills', components: userSkillsComponents },
  { name: 'Projects', key: 'projects', components: projectsComponents },
]

export default function PortfolioEditor() {
  const [personalInfo, setPersonalInfo] = useState<UserInfo>();
  const [education, setEducation] = useState<Education[]>([]);
  const [experiences, setExperiences] = useState<WorkExperience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [userTechnologies, setUserTechnologies] = useState<Technology[]>([]);
  const [selectedComponents, setSelectedComponents] = useState({
    userInfo: UserInfo1,
    educationWork: EducationWork1,
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
          setUserTechnologies((userTechnologyNames || []).filter((tech): tech is Technology => tech !== null));
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
          educationWork: require(`@/app/(portfolio)/(components)/educationWork/${userComponents.education_work_component}`).default,
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
        <Link className="mr-6 font-bold text-2xl" href={"/"}>Koderra.</Link>
        <div className="flex space-x-2">
          <Link
            href={{
              pathname: "/portfolio-preview",
              query: {
                UserInfoComponent: selectedComponents.userInfo.name, 
                EducationWorkComponent: selectedComponents.educationWork.name, 
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
          <DeployButton components={selectedComponents}/>
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
            <Dialog>
              <DialogTrigger asChild>
                <Button onClick={() => handleSave(selectedComponents)}>
                  <SaveIcon className="w-auto h-4 mr-2" />
                  Save changes
                </Button>
              </DialogTrigger>
              <AuthModal />
            </Dialog>
          </ScrollArea>
        </div>

        <ScrollArea className="h-[100%] w-[100%]">
          {personalInfo && education && experiences && projects && userTechnologies && (
            <PortfolioPage
              UserInfoComponent={selectedComponents.userInfo}
              EducationWorkComponent={selectedComponents.educationWork}
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