'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { UserInfo, WorkExperience, Education, Project, Skill } from '@/types/supabase-types'
import EducationSection from './EducationSection'
import UserInfoSection from './UserInfoSection'
import ExperienceSection from './ExperienceSection'
import ProjectSection from './ProjectSection'
import SkillsSection from './SkillSection'
import { createClient } from '@/utils/supabase/client'

export default function OnboardingPage() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    full_name: '',
    title: '',
    email: '',
    phone: '',
    github: '',
    linkedin: '',
    about_me: '',
  })
  const [educations, setEducations] = useState<Education[]>([{ degree: '', university: '', start_year: '', end_year: '', description: '' }])
  const [experiences, setExperiences] = useState<WorkExperience[]>([{ company: '', position: '', start_date: '', end_date: '', description: '' }])
  const [projects, setProjects] = useState<Project[]>([{ name: '', description: '', github_link: '', technologies: [] }])
  const [skills, setSkills] = useState<Skill[]>([{ name: '' }])

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
          (edu) => edu.degree.trim() && edu.university.trim() && edu.start_year.trim()
        )
        .map((edu) => ({
          ...edu,
          degree: edu.degree.trim(),
          university: edu.university.trim(),
          start_year: edu.start_year.trim(),
          end_year: edu.end_year?.trim() || null,
          description: edu.description?.trim() || null,
        })),
      experiences: experiences
        .filter(
          (exp) =>
            exp.company.trim() && exp.position.trim() && exp.start_date.trim()
        )
        .map((exp) => ({
          ...exp,
          company: exp.company.trim(),
          position: exp.position.trim(),
          start_date: exp.start_date.trim(),
          end_date: exp.end_date?.trim() || null,
          description: exp.description?.trim() || null,
        })),
      projects: projects
        .filter((proj) => proj.name.trim())
        .map((proj) => ({
          ...proj,
          name: proj.name.trim(),
          description: proj.description?.trim() || null,
          github_link: proj.github_link?.trim() || null,
          technologies:
            proj.technologies.length > 0
              ? proj.technologies.map((tech) => tech.trim()).filter(Boolean)
              : null, 
        })),
      skills: skills.length > 0
        ? [
            ...skills
              .filter((skill) => skill.name.trim()) 
              .map((skill) => skill.name.trim()), 
          ]
        : null,
    };
  
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      

      const { data: userInfoData, error: userInfoError } = await supabase
        .from('user_info')
        .insert(payload.userInfo)
        .select(); // Returns the inserted row
  
      if (userInfoError) throw userInfoError;
  
      const userId = userInfoData[0].id;
  
      // Insert related data using the `user_id` from `user_info`
      if (payload.educations.length > 0) {
        const { error: educationError } = await supabase
          .from('education')
          .insert(
            payload.educations.map((edu) => ({ ...edu, user_id: userId }))
          );
  
        if (educationError) throw educationError;
      }
  
      if (payload.experiences.length > 0) {
        const { error: experienceError } = await supabase
          .from('work_experience')
          .insert(
            payload.experiences.map((exp) => ({ ...exp, user_id: userId }))
          );
  
        if (experienceError) throw experienceError;
      }
  
      if (payload.projects.length > 0) {
        const { error: projectError } = await supabase
          .from('projects')
          .insert(
            payload.projects.map((proj) => ({ ...proj, user_id: userId }))
          );
  
        if (projectError) throw projectError;
      }
  
      if (payload.skills) {
        const { error: skillsError } = await supabase
          .from('skills')
          .insert({ skill_list: payload.skills, user_id: userId });
  
        if (skillsError) throw skillsError;
      }
  
      alert('Profile saved successfully!');
    } catch (error) {
      console.error('Error submitting profile:', error);
      alert('Failed to save profile. Please try again.');
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
        !edu.start_year.trim()
    );
    if (invalidEducations) errors.push("Each education entry must have a degree, university, and start year.");
  
    const invalidExperiences = experiences.some(
      (exp) => 
        !exp.company.trim() || 
        !exp.position.trim() || 
        !exp.start_date.trim()
    );
    if (invalidExperiences) errors.push("Each work experience entry must have a company, job title, and start date.");
  
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
        <SkillsSection skills={skills} setSkills={setSkills} />

        <Button type="submit" className="w-full">Save Profile</Button>
      </form>
    </div>
  )
}








