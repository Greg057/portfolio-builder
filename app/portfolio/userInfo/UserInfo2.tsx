'use client'

import { UserInfo } from '@/types/supabase-types'
import { motion } from 'framer-motion'
import { MailIcon, Github, Linkedin, ChevronDownIcon } from 'lucide-react'

interface HeaderProps {
  personalInfo: UserInfo
  handleScroll: (section: string) => void
}

export default function UserInfo2({ personalInfo, handleScroll }: HeaderProps) {
  return (
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
                  <Github size={24} />
                </a>
              )}
              {personalInfo?.linkedin && (
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  <Linkedin size={24} />
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
  )
}