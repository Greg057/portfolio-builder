import { Technology } from '@/types/supabase-types'
import { Badge } from "@/components/ui/badge"
import BlurFade from '@/components/ui/blur-fade'

const BLUR_FADE_DELAY = 0.04;

export default function Skills2({ userTechnologies }: { userTechnologies: Technology[] }) {
    return (
			<div className="flex min-h-0 flex-col gap-y-3">
				<BlurFade delay={BLUR_FADE_DELAY * 9}>
					<h2 className="text-xl font-bold">Skills</h2>
				</BlurFade>
				<div className="flex flex-wrap gap-1">
					{userTechnologies.map((tech, id) => (
						<BlurFade key={tech.id || id} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
							<Badge key={tech.id || id}>{tech.name}</Badge>
						</BlurFade>
					))}
				</div>
			</div>
    )
}