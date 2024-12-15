'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useSpring, useInView } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Education, Project, UserInfo, Technology, WorkExperience } from '@/types/supabase-types'

interface PortfolioPageProps {
  UserInfoComponent: React.ComponentType<{ personalInfo: UserInfo; handleScroll: (sectionId: string) => void }>
  WorkExperienceComponent: React.ComponentType<{ experiences: WorkExperience[]; sectionRefs: any; sectionInView: any }>
  EducationComponent: React.ComponentType<{ education: Education[]; sectionRefs: any; sectionInView: any }>
  ProjectsComponent: React.ComponentType<{ projects: Project[]; sectionRefs: any; sectionInView: any }>
  UserSkillsComponent: React.ComponentType<{ userTechnologies: Technology[]; sectionRefs: any; sectionInView: any }>
  personalInfo: UserInfo;
  education: Education[];
  experiences: WorkExperience[];
  projects: Project[];
  userTechnologies: Technology[];
}

export default function PortfolioPage({
  UserInfoComponent,
  WorkExperienceComponent,
  EducationComponent,
  ProjectsComponent,
  UserSkillsComponent,
  personalInfo,
  education,
  experiences,
  projects,
  userTechnologies
}: PortfolioPageProps) {
  const [activeSection, setActiveSection] = useState('about')
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const sectionRefs = {
    about: useRef(null),
    experience: useRef(null),
    education: useRef(null),
    projects: useRef(null),
    skills: useRef(null),
  }

  const sectionInView = {
    about: useInView(sectionRefs.about, { once: true }),
    experience: useInView(sectionRefs.experience, { once: true }),
    education: useInView(sectionRefs.education, { once: true }),
    projects: useInView(sectionRefs.projects, { once: true }),
    skills: useInView(sectionRefs.skills, { once: true }),
  }

  const handleScroll = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted text-foreground" ref={containerRef}>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50"
        style={{ scaleX, transformOrigin: "0%" }}
      />
      
      {personalInfo && (
        <UserInfoComponent personalInfo={personalInfo} handleScroll={handleScroll} />
      )} 
    
      <nav className="sticky top-0 bg-background/80 backdrop-blur-md z-40 py-4 mb-12">
        <ul className="flex justify-center space-x-8">
          {['about', 'experience', 'education', 'projects', 'skills'].map((section) => (
            <li key={section}>
              <Button
                variant="ghost"
                className={`text-lg ${activeSection === section ? 'text-primary' : ''}`}
                onClick={() => {
                  setActiveSection(section)
                  handleScroll(section)
                }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Button>
            </li>
          ))}
        </ul>
      </nav>

      <main className="container mx-auto px-4 py-12">
        <section id="about" ref={sectionRefs.about} className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={sectionInView.about ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-8">About Me</h2>
            <Card className="bg-card">
              <CardContent className="prose prose-lg dark:prose-invert">
                <p>{personalInfo?.about_me}</p>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {experiences && (
          <WorkExperienceComponent experiences={experiences} sectionRefs={sectionRefs} sectionInView={sectionInView}/>
        )} 

        {education && (
          <EducationComponent education={education} sectionRefs={sectionRefs} sectionInView={sectionInView}/>
        )} 

        {projects && (
          <ProjectsComponent projects={projects} sectionRefs={sectionRefs} sectionInView={sectionInView}/>
        )} 

        {userTechnologies && (
          <UserSkillsComponent userTechnologies={userTechnologies} sectionRefs={sectionRefs} sectionInView={sectionInView}/>
        )} 

      </main>
    </div>
  )
}