import { Mail, Github, Linkedin } from 'lucide-react'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { UserInfo } from '@/types/supabase-types'

export default function UserInfo1({ personalInfo }: { personalInfo: UserInfo }) {
  return (
    <header className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-background to-background/50">
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
    </header>
  )
}