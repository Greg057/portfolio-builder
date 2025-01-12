import { Project } from '@/types/supabase-types'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLinkIcon } from 'lucide-react'
import BlurFade from '@/components/ui/blur-fade'
import Link from 'next/link'
import { cn } from '@/utils/cn'

const BLUR_FADE_DELAY = 0.04;

export default function Projects2({ projects }: { projects: Project[] }) {
    return (
			<div className="space-y-12 w-full py-12">
				<BlurFade delay={BLUR_FADE_DELAY * 11}>
					<div className="flex flex-col items-center justify-center space-y-4 text-center">
						<div className="space-y-2">
							<div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
								My Projects
							</div>
							<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
								Check out my latest work
							</h2>
						</div>
					</div>
				</BlurFade>
				<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
					{projects.map((project, index) => (
						<BlurFade
							key={project.id || index}
							delay={BLUR_FADE_DELAY * 12 + index * 0.05}
						>
							<Card
								className={
									"flex flex-col overflow-hidden border hover:shadow-lg transition-all duration-300 ease-out h-full"
								}
							>
								<Link
									href={project.live_link || "#"}
									className={cn("block cursor-pointer")}
								>
									{/* {project.image && (
										<Image
											src={image}
											alt={title}
											width={500}
											height={300}
											className="h-40 w-full overflow-hidden object-cover object-top"
										/>
									)} */}
								</Link>
								<CardHeader className="px-2">
									<div className="space-y-1">
										<CardTitle className="mt-1 text-base">{project.name}</CardTitle>
										<div className="hidden font-sans text-xs underline print:visible">
											{project.live_link?.replace("https://", "").replace("www.", "").replace("/", "")}
										</div>
										<div className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
											{project.description}
										</div>
									</div>
								</CardHeader>
								<CardContent className="mt-auto flex flex-col px-2">
									{project.technologyNames && (
										<div className="mt-2 flex flex-wrap gap-1">
											{project.technologyNames?.map((tech) => (
												<Badge
													className="px-1 py-0 text-[10px]"
													variant="secondary"
													key={tech}
												>
													{tech}
												</Badge>
											))}
										</div>
									)}
								</CardContent>
								<CardFooter className="px-2 pb-2">
										<div className="flex flex-row flex-wrap items-start gap-1">
											{project.github_link && (
												<Link href={project.github_link} target="_blank">
													<Badge className="flex gap-2 px-2 py-1 text-[10px]">
														<Github className="ml-2 h-4 w-4" />
														GitHub
													</Badge>
												</Link>
											)}
											{project.live_link && (
												<Link href={project.live_link} target="_blank">
													<Badge className="flex gap-2 px-2 py-1 text-[10px]">
														<ExternalLinkIcon className="ml-2 h-4 w-4" />
														Website
													</Badge>
												</Link>
											)}
										</div>
								</CardFooter>
							</Card>
						</BlurFade>
					))}
				</div>
			</div>
    )
}