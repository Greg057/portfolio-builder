'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { UserInfo, WorkExperience, Education, Project, UserTechnology } from '@/types/supabase-types'
import EducationSection from './EducationSection'
import UserInfoSection from './UserInfoSection'
import ExperienceSection from './ExperienceSection'
import ProjectSection from './ProjectSection'
import TechnologySection from './TechnologySection'
import { createClient } from '@/utils/supabase/client'
import { v4 as uuidv4 } from 'uuid';
import { redirect } from 'next/navigation'

const initialAvailableTechnologies = [
  { value: 1, label: 'JavaScript' },
  { value: 2, label: 'TypeScript' },
  { value: 3, label: 'React' },
  { value: 4, label: 'Next.js' },
  { value: 5, label: 'Node.js' },
];

export default function OnboardingPage() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    full_name: '',
    title: null,
    email: '',
    phone: null,
    github: null,
    linkedin: null,
    about_me: null,
  })
  const [educations, setEducations] = useState<Education[]>([{ degree: '', university: '', start_year: '', end_year: '', description: null }])
  const [experiences, setExperiences] = useState<WorkExperience[]>([{ company: '', position: '', start_date: '', end_date: '', description: null }])
  const [projects, setProjects] = useState<Project[]>([{ id: uuidv4(), name: '', description: '', github_link: '', live_link: '', technologies: [], availableTechnologies: initialAvailableTechnologies }])
  const [userTechnologies, setUserTechnologies] = useState<UserTechnology[]>([{ technology_id: null }])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('handle submit called')
  
    const errors = validateForm();
  
    if (errors.length > 0) {
      alert(`Validation errors:\n${errors.join("\n")}`);
      return;
    }
  
    const payload = {
      userInfo: {
        full_name: userInfo.full_name.trim(),
        email: userInfo.email.trim(),
        title: userInfo.title?.trim() || null,
        phone: userInfo.phone?.trim() || null,
        github: userInfo.github?.trim() || null,
        linkedin: userInfo.linkedin?.trim() || null,
        about_me: userInfo.about_me?.trim() || null,
      },
      educations: educations
        .filter(
          (edu) => edu.degree.trim() && edu.university.trim() && edu.start_year.trim() && edu.end_year.trim()
        )
        .map((edu) => ({
          ...edu,
          degree: edu.degree.trim(),
          university: edu.university.trim(),
          start_year: edu.start_year.trim(),
          end_year: edu.end_year.trim(),
          description: edu.description?.trim() || null,
        })),
      experiences: experiences
        .filter(
          (exp) =>
            exp.company.trim() && exp.position.trim() && exp.start_date.trim() && exp.end_date.trim()
        )
        .map((exp) => ({
          ...exp,
          company: exp.company.trim(),
          position: exp.position.trim(),
          start_date: exp.start_date.trim(),
          end_date: exp.end_date.trim(),
          description: exp.description?.trim() || null,
        })),
      projects: projects
        .filter((proj) => proj.name.trim())
        .map((proj) => ({
          project: {
            id: proj.id,
            name: proj.name.trim(),
            description: proj.description?.trim() || null,
            github_link: proj.github_link?.trim() || null,
            live_link: proj.live_link?.trim() || null
          },
          projectTechnologies: proj.technologies.map((techID) => ({
            project_id: proj.id,
            technology_id: techID,
          })),
        })),
    };
  
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        const sessionPayload = {
          userInfo: { ...payload.userInfo, user_id: null }, 
          educations: payload.educations.map((edu) => ({ ...edu, user_id: null })), 
          experiences: payload.experiences.map((exp) => ({ ...exp, user_id: null })), 
          projects: payload.projects.map((proj) => ({ ...proj.project, user_id: null })), 
          projectTechnologies: payload.projects.flatMap((proj) => proj.projectTechnologies), 
          userTechnologies: userTechnologies.map((tech) => ({ technology_id: tech.technology_id, user_id: null }))
        };
        // Anonymous user: Save data to sessionStorage
        sessionStorage.setItem('portfolioData', JSON.stringify(sessionPayload));
        console.log('Data saved to sessionStorage for anonymous user');
        alert('Your data has been temporarily saved. Please sign up to save it permanently!');

        redirect('/portfolio-editor')

      } else {
        const userId = user.id;

        const dbPayload = {
          userInfo: { ...payload.userInfo, user_id: userId },
          educations: payload.educations.map((edu) => ({ ...edu, user_id: userId })),
          experiences: payload.experiences.map((exp) => ({ ...exp, user_id: userId })),
          projects: payload.projects.map((proj) => ({ ...proj.project, user_id: userId })),
          projectTechnologies: payload.projects.flatMap((proj) => proj.projectTechnologies),
          userTechnologies: userTechnologies.map((tech) => ({ technology_id: tech.technology_id, user_id: userId }))
        };
  
        const { error: userInfoError } = await supabase.from('personal_info').insert(dbPayload.userInfo);
        if (userInfoError) throw userInfoError;
  
        const { error: educationsError } = await supabase.from('education').insert(dbPayload.educations);
        if (educationsError) throw educationsError;
  
        const { error: experiencesError } = await supabase.from('work_experience').insert(dbPayload.experiences);
        if (experiencesError) throw experiencesError;
  
        const { error: projectsError } = await supabase.from('projects').insert(dbPayload.projects);
        if (projectsError) throw projectsError;
        
        const { error: projectsTechnologiesError } = await supabase.from('project_technologies').insert(dbPayload.projectTechnologies);
        if (projectsTechnologiesError) throw projectsTechnologiesError;
        
        const { error: userTechnologiesError } = await supabase.from('user_technologies').insert(dbPayload.userTechnologies);
        if (userTechnologiesError) throw userTechnologiesError;

        console.log('Data successfully saved to Supabase for authenticated user');
        alert('Your data has been successfully saved!');

        redirect('/portfolio-editor')
      }
    } catch (error) {
      console.error('Error while saving data:', error);
      alert('An error occurred while saving your data. Please try again.');
    }
  };
  

  const validateForm = () => {
    const errors: string[] = [];
  
    if (!userInfo.full_name.trim()) errors.push("Full name is required.");
    if (!userInfo.email.trim()) errors.push("Email is required.");
  
    const invalidEducations = educations.some(
      (edu) => 
        !edu.degree.trim() || 
        !edu.university.trim() || 
        !edu.start_year.trim() || 
        !edu.end_year.trim()
    );
    if (invalidEducations) errors.push("Each education entry must have a degree, university, end and start year.");
  
    const invalidExperiences = experiences.some(
      (exp) => 
        !exp.company.trim() || 
        !exp.position.trim() || 
        !exp.start_date.trim() || 
        !exp.end_date.trim()
    );
    if (invalidExperiences) errors.push("Each work experience entry must have a company, job title, end and start date.");
  
    const invalidProjects = projects.some(
      (proj) => 
        !proj.name.trim()
    );
    if (invalidProjects) errors.push("Each project must have a name.");
  
    return errors;
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








