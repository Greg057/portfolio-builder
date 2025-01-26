import Link from "next/link"
import { FileDown, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { UserInfo } from "@/types/supabase-types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function UserInfo4({ personalInfo }: { personalInfo: UserInfo }) {
  return (
    <section className="flex flex-col my-20 items-start gap-8 md:flex-row-reverse md:items-center md:justify-between">
			<Avatar className="w-40 h-40 mx-auto mb-8 border-4 border-primary">
        <AvatarImage src={personalInfo.avatarUrl || undefined} alt={`${personalInfo.full_name}'s avatar`} />
        <AvatarFallback>{personalInfo.full_name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <div className="text-4xl font-bold mb-3">Hi, I'm {personalInfo.full_name.split(" ")[0]} 👋</div>
        <p className="mb-3 text-lg font-semibold">
          {personalInfo.title && personalInfo.title}
          {personalInfo.location && ` from ${personalInfo.location}.`}
        </p>
        {personalInfo.about_me && <p className="mb-5">{personalInfo.about_me}</p>}
        <section className="flex items-center gap-2">
          {personalInfo.cvUrl && (
            <Link href={personalInfo.cvUrl} target="_blank">
              <Button variant="default">
                <span className="font-semibold">Resume</span>
                <FileDown className="ml-2 size-5" />
              </Button>
            </Link>
          )}
					<Button variant="outline" size="icon" asChild>
						<a href={`mailto:${personalInfo.email}`} aria-label="Email">
							<Mail className="h-5 w-5" />
						</a>
					</Button>
					{personalInfo.github && (
						<Button variant="outline" size="icon" asChild>
							<a href={personalInfo.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
								<svg className="h-5 w-5" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
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
					{personalInfo.x && (
						<Button variant="outline" size="icon" asChild>
							<a href={personalInfo.x} target="_blank" rel="noopener noreferrer" aria-label="X social media">
								<svg className="h-5 w-5" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>X</title><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>
							</a>
						</Button>
					)}
        </section>
      </div>
    </section>
  )
}

