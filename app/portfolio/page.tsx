'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useScroll, useSpring, useInView } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GithubIcon, LinkedinIcon, MailIcon, ExternalLinkIcon, ChevronDownIcon } from 'lucide-react'

interface Education {
  institution: string;
  degree: string;
  year: string;
}

interface Experience {
  company: string;
  logo: string;
  position: string;
  duration: string;
  description: string;
}

interface Project {
  name: string;
  description: string;
  technologies: string[];
  link: string;
}

interface Skill {
  name: string;
}

const personalInfo = {
  name: "Jane Doe",
  title: "Full Stack Developer",
  email: "jane.doe@example.com",
  github: "https://github.com/janedoe",
  linkedin: "https://linkedin.com/in/janedoe",
}

const education: Education[] = [
  {
    institution: "University of Technology",
    degree: "Bachelor of Science in Computer Science",
    year: "2018 - 2022",
  },
  {
    institution: "Code Academy",
    degree: "Full Stack Web Development Bootcamp",
    year: "2023",
  },
]

const experiences: Experience[] = [
  {
    company: "Tech Innovators Inc.",
    logo: "/placeholder.svg?height=40&width=40",
    position: "Full Stack Developer",
    duration: "2023 - Present",
    description: "Developing and maintaining web applications using React, Node.js, and PostgreSQL. Implementing new features and optimizing application performance.",
  },
  {
    company: "StartUp Solutions",
    logo: "/placeholder.svg?height=40&width=40",
    position: "Junior Web Developer",
    duration: "2022 - 2023",
    description: "Assisted in the development of responsive web designs and implemented front-end features using HTML, CSS, and JavaScript.",
  },
]

const projects: Project[] = [
  {
    name: "E-commerce Platform",
    description: "A full-featured e-commerce platform with user authentication, product management, and payment integration.",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    link: "https://github.com/janedoe/ecommerce-platform",
  },
  {
    name: "Task Management App",
    description: "A collaborative task management application with real-time updates and team features.",
    technologies: ["Vue.js", "Firebase", "Tailwind CSS"],
    link: "https://github.com/janedoe/task-manager",
  },
]

const skills: Skill[] = [
  { name: "JavaScript" },
  { name: "React" },
  { name: "Node.js" },
  { name: "TypeScript" },
  { name: "Python" },
  { name: "Express" },
  { name: "Tailwind CSS" },
]

export default function PortfolioPage() {
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
    skills: useRef(null),
  }

  const sectionInView = {
    about: useInView(sectionRefs.about, { once: true }),
    experience: useInView(sectionRefs.experience, { once: true }),
    projects: useInView(sectionRefs.projects, { once: true }),
    education: useInView(sectionRefs.education, { once: true }),
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
      
      <header className="py-20 text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <h1 className="text-6xl font-bold mb-4">{personalInfo.name}</h1>
          <p className="text-2xl mb-8">{personalInfo.title}</p>
          <div className="flex justify-center space-x-6">
            <a href={`mailto:${personalInfo.email}`} className="hover:text-primary transition-colors">
              <MailIcon size={24} />
            </a>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <GithubIcon size={24} />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <LinkedinIcon size={24} />
            </a>
          </div>
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
          {['about', 'experience', 'projects', 'education', 'skills'].map((section) => (
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
                <p>
                  I'm a passionate Full Stack Developer with a keen interest in building scalable web applications 
                  and exploring new technologies. With a strong foundation in both front-end and back-end development, 
                  I strive to create efficient, user-friendly solutions to complex problems.
                </p>
                <p>
                  When I'm not coding, you can find me contributing to open-source projects, writing tech blogs, 
                  or experimenting with new programming languages and frameworks.
                </p>
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
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                        <Image src={exp.logo} alt={exp.company} width={40} height={40} />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{exp.position}</CardTitle>
                        <CardDescription>{exp.company} | {exp.duration}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p>{exp.description}</p>
                    </CardContent>
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
                        {project.technologies.map((tech, i) => (
                          <Badge key={i} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardContent className="pt-0">
                      <Button asChild variant="outline" className="w-full">
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                          View Project <ExternalLinkIcon className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
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
                      <CardTitle className="text-xl">{edu.degree}</CardTitle>
                      <CardDescription>{edu.institution} | {edu.year}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="skills" ref={sectionRefs.skills}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={sectionInView.skills ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-8">Skills</h2>
            <div className="flex flex-wrap gap-4">
              {skills.map((skill, index) => (
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
              ))}
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  )
}