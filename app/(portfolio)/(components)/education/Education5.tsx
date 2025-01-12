'use client'

import { Education } from '@/types/supabase-types'
import BlurFade from '@/components/ui/blur-fade'
import { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronRightIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const BLUR_FADE_DELAY = 0.04;

export default function Education5({ education }: { education: Education[]}) {
	const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, edu: Education) => {
    if (edu.description) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

	return (
		<div className="flex min-h-0 flex-col gap-y-3">
			<BlurFade delay={BLUR_FADE_DELAY * 7}>
				<h2 className="text-xl font-bold">Education</h2>
			</BlurFade>
			{education.map((edu, index) => (
				<BlurFade
					key={edu.id || index}
					delay={BLUR_FADE_DELAY * 8 + index * 0.05}
				>
					<Link
						href="#"
						className="block cursor-pointer"
						onClick={(e) => handleClick(e, edu)}
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
										{edu.university}
										<ChevronRightIcon
											className={cn(
												"size-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100",
												isExpanded ? "rotate-90" : "rotate-0"
											)}
										/>
									</h3>
									<div className="text-xs sm:text-sm tabular-nums text-muted-foreground text-right">
										{edu.start_year} - {edu.end_year}
									</div>
								</div>
								<div className="font-sans text-xs">{edu.degree}</div>
							</CardHeader>
							{edu.description && (
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
									{edu.description}
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