import type { Project } from "@/types/supabase-types"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Projects2({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="mb-14">
      <div className="text-center mb-5">
        <h2 className="text-2xl font-bold mb-3">Featured Projects</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">A collection of projects I've worked on.</p>
      </div>

      <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2">
        {projects.map((project, index) => (
          <div
            key={project.id || index}
            className="group relative flex flex-col overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg"
          >
            {project.picUrl ? (
              <div className="relative h-40 sm:h-48 w-full overflow-hidden">
                <Image
                  src={project.picUrl || "/placeholder.svg"}
                  alt={project.name}
                  fill
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ) : (
              <div className="h-40 sm:h-48 w-full bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">No image available</span>
              </div>
            )}

            <div className="flex flex-col flex-grow p-4 sm:p-5">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {project.name}
              </h3>

              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{project.description}</p>

              {project.technologyNames && project.technologyNames.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-auto mb-4">
                  {project.technologyNames.map((tech, i) => (
                    <Badge key={i} variant="secondary" className="text-xs px-2 py-0.5">
                      {tech}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-3 mt-auto">
                {project.live_link && (
                  <Link
                    href={project.live_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Live Site
                  </Link>
                )}
                {project.github_link && (
                  <Link
                    href={project.github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                  >
                    <Github className="h-4 w-4 mr-1" />
                    Code
                  </Link>
                )}
              </div>
            </div>

            {(project.live_link || project.github_link) && (
              <Link
                href={project.live_link || project.github_link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-label={`View ${project.name}`}
              >
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

