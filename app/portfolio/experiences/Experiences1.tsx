'use client'

import { WorkExperience } from '@/types/supabase-types'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ExperiencesHeaderProps {
  experiences: WorkExperience[]
  sectionRefs: any
  sectionInView: any
}

export default function Experiences1({ experiences, sectionRefs, sectionInView }: ExperiencesHeaderProps) {
    return (
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
    )
}