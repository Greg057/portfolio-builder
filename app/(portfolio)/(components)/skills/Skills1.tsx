import { Technology } from '@/types/supabase-types'
import { Badge } from "@/components/ui/badge"

export default function Skills1({ userTechnologies }: { userTechnologies: Technology[] }) {
    return (
        <section id="skills">
            <h2 className="text-3xl font-bold mb-8">Skills</h2>
            <div className="flex flex-wrap gap-4">
              {userTechnologies.length > 0 ? (
                userTechnologies.map((skill, index) => (
                    <Badge key={skill.id || index} variant="outline" className="text-lg py-2 px-4">
                      {skill.name}
                    </Badge>
                ))
              ) : (
                <p>No skills to display</p> // Handle case where no technologies are available
              )}
            </div>
        </section>
    )
}