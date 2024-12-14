'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useScroll, useSpring, useInView } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GithubIcon, LinkedinIcon, MailIcon, ExternalLinkIcon, ChevronDownIcon } from 'lucide-react'
import { Education, Project, UserInfo, Technology, WorkExperience, UserTechnology } from '@/types/supabase-types'
import { createClient } from '@/utils/supabase/client'
import { revalidatePath } from 'next/cache'


export default function PortfolioPage() {
  const [personalInfo, setPersonalInfo] = useState<UserInfo>();
  const [education, setEducation] = useState<Education[]>([]);
  const [experiences, setExperiences] = useState<WorkExperience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [userTechnologies, setUserTechnologies] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(true);
  
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
    projects: useRef(null),
    education: useRef(null),
    userTechnologies: useRef(null),
  }

  const sectionInView = {
    about: useInView(sectionRefs.about, { once: true }),
    experience: useInView(sectionRefs.experience, { once: true }),
    projects: useInView(sectionRefs.projects, { once: true }),
    education: useInView(sectionRefs.education, { once: true }),
    userTechnologies: useInView(sectionRefs.userTechnologies, { once: true }),
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
      setLoading(false);
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
      
      <header className="py-20 text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          {personalInfo ? (
            <>
              <h1 className="text-6xl font-bold mb-4">{personalInfo.full_name}</h1>
              <p className="text-2xl mb-8">{personalInfo.title || ""}</p>
              <div className="flex justify-center space-x-6">
                <a href={`mailto:${personalInfo.email}`} className="hover:text-primary transition-colors">
                  <MailIcon size={24} />
                </a>
                {personalInfo?.github && (
                  <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                    <GithubIcon size={24} />
                  </a>
                )}
                {personalInfo?.linkedin && (
                  <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                    <LinkedinIcon size={24} />
                  </a>
                )}
              </div>
            </>
          ) : (
            <p>Loading personal info...</p>
          )}
        </motion.div>
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-3xl" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDownIcon 
            size={40} 
            className="animate-bounce cursor-pointer"
            onClick={() => handleScroll('about')}
          />
        </motion.div>
      </header>

      <nav className="sticky top-0 bg-background/80 backdrop-blur-md z-40 py-4 mb-12">
        <ul className="flex justify-center space-x-8">
          {['about', 'experience', 'projects', 'education', 'userTechnologies'].map((section) => (
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

        <section id="experience" ref={sectionRefs.experience} className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={sectionInView.experience ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-8">Work Experience</h2>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-card overflow-hidden">
                    <CardHeader className="flex flex-row items-center space-x-4 pb-4">
                      <div>
                        <CardTitle className="text-xl">{exp.company}</CardTitle>
                        <CardDescription>{exp.position} | {exp.start_date}-{exp.end_date}</CardDescription>
                      </div>
                    </CardHeader>
                    {exp.description && (
                      <CardContent>
                        <p>{exp.description}</p>
                      </CardContent>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="projects" ref={sectionRefs.projects} className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={sectionInView.projects ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-8">Projects</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card className="bg-card h-full flex flex-col">
                    <CardHeader>
                      <CardTitle className="text-xl">{project.name}</CardTitle>
                    </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologyNames?.map((tech, i) => (
                            <Badge key={i} variant="secondary">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    <CardContent className="pt-0">
                      <div className="flex justify-between gap-4">
                        {project.live_link && (
                          <Button asChild variant="outline" className="w-full">
                            <a
                              href={project.live_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center"
                            >
                              View Project <ExternalLinkIcon className="ml-2 h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        {project.github_link && (
                          <Button asChild variant="outline" className="w-full">
                            <a
                              href={project.github_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center"
                            >
                              GitHub <GithubIcon className="ml-2 h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="education" ref={sectionRefs.education} className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={sectionInView.education ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-8">Education</h2>
            <div className="space-y-8">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-card">
                    <CardHeader>
                      <CardTitle className="text-xl">{edu.university}</CardTitle>
                      <CardDescription>
                        {edu.degree} | {edu.start_year}-{edu.end_year}
                      </CardDescription>
                    </CardHeader>
                    {/* Render description only if it exists */}
                    {edu.description && (
                      <CardContent className="prose prose-lg dark:prose-invert">
                        <p>{edu.description}</p>
                      </CardContent>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="userTechnologies" ref={sectionRefs.userTechnologies}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={sectionInView.userTechnologies ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-8">Skills</h2>
            <div className="flex flex-wrap gap-4">
              {userTechnologies.length > 0 ? (
                userTechnologies.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Badge variant="outline" className="text-lg py-2 px-4">
                      {skill.name}
                    </Badge>
                  </motion.div>
                ))
              ) : (
                <p>No skills to display</p> // Handle case where no technologies are available
              )}
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  )
}