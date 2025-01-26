import type { Technology } from "@/types/supabase-types"
import { Badge } from "@/components/ui/badge"

export default function Skills1({ userTechnologies }: { userTechnologies: Technology[] }) {
  return (
    <section id="skills" className="mb-14 bg-gradient-to-b from-background to-secondary/10">
      <h2 className="text-3xl font-bold mb-5">Skills</h2>
      <p className="text-base text-muted-foreground mb-3">
        Some of the technologies I've worked with:
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {userTechnologies.map((skill, index) => (
          <Badge
            key={skill.id || index}
            variant="secondary"
            className="text-sm py-2 px-4 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-md"
          >
            {skill.name}
          </Badge>
        ))}
      </div>
    </section>
  )
}

