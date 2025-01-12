'use client'

import { motion } from 'framer-motion'
import { Card, CardHeader } from "@/components/ui/card"
import { ChevronRightIcon } from 'lucide-react'
import { WorkExperience } from '@/types/supabase-types'
import BlurFade from '@/components/ui/blur-fade'
import Link from 'next/link'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const BLUR_FADE_DELAY = 0.04;

export default function Experiences3({ experiences }: { experiences: WorkExperience[] }) {
	const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, exp: WorkExperience) => {
    if (exp.description) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };
	
  return (
    <div className="flex min-h-0 flex-col gap-y-3">
			<BlurFade delay={BLUR_FADE_DELAY * 5}>
				<h2 className="text-xl font-bold">Work Experience</h2>
			</BlurFade>
			{experiences.map((exp, index) => (
				<BlurFade
					key={exp.id || index}
					delay={BLUR_FADE_DELAY * 6 + index * 0.05}
				>
					<Link
						href="#"
						className="block cursor-pointer"
						onClick={(e) => handleClick(e, exp)}
					>
						<Card className="flex">
							<div className="flex-none">
							{/* <Avatar className="border size-12 m-auto bg-muted-background dark:bg-foreground">
								<AvatarImage
								src={logoUrl}
								alt={altText}
								className="object-contain"
								/>
								<AvatarFallback>{altText[0]}</AvatarFallback>
							</Avatar> */}
							</div>
							<div className="flex-grow ml-4 items-center flex-col group">
								<CardHeader>
									<div className="flex items-center justify-between gap-x-2 text-base">
										<h3 className="inline-flex items-center justify-center font-semibold leading-none text-xs sm:text-sm">
											{exp.company}
											<ChevronRightIcon
												className={cn(
													"size-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100",
													isExpanded ? "rotate-90" : "rotate-0"
												)}
											/>
										</h3>
										<div className="text-xs sm:text-sm tabular-nums text-muted-foreground text-right">
											{exp.start_date} - {exp.end_date}
										</div>
									</div>
									<div className="font-sans text-xs">{exp.position}</div>
								</CardHeader>
								{exp.description && (
									<motion.div
										initial={{ opacity: 0, height: 0 }}
										animate={{
											opacity: isExpanded ? 1 : 0,

											height: isExpanded ? "auto" : 0,
										}}
										transition={{
											duration: 0.7,
											ease: [0.16, 1, 0.3, 1],
										}}
										className="mt-2 text-xs sm:text-sm"
									>
										{exp.description}
									</motion.div>
								)}
							</div>
						</Card>
					</Link>
				</BlurFade>
			))}
		</div>
  )
}

