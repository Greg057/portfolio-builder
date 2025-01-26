import { Mail, Linkedin, MapPin, FileDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import type { UserInfo } from "@/types/supabase-types"

export default function UserInfo2({ personalInfo }: { personalInfo: UserInfo }) {
  return (
    <div className="max-w-4xl mx-auto my-20">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <Avatar className="w-40 h-40 border-4 border-primary">
          <AvatarImage src={personalInfo.avatarUrl || undefined} alt={`${personalInfo.full_name}'s avatar`} />
          <AvatarFallback>{personalInfo.full_name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{personalInfo.full_name}</h1>

          {personalInfo.title && <p className="text-xl mb-2 text-muted-foreground">{personalInfo.title}</p>}

          {personalInfo.location && (
            <p className="text-lg mb-4 text-muted-foreground flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              {personalInfo.location}
            </p>
          )}

          {personalInfo.about_me && <p className="mb-4">{personalInfo.about_me}</p>}

          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm" asChild>
              <a href={`mailto:${personalInfo.email}`} aria-label="Email">
                <Mail className="h-4 w-4 mr-2" />
                Email
              </a>
            </Button>
            {personalInfo.github && (
              <Button variant="outline" size="sm" asChild>
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <svg className="h-4 w-4 mr-2" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <title>GitHub</title>
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                  GitHub
                </a>
              </Button>
            )}
            {personalInfo.linkedin && (
              <Button variant="outline" size="sm" asChild>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </a>
              </Button>
            )}
            {personalInfo.x && (
              <Button variant="outline" size="sm" asChild>
                <a href={personalInfo.x} target="_blank" rel="noopener noreferrer" aria-label="X social media">
                  <svg className="h-4 w-4 mr-2" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <title>X</title>
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                  </svg>
                  X
                </a>
              </Button>
            )}
            {personalInfo.cvUrl && (
              <Button size="sm" asChild>
                <a href={personalInfo.cvUrl} target="_blank" download aria-label="View CV" rel="noreferrer">
                  <FileDown className="mr-2 size-5" />
                  Resume
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

