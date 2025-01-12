import { Education } from '@/types/supabase-types'
import { Badge } from "@/components/ui/badge"

export default function Education2({ education }: { education: Education[] }) {
  return (
    <section id="education" className="py-16">
      <h2 className="text-3xl font-bold mb-10 text-center">Educational Journey</h2>
      <div className="space-y-12">
        {education.map((edu, index) => (
          <div key={edu.id || index} className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-full md:w-1/3 space-y-2">
              <h3 className="text-xl font-semibold">{edu.university}</h3>
              <Badge variant="secondary" className="text-sm">
                {edu.start_year} - {edu.end_year}
              </Badge>
            </div>
            <div className="w-full md:w-2/3 space-y-4">
              <h4 className="text-lg font-medium">{edu.degree}</h4>
              {edu.description && (
                <p className="text-muted-foreground">{edu.description}</p>
              )}
              <div className="w-full h-px bg-border" aria-hidden="true" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

