"use client"

import { notFound } from "next/navigation";
import PortfolioPage from "@/app/(portfolio)/PortfolioPage";
import { useEffect, useState } from "react";
import { Education, Project, UserInfo, Technology, WorkExperience } from '@/types/supabase-types'
import { fetchUserData } from "@/app/editor/utils/userData";
import { educationWorkComponents, projectsComponents, sections, userInfoComponents, userSkillsComponents } from "@/app/editor/utils/componentsData";
import Spinner from "@/components/spinner";

export default function PortfolioDisplay({ userId }: { userId: string }) {
    const [personalInfo, setPersonalInfo] = useState<UserInfo>();
    const [education, setEducation] = useState<Education[]>([]);
    const [experiences, setExperiences] = useState<WorkExperience[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [userTechnologies, setUserTechnologies] = useState<Technology[]>([]);
    const [selectedComponents, setSelectedComponents] = useState({
      userInfo: userInfoComponents.UserInfo1,
      educationWork: educationWorkComponents.EducationWork1,
      projects: projectsComponents.Projects1,
      userSkills: userSkillsComponents.Skills1,
    })
  
    useEffect(() => {
      const fetchPortfolioByUserId = async (userId: string) => {
        
        const {
          userInfo,
          educations,
          experiences,
          projects,
          userTechnologies,
          userComponents,
        } = await fetchUserData(userId);

        setSelectedComponents({
          userInfo:
            userInfoComponents[userComponents.user_info_component as keyof typeof userInfoComponents] ||
            userInfoComponents.UserInfo1,
          educationWork:
            educationWorkComponents[userComponents.education_work_component as keyof typeof educationWorkComponents] ||
            educationWorkComponents.EducationWork1,
          projects:
            projectsComponents[userComponents.projects_component as keyof typeof projectsComponents] ||
            projectsComponents.Projects1,
          userSkills:
            userSkillsComponents[userComponents.skills_component as keyof typeof userSkillsComponents] ||
            userSkillsComponents.Skills1,
        })

        setPersonalInfo(userInfo);
        setEducation(educations);
        setExperiences(experiences);
        setProjects(projects);
        setUserTechnologies(userTechnologies);
      }
  
      const portfolio = fetchPortfolioByUserId(userId);
  
      if (!portfolio) {
          return notFound(); 
      }
  
    }, []);
    
  
    return (
      <>
        {personalInfo ? (
          <PortfolioPage
            UserInfoComponent={selectedComponents.userInfo.component}
            EducationWorkComponent={selectedComponents.educationWork.component}
            ProjectsComponent={selectedComponents.projects.component}
            UserSkillsComponent={selectedComponents.userSkills.component}
            personalInfo={personalInfo}
            education={education}
            experiences={experiences}
            projects={projects}
            userTechnologies={userTechnologies}
          />
        ) : (
          <Spinner />
        )}
      </>
    );
  }
  