'use client'

import { Technology } from '@/types/supabase-types'
import { motion } from 'framer-motion'
import { Badge } from "@/components/ui/badge"

interface SkillsHeaderProps {
  userTechnologies: Technology[]
  sectionRefs: any
  sectionInView: any
}

export default function Skills1({ userTechnologies, sectionRefs, sectionInView }: SkillsHeaderProps) {
    return (
        <section id="skills" ref={sectionRefs.skills}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={sectionInView.skills ? { opacity: 1, y: 0 } : {}}
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
    )
}