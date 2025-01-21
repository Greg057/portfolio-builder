'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { UserInfo, WorkExperience, Education, Project, UserTechnology, Payload } from '@/types/supabase-types'
import EducationSection from './components/EducationSection'
import UserInfoSection from './components/UserInfoSection'
import ExperienceSection from './components/ExperienceSection'
import ProjectSection from './components/ProjectSection'
import TechnologySection from './components/TechnologySection'
import { createClient } from '@/utils/supabase/client'
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { validateForm } from './utils/validation'
import { initializePayload } from './utils/payload'

const initialAvailableTechnologies = [
  { value: 1, label: 'JavaScript' },
  { value: 2, label: 'TypeScript' },
  { value: 3, label: 'React' },
  { value: 4, label: 'Next.js' },
  { value: 5, label: 'Node.js' },
];

export default function OnboardingPage() {
  const [userInfo, setUserInfo] = useState<UserInfo>({ full_name: '', title: null, email: '', github: null, linkedin: null, about_me: null, location: null, avatarUrl: null, avatarFile: null, cvUrl: null, cvFile: null, x: null });
  const [educations, setEducations] = useState<Education[]>([{ degree: '', university: '', start_year: '', end_year: '', description: null, logoUrl: null, logoFile: null }])
  const [experiences, setExperiences] = useState<WorkExperience[]>([{ company: '', position: '', start_date: '', end_date: '', description: null, logoUrl: null, logoFile: null }])
  const [projects, setProjects] = useState<Project[]>([{ id: uuidv4(), name: '', description: '', github_link: '', live_link: '', technologies: [], availableTechnologies: initialAvailableTechnologies, picUrl: null, picFile: null }])
  const [userTechnologies, setUserTechnologies] = useState<UserTechnology[]>([{ technology_id: null }])

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const errors = validateForm(userInfo, educations, experiences, projects);
    if (errors.length > 0) {
      alert(`Validation errors:\n${errors.join("\n")}`);
      return;
    }

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const payload: Payload = await initializePayload(user, userInfo, educations, experiences, projects, userTechnologies)

    if (!user) {
      sessionStorage.setItem('userSessionData', JSON.stringify(payload));
      router.push('/editor')
    } 
    
    if (user) {
      try {
        const { error: userInfoError } = await supabase.from('personal_info').upsert(payload.userInfo);
        if (userInfoError) throw userInfoError;

        const { error: educationsError } = await supabase.from('education').upsert(payload.educations);
        if (educationsError) throw educationsError;

        const { error: experiencesError } = await supabase.from('work_experience').upsert(payload.experiences);
        if (experiencesError) throw experiencesError;

        const { error: projectsError } = await supabase.from('projects').upsert(payload.projects);
        if (projectsError) throw projectsError;
        
        const { error: projectsTechnologiesError } = await supabase.from('project_technologies').upsert(payload.projectTechnologies);
        if (projectsTechnologiesError) throw projectsTechnologiesError;
        
        const { error: userTechnologiesError } = await supabase.from('user_technologies').upsert(payload.userTechnologies);
        if (userTechnologiesError) throw userTechnologiesError;

        const { error: portfolioError } = await supabase.from("portfolio_data").upsert(payload.portfolioData, { onConflict: "user_id" })
        if (portfolioError) throw portfolioError;

        router.push('/editor')

      } catch (error) {
        console.error("Error while saving data to Supabase: ", (error as Error).message)
        return
      }
    }
  }; 

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Create Your Developer Profile</h1>
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8">
        <UserInfoSection userInfo={userInfo} setUserInfo={setUserInfo} />
        <EducationSection educations={educations} setEducations={setEducations} />
        <ExperienceSection experiences={experiences} setExperiences={setExperiences} />
        <ProjectSection projects={projects} setProjects={setProjects} />
        <TechnologySection userTechnologies={userTechnologies} setUserTechnologies={setUserTechnologies} />

        <Button type="submit" className="w-full">Build Portfolio</Button>
      </form>
    </div>
  )
}








