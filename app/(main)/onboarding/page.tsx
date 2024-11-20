'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { UserInfo, WorkExperience, Education, Project, Skill } from '@/types/supabase-types'
import EducationSection from './EducationSection'
import UserInfoSection from './UserInfoSection'
import ExperienceSection from './ExperienceSection'
import ProjectSection from './ProjectSection'
import SkillsSection from './SkillSection'

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
  
    // Filter out empty optional sections
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
        .filter((proj) => proj.name.trim()) // Only `name` is required
        .map((proj) => ({
          ...proj,
          name: proj.name.trim(),
          description: proj.description?.trim() || null, // Optional field
          github_link: proj.github_link?.trim() || null, // Optional field
          technologies:
            proj.technologies.length > 0
              ? proj.technologies.map((tech) => tech.trim()).filter(Boolean) // Clean non-empty techs
              : null, // Set to null if empty
        })),
      skills: skills.length > 0
        ? [
            ...skills
              .filter((skill) => skill.name.trim()) // Ensure at least one skill is non-empty
              .map((skill) => skill.name.trim()), // Only keep skill names
          ]
        : null, // Set to null if no valid skills
    };
    
  
    try {
      // Send payload to Supabase
      console.log("Submitting data:", payload);
      // Replace with your Supabase API calls
      alert("Profile saved successfully!");
    } catch (error) {
      console.error("Error submitting profile:", error);
      alert("Failed to save profile. Please try again.");
    }
  };
  

  const validateForm = () => {
    const errors: string[] = [];
  
    // Validate userInfo
    if (!userInfo.full_name.trim()) errors.push("Full name is required.");
    if (!userInfo.email.trim()) errors.push("Email is required.");
  
    // Validate Educations
    const invalidEducations = educations.some(
      (edu) => 
        !edu.degree.trim() || 
        !edu.university.trim() || 
        !edu.start_year.trim()
    );
    if (invalidEducations) errors.push("Each education entry must have a degree, university, and start year.");
  
    // Validate Work Experiences
    const invalidExperiences = experiences.some(
      (exp) => 
        !exp.company.trim() || 
        !exp.position.trim() || 
        !exp.start_date.trim()
    );
    if (invalidExperiences) errors.push("Each work experience entry must have a company, job title, and start date.");
  
    // Validate Projects
    const invalidProjects = projects.some(
      (proj) => 
        !proj.name.trim() || 
        !proj.description.trim()
    );
    if (invalidProjects) errors.push("Each project must have a name and description.");
  
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








