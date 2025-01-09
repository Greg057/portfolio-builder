'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { School, Calendar, ChevronDown } from 'lucide-react'
import { Education } from '@/types/supabase-types'

export default function Education4({ education }: { education: Education[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="space-y-8 py-12">
      <h2 className="text-3xl font-bold text-center mb-12">Education Journey</h2>
      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-primary-foreground transform -translate-x-1/2"></div>
        {education.map((edu, index) => (
          <motion.div
            key={edu.id || index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`mb-16 flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
          >
            <div className={`relative ${index % 2 === 0 ? 'pr-8' : 'pl-8'} w-1/2`}>
              <div className="absolute top-8 w-4 h-4 bg-primary rounded-full z-10"
                   style={{ [index % 2 === 0 ? 'right' : 'left']: '-8px' }}></div>
              <Card 
                className={`w-full shadow-lg hover:shadow-xl transition-shadow duration-300 ${edu.description ? 'cursor-pointer' : ''}`}
                onClick={() => edu.description && toggleExpand(edu.id || index.toString())}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold mb-0">{edu.university}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{edu.start_year} - {edu.end_year}</span>
                    </div>
                  </div>
                  <p className="text-lg text-muted-foreground">{edu.degree}</p>
                  {edu.description && (
                    <ChevronDown 
                      className={`mt-4 transition-transform duration-300 ${
                        expandedId === (edu.id || index.toString()) ? 'transform rotate-180' : ''
                      }`} 
                    />
                  )}
                </CardContent>
              </Card>
              <AnimatePresence>
                {expandedId === (edu.id || index.toString()) && edu.description && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="mt-4 bg-muted">
                      <CardContent className="p-4">
                        <p className="text-muted-foreground">{edu.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

