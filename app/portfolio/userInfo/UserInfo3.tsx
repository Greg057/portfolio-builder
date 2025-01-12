import { Mail, Github, Linkedin, MailIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { UserInfo } from '@/types/supabase-types'
import BlurFadeText from '@/components/ui/blur-fade-text'
import BlurFade from '@/components/ui/blur-fade'
import { Card, CardContent } from '@/components/ui/card'

const BLUR_FADE_DELAY = 0.04;

export default function UserInfo3({ personalInfo }: { personalInfo: UserInfo }) {
  return (
    <div className="mx-auto w-full max-w-2xl space-y-8">
			<div className="gap-2 flex justify-between">
				<div className="flex-col flex flex-1 space-y-1.5">
					<BlurFadeText
						delay={BLUR_FADE_DELAY}
						className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
						yOffset={8}
						text={`Hi, I'm ${personalInfo.full_name}`}
					/>
					<BlurFadeText
						className="max-w-[600px] md:text-xl"
						delay={BLUR_FADE_DELAY}
						text={personalInfo.title || ""}
					/>
				</div>
				{/* <BlurFade delay={BLUR_FADE_DELAY}>
					<Avatar className="size-28 border">
						<AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
						<AvatarFallback>{DATA.initials}</AvatarFallback>
					</Avatar>
				</BlurFade> */}
			</div>
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
			<h2 className="text-3xl font-bold mb-8">About Me</h2>
			<Card className="bg-card">
				<CardContent className="prose prose-lg dark:prose-invert">
				<p>{personalInfo?.about_me}</p>
				</CardContent>
			</Card>
		</div>
  )
}