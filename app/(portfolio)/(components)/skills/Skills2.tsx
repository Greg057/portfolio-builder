import type { Technology } from "@/types/supabase-types"
import { Badge } from "@/components/ui/badge"

export default function Skills2({ userTechnologies }: { userTechnologies: Technology[] }) {
  return (
    <section id="skills" className="mb-14">
      <div className="text-center mb-3">
        <h2 className="text-2xl font-bold mb-4">Technical Skills</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Technologies and tools I've worked with throughout my career
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {userTechnologies.map((tech) => (
          <Badge
            key={tech.id}
            variant="outline"
            className="px-4 py-2 text-sm font-medium border border-border hover:bg-accent transition-colors duration-200"
          >
            {tech.name}
          </Badge>
        ))}
      </div>
    </section>
  )
}

