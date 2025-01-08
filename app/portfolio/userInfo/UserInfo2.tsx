'use client'

import { UserInfo } from '@/types/supabase-types'
import { MailIcon, Github, Linkedin, ChevronDownIcon } from 'lucide-react'

export default function UserInfo2({ personalInfo }: { personalInfo: UserInfo }) {
  return (
    <header className="py-20 text-center relative overflow-hidden">
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
    </header>
  )
}