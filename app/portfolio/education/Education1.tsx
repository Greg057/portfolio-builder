'use client'

import { Education } from '@/types/supabase-types'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


interface EducationHeaderProps {
  education: Education[]
  sectionRefs: any
  sectionInView: any
}


export default function Education1({ education, sectionRefs, sectionInView }: EducationHeaderProps) {
    return (
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
    )
}