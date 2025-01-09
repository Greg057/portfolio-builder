'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, MapPin } from 'lucide-react'
import { WorkExperience } from '@/types/supabase-types'

export default function Experiences2({ experiences }: { experiences: WorkExperience[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="space-y-8 py-12">
      <h2 className="text-3xl font-bold text-center mb-12">Professional Journey</h2>
      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary to-primary-foreground transform -translate-x-1/2"></div>
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id || index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="mb-16"
          >
            <div className="relative pl-8 sm:pl-32 py-6 group">
              <div className="flex flex-col sm:flex-row items-start mb-1 group-odd:flex-row-reverse">
                <Card className="w-full sm:w-[calc(50%-4rem)] group-odd:ml-8">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <Badge variant="outline" className="text-sm font-medium">
                        {exp.start_date} - {exp.end_date}
                      </Badge>
                      {exp.description && (
                        <button
                          onClick={() => toggleExpand(exp.id || index.toString())}
                          className="text-primary hover:text-primary-foreground transition-colors"
                          aria-label={expandedId === (exp.id || index.toString()) ? "Collapse details" : "Expand details"}
                        >
                          <ChevronDown
                            className={`transition-transform duration-300 ${
                              expandedId === (exp.id || index.toString()) ? 'transform rotate-180' : ''
                            }`}
                          />
                        </button>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{exp.position}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <MapPin size={14} className="mr-1" />
                      <span>{exp.company}</span>
                    </div>
                    <AnimatePresence>
                      {expandedId === (exp.id || index.toString()) && exp.description && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <p className="text-muted-foreground mt-4">{exp.description}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

