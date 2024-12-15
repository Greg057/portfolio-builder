'use client'

import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, ChevronDown } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { UserInfo } from '@/types/supabase-types'

interface UserInfoHeaderProps {
  personalInfo: UserInfo
  handleScroll: (sectionId: string) => void
}

export default function UserInfo1({ personalInfo, handleScroll }: UserInfoHeaderProps) {
  return (
    <header className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-background to-background/50">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-4"
      >
        <Avatar className="w-32 h-32 mx-auto mb-8 border-4 border-primary">
          <AvatarFallback>{personalInfo.full_name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          {personalInfo.full_name}
        </h1>
        {personalInfo.title && (
          <p className="text-xl sm:text-2xl mb-8 text-muted-foreground">{personalInfo.title}</p>
        )}
        <div className="flex justify-center space-x-4 mb-12">
          <Button variant="outline" size="icon" asChild>
            <a href={`mailto:${personalInfo.email}`} aria-label="Email">
              <Mail className="h-5 w-5" />
            </a>
          </Button>
          {personalInfo.github && (
            <Button variant="outline" size="icon" asChild>
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
            </Button>
          )}
          {personalInfo.linkedin && (
            <Button variant="outline" size="icon" asChild>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
          )}
        </div>
      </motion.div>
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-background blur-3xl" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full animate-bounce"
          onClick={() => handleScroll('about')}
          aria-label="Scroll to About section"
        >
          <ChevronDown className="h-8 w-8" />
        </Button>
      </motion.div>
    </header>
  )
}