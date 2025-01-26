import type { WorkExperience } from "@/types/supabase-types"
import { CalendarIcon } from "lucide-react"
import Image from "next/image"

export default function Experiences2({ experiences }: { experiences: WorkExperience[] }) {
  return (
    <section id="experience" className="my-20">
      <h2 className="text-3xl font-bold mb-10 text-center">Work Experience</h2>
      <div className="space-y-16">
        {experiences.map((exp, index) => (
          <div key={exp.id || index} className="relative">
            <div className="absolute left-0 top-0 w-[3px] h-full bg-primary rounded-full" />
            <div className="pl-8">
              <div className="flex flex-col md:flex-row md:items-center mb-4">
                <div className="flex items-center mb-2 md:mb-0">
                  {exp.logoUrl && (
                    <div className="relative w-12 h-12 mr-4">
                      <Image
                        src={exp.logoUrl || "/placeholder.svg"}
                        alt={`${exp.company} logo`}
                        fill
                        style={{ objectFit: "contain" }}
                        className="rounded-full bg-background p-1"
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-semibold">{exp.company}</h3>
                </div>
                <div className="md:ml-auto flex items-center text-sm text-muted-foreground">
                  <CalendarIcon className="w-4 h-4 mr-1" />
                  <span>
                    {exp.start_date} - {exp.end_date}
                  </span>
                </div>
              </div>
              <h4 className="text-lg font-medium mb-2">{exp.position}</h4>
              {exp.description && <p className="text-muted-foreground">{exp.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

