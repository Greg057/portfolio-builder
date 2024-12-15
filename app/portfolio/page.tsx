'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useInView } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Education, Project, UserInfo, Technology, WorkExperience, UserTechnology } from '@/types/supabase-types'
import { createClient } from '@/utils/supabase/client'

interface PortfolioPageProps {
  UserInfoComponent: React.ComponentType<{ personalInfo: UserInfo; handleScroll: (sectionId: string) => void }>
  WorkExperienceComponent: React.ComponentType<{ experiences: WorkExperience[]; sectionRefs: any; sectionInView: any }>
  EducationComponent: React.ComponentType<{ education: Education[]; sectionRefs: any; sectionInView: any }>
  ProjectsComponent: React.ComponentType<{ projects: Project[]; sectionRefs: any; sectionInView: any }>
  UserSkillsComponent: React.ComponentType<{ userTechnologies: Technology[]; sectionRefs: any; sectionInView: any }>
}

export default function PortfolioPage({ UserInfoComponent, WorkExperienceComponent, EducationComponent, ProjectsComponent, UserSkillsComponent }: PortfolioPageProps) {
  const [personalInfo, setPersonalInfo] = useState<UserInfo>();
  const [education, setEducation] = useState<Education[]>([]);
  const [experiences, setExperiences] = useState<WorkExperience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [userTechnologies, setUserTechnologies] = useState<Technology[]>([]);
  
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

  useEffect(() => {
    const fetchData = async () => {
      const sessionData = sessionStorage.getItem("portfolioData");
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      const userId = user?.id;

      if (sessionData && !userId) {
        try {
          const data = JSON.parse(sessionData);
      
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
        } catch (error) {
          console.error("Error parsing sessionStorage data:", error);
        }
      } else if (userId) {
        // Authenticated user: Load data from Supabase
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

          // Update state with fetched data
          setPersonalInfo(userInfo);
          setEducation(educations);
          setExperiences(experiences);
          setProjects(projects);
          setUserTechnologies(userTechnologyNames);

        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchData();
  }, []);

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