"use client"

import { notFound } from "next/navigation";
import PortfolioPage from "@/app/(portfolio)/PortfolioPage";
import { useEffect, useState } from "react";
import { Education, Project, UserInfo, Technology, WorkExperience } from '@/types/supabase-types'
import UserInfo1 from '@/app/(portfolio)/(components)/userInfo/UserInfo1'
import EducationWork1 from '@/app/(portfolio)/(components)/educationWork/EducationWork1'
import Projects1 from '@/app/(portfolio)/(components)/projects/Projects1'
import Skills1 from '@/app/(portfolio)/(components)/skills/Skills1'
import { fetchUserData } from "@/app/editor/utils/userData";

export default function PortfolioDisplay({ userId }: { userId: string }) {
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
  
      const portfolio = fetchPortfolioByUserId(userId);
  
      if (!portfolio) {
          return notFound(); 
      }
  
    }, []);
    
  
    return (
      <>
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
      </>
    );
  }
  