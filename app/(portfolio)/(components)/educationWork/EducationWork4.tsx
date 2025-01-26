import type { WorkExperience, Education } from "@/types/supabase-types"
import { CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function EducationWork4({ education, experiences }: { education: Education[]; experiences: WorkExperience[] }) {
  return (
    <section className="w-full">
        <h2 className="text-2xl font-bold mb-6">Work Experience</h2>
        <Timeline items={experiences} type="work" />
				<h2 className="text-2xl font-bold mb-6">Education</h2>
        <Timeline items={education} type="education" />
    </section>
  )
}

function Timeline({ items, type }: { items: (WorkExperience | Education)[], type: "work" | "education" }) {
	return (
		<CardContent className="p-0 mb-14">
			<ul className="ml-10 border-l">
				{items.map((item, index) => (
					<TimelineItem key={item.id || index} item={item} type={type} />
				))}
			</ul>
		</CardContent>
	)
}

function TimelineItem({ item, type }: { item: WorkExperience | Education; type: "work" | "education" }) {
  const isWorkExperience = type === "work"
  const name = isWorkExperience ? (item as WorkExperience).company : (item as Education).university
  const title = isWorkExperience ? (item as WorkExperience).position : (item as Education).degree
  const startDate = isWorkExperience ? (item as WorkExperience).start_date : (item as Education).start_year
  const endDate = isWorkExperience ? (item as WorkExperience).end_date : (item as Education).end_year
  const logoUrl = item.logoUrl

  return (
    <li className="relative ml-10 py-4">
			<div className="absolute -left-16 top-4 flex items-center justify-center bg-white">
				<Avatar className="size-12 flex items-center justify-center">
					<AvatarImage src={logoUrl || ""} alt={name} className="bg-background object-contain" />
					<AvatarFallback>{name[0]}</AvatarFallback>
				</Avatar>
			</div>
      <div className="flex flex-1 flex-col justify-start gap-1">
        <time className="text-sm text-muted-foreground">
          <span>{startDate}</span>
          <span>{" - "}</span>
          <span>{endDate || "Present"}</span>
        </time>
				<div className="flex items-center gap-2">
					<h2 className="font-semibold leading-none">{name}</h2>
					{title && <p className="text-md text-muted-foreground">{`| ${title}`}</p>}
				</div>
        {item.description && (
					<div className="prose pr-8 text-md dark:prose-invert">{item.description}</div>
				)}
      </div>
    </li>
  )
}

