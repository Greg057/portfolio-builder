'use client'

import { Project } from '@/types/supabase-types'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLinkIcon } from 'lucide-react'

interface ProjectsHeaderProps {
  projects: Project[]
  sectionRefs: any
  sectionInView: any
}

export default function Projects1({ projects, sectionRefs, sectionInView }: ProjectsHeaderProps) {
    return (
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
                              GitHub <Github className="ml-2 h-4 w-4" />
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
    )
}