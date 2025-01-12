'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { School, Calendar, ChevronDown } from 'lucide-react'
import { Education } from '@/types/supabase-types'

export default function Education3({ education }: { education: Education[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-center mb-8">Education</h2>
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-primary-foreground"></div>
        {education.map((edu, index) => (
          <motion.div
            key={edu.id || index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="mb-8"
          >
            <div className="relative pl-16">
            <div className="absolute left-[26px] top-8 w-4 h-4 bg-primary rounded-full"></div>
              <Card 
                className={`w-full shadow-lg hover:shadow-xl transition-shadow duration-300 relative ${edu.description ? 'cursor-pointer' : ''}`}
                onClick={() => edu.description && toggleExpand(edu.id || index.toString())}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center">
                        <School className="w-6 h-6 text-primary mr-2" />
                        <h3 className="text-xl font-semibold">{edu.university}</h3>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-lg text-muted-foreground">{edu.degree}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{edu.start_year} - {edu.end_year}</span>
                    </div>
                  </div>
                  {edu.description && (
                    <ChevronDown 
                      className={`absolute bottom-4 right-4 transition-transform duration-300 ${
                        expandedId === (edu.id || index.toString()) ? 'transform rotate-180' : ''
                      }`} 
                    />
                  )}
                  {expandedId === (edu.id || index.toString()) && edu.description && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-muted-foreground mt-4"
                    >
                      {edu.description}
                    </motion.p>
                  )}
                </CardContent>
              </Card>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

