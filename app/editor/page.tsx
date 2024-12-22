'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { EyeIcon, RocketIcon, SaveIcon } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import UserInfo1 from '../portfolio/userInfo/UserInfo1'
import UserInfo2 from '../portfolio/userInfo/UserInfo2'
import Experiences1 from '../portfolio/experiences/Experiences1'
import Education1 from '../portfolio/education/Education1'
import Projects1 from '../portfolio/projects/Projects1'
import Skills1 from '../portfolio/skills/Skills1'
import Link from 'next/link'
import { Education, Project, UserInfo, Technology, WorkExperience, UserTechnology } from '@/types/supabase-types'
import PortfolioPage from './PortfolioPage'
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog"
import AuthModal from './AuthModal'

const userInfoComponents = [UserInfo1, UserInfo2]
const workExperienceComponents = [Experiences1]
const educationComponents = [Education1]
const projectsComponents = [Projects1]
const userSkillsComponents = [Skills1]

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

  const handleSave = async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    if (!user) {
      sessionStorage.removeItem("portfolioSessionData");
      // Save the current configuration in sessionStorage
      sessionStorage.setItem(
        "portfolioSessionData",
        JSON.stringify({
          user_info_component: selectedComponents.userInfo.name,
          education_component: selectedComponents.education.name,
          experiences_component: selectedComponents.workExperience.name,
          projects_component: selectedComponents.projects.name,
          skills_component: selectedComponents.userSkills.name,
        })
      );

      console.log("portfolioSessionData added since not user")
      
      return;
    }

    try {
      const { error: saveError } = await supabase.from('portfolio_data').upsert({
        user_id: user.id,
        user_info_component: selectedComponents.userInfo.name,
        education_component: selectedComponents.education.name,
        experiences_component: selectedComponents.workExperience.name,
        projects_component: selectedComponents.projects.name,
        skills_component: selectedComponents.userSkills.name,
        is_saved: true
      });
      if (saveError) throw saveError;
  
      console.log("portfolio data added to SUPABASE since user")
    } catch (error) {
      console.error("Error saving:", error);
    }
  }

  const handleDeploy = () => {
    console.log('Deploying portfolio')
  }

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      const userId = user?.id;

      const userSessionData = sessionStorage.getItem("userSessionData");
      const portfolioSessionData = sessionStorage.getItem("portfolioSessionData");
    
      if (portfolioSessionData) {
        const parsedConfig = JSON.parse(portfolioSessionData);

        setSelectedComponents({
          userInfo: require(`../portfolio/userInfo/${parsedConfig.user_info_component}`).default,
          education: require(`../portfolio/education/${parsedConfig.education_component}`).default,
          workExperience: require(`../portfolio/experiences/${parsedConfig.experiences_component}`).default,
          projects: require(`../portfolio/projects/${parsedConfig.projects_component}`).default,
          userSkills: require(`../portfolio/skills/${parsedConfig.skills_component}`).default
        });

        console.log("portfolioSessionData retrieved, setted Selected Components and deleted")
    
        sessionStorage.removeItem("portfolioSessionData");
    
        handleSave()
      } 

      if (userSessionData && !userId) {
        try {
          const data = JSON.parse(userSessionData);
      
          // Set basic data from sessionStorage
          setPersonalInfo(data.userInfo || null);
          setEducation(data.educations || []);
          setExperiences(data.experiences || []);
          setProjects(data.projects || []);
      
          // Resolve userTechnologies to include technology names
          const userTechnologies = data.userTechnologies || [];
          if (userTechnologies.length > 0) {
            const techIds = userTechnologies.map((ut: UserTechnology) => ut.technology_id);
      
            // Fetch technology names based on IDs stored in sessionStorage
            const { data: technologies, error: techDetailsError } = await supabase
              .from("technologies")
              .select("*")
              .in("id", techIds);
      
            if (techDetailsError) {
              console.error("Error fetching technology details from Supabase:", techDetailsError);
              setUserTechnologies(userTechnologies); // Fallback to raw IDs if fetching fails
            } else {
              // Map userTechnologies to include technology names
              const userTechnologyNames = userTechnologies.map((ut: UserTechnology) => {
                const tech = technologies.find((t) => t.id === ut.technology_id);
                return { id: ut.technology_id, name: tech?.name || "Unknown" };
              });
      
              setUserTechnologies(userTechnologyNames);
            }
          } else {
            setUserTechnologies([]);
          }

          console.log("user session data retrieved since not user")


        } catch (error) {
          console.error("Error parsing sessionStorage data:", error);
        }
      } 
      
      if (userId) {
        try {
          const { data: userInfo, error: userInfoError } = await supabase
            .from("personal_info")
            .select("*")
            .eq("user_id", userId)
            .single();

          const { data: educations, error: educationError } = await supabase
            .from("education")
            .select("*")
            .eq("user_id", userId);

          const { data: experiences, error: experienceError } = await supabase
            .from("work_experience")
            .select("*")
            .eq("user_id", userId);

          const { data: projects, error: projectError } = await supabase
            .from("projects")
            .select("*")
            .eq("user_id", userId);

          const { data: userTechnologies, error: technologiesError } = await supabase
            .from("user_technologies")
            .select("technology_id")
            .eq("user_id", userId);

          // Handle errors
          if (userInfoError || educationError || experienceError || projectError || technologiesError) {
            console.error(
              "Error fetching data:",
              userInfoError,
              educationError,
              experienceError,
              projectError,
              technologiesError
            );
            return;
          }

          if (projects && projects.length > 0) {
            await Promise.all(projects.map(async (project) => {
              project.technologyIds = [];
              project.technologyNames = [];
              const { data: projectTechnologies, error: projectTechnologiesError } = await supabase
                .from("project_technologies")
                .select("*")
                .eq("project_id", project.id);
              
              if (projectTechnologiesError) {
                console.log('Error fetching project technologies')
              }
              
              if (projectTechnologies) {
                projectTechnologies.map(tech => {
                  project.technologyIds.push(tech.technology_id)
                })
              } 

              if (project.technologyIds.length > 0) {
                const { data: technologies, error: techDetailsError } = await supabase
                  .from("technologies")
                  .select("*")
                  .in("id", project.technologyIds);

                if (techDetailsError) {
                  console.error("Error fetching technology details:", techDetailsError);
                  return; // Exit or handle the error appropriately
                }

                if (technologies) {
                  technologies.map(tech => {
                    project.technologyNames.push(tech.name)
                  })
                }
              }
            }))
          }

          let userTechnologyNames: Technology[] = [];

          if (userTechnologies && userTechnologies.length > 0) {
            const techIds = userTechnologies.map((ut) => ut.technology_id);

            // Fetch technologies data
            const { data: technologies, error: techDetailsError } = await supabase
              .from("technologies")
              .select("*")
              .in("id", techIds);

            if (techDetailsError) {
              console.error("Error fetching technology details:", techDetailsError);
              return; // Exit or handle the error appropriately
            }

            if (technologies) {
              // Map user technologies to names
              userTechnologyNames = userTechnologies.map((ut) => {
                const tech = technologies.find((t) => t.id === ut.technology_id);
                return { id: ut.technology_id, name: tech?.name || "Unknown" };
              });
            }
          }

          const { data: userInfoComponent, error: userInfoComponentError } = await supabase
            .from("portfolio_data")
            .select("user_info_component")
            .eq("user_id", userId)
            .single()

          const { data: educationComponent, error: educationComponentError } = await supabase
            .from("portfolio_data")
            .select("education_component")
            .eq("user_id", userId)
            .single()

          const { data: experiencesComponent, error: experiencesComponentError } = await supabase
            .from("portfolio_data")
            .select("experiences_component")
            .eq("user_id", userId)
            .single()

          const { data: projectsComponent, error: projectsComponentError } = await supabase
            .from("portfolio_data")
            .select("projects_component")
            .eq("user_id", userId)
            .single()

          const { data: skillsComponent, error: skillsComponentError } = await supabase
            .from("portfolio_data")
            .select("skills_component")
            .eq("user_id", userId)
            .single()

          if (userInfoComponentError || educationComponentError || experiencesComponentError || projectsComponentError || skillsComponentError) {
            console.error(
              "Error fetching portfolio components data:",
              userInfoComponentError,
              educationComponentError,
              experiencesComponentError,
              projectsComponentError,
              skillsComponentError
            );
            return;
          }

          setSelectedComponents({
            userInfo: require(`../portfolio/userInfo/${userInfoComponent?.user_info_component}`).default,
            workExperience: require(`../portfolio/experiences/${experiencesComponent?.experiences_component}`).default,
            education: require(`../portfolio/education/${educationComponent?.education_component}`).default,
            projects: require(`../portfolio/projects/${projectsComponent?.projects_component}`).default,
            userSkills: require(`../portfolio/skills/${skillsComponent?.skills_component}`).default,
          })

          setPersonalInfo(userInfo);
          setEducation(educations);
          setExperiences(experiences);
          setProjects(projects);
          setUserTechnologies(userTechnologyNames);

          console.log("both user and portfolio data retrieved from SUPABASE since user")


        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    }

    fetchData()

  }, []); 

  return (
    <div className="flex flex-col h-screen">
      <header className="flex justify-between items-center p-4 border-b">
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={handleSave}>
              <SaveIcon className="w-4 h-4 mr-2" />
              Save
            </Button>
          </DialogTrigger>
          <AuthModal />
        </Dialog>
        <div className="flex space-x-2">
          <Link
            href={{
              pathname: "/portfolio",
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
          <Button onClick={handleDeploy}>
            <RocketIcon className="w-4 h-4 mr-2" />
            Deploy
          </Button>
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