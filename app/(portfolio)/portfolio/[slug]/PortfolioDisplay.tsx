"use client"

import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import PortfolioPage from "@/app/(portfolio)/PortfolioPage";
import { useEffect, useState } from "react";
import { Education, Project, UserInfo, Technology, WorkExperience } from '@/types/supabase-types'
import UserInfo1 from '@/app/(portfolio)/(components)/userInfo/UserInfo1'
import Experiences1 from '@/app/(portfolio)/(components)/experiences/Experiences1'
import Education1 from '@/app/(portfolio)/(components)/education/Education1'
import Projects1 from '@/app/(portfolio)/(components)/projects/Projects1'
import Skills1 from '@/app/(portfolio)/(components)/skills/Skills1'

export default function PortfolioDisplay({ slug }: { slug: string }) {
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
  
    useEffect(() => {
      const fetchPortfolioBySlug = async (slug: string) => {
          const supabase = createClient();
          const { data, error } = await supabase
            .from("portfolio_data")
            .select("user_id, primary_color, secondary_color")
            .eq("slug", slug)
            .single();
        
          if (error || !data) return null;
        
          const userId = data.user_id
        
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
                userInfo: require(`@/app/(portfolio)/(components)/userInfo/${userInfoComponent?.user_info_component}`).default,
                workExperience: require(`@/app/(portfolio)/(components)/experiences/${experiencesComponent?.experiences_component}`).default,
                education: require(`@/app/(portfolio)/(components)/education/${educationComponent?.education_component}`).default,
                projects: require(`@/app/(portfolio)/(components)/projects/${projectsComponent?.projects_component}`).default,
                userSkills: require(`@/app/(portfolio)/(components)/skills/${skillsComponent?.skills_component}`).default,
              })
        
              setPersonalInfo(userInfo);
              setEducation(educations);
              setExperiences(experiences);
              setProjects(projects);
              setUserTechnologies(userTechnologyNames);
        
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          }
        }
  
      const portfolio = fetchPortfolioBySlug(slug);
  
      if (!portfolio) {
          return notFound(); // Handle 404 if the portfolio doesn't exist
      }
  
    }, []);
    
  
    return (
      <>
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
      </>
    );
  }
  