import type { WorkExperience, Education } from "@/types/supabase-types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function EducationWork3({ education, experiences }: { education: Education[]; experiences: WorkExperience[] }) {
  return (
    <Tabs defaultValue="work" className="w-full mb-14">
      <TabsList className="mb-2 grid w-full grid-cols-2">
        <TabsTrigger value="work">Work Experience</TabsTrigger>
        <TabsTrigger value="education">Education</TabsTrigger>
      </TabsList>
      <TabsContent value="work">
        <Timeline items={experiences} type="work" />
      </TabsContent>
      <TabsContent value="education">
        <Timeline items={education} type="education" />
      </TabsContent>
    </Tabs>
  )
}

function Timeline({ items, type }: { items: (WorkExperience | Education)[], type: "work" | "education" }) {
	return (
		<CardContent className="p-0">
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
			<div className="absolute -left-16 top-4 flex items-center justify-center rounded-full bg-white">
				<Avatar className="size-12 border rounded-full">
					<AvatarImage src={logoUrl || ""} alt={name} className="bg-background object-center rounded-full" />
					<AvatarFallback>{name[0]}</AvatarFallback>
				</Avatar>
			</div>
      <div className="flex flex-1 flex-col justify-start gap-1">
        <time className="text-xs text-muted-foreground">
          <span>{startDate}</span>
          <span>{" - "}</span>
          <span>{endDate || "Present"}</span>
        </time>
				<div className="flex items-center gap-2">
					<h2 className="font-semibold leading-none">{name}</h2>
					{title && <p className="text-sm text-muted-foreground">{`| ${title}`}</p>}
				</div>
        {item.description && (
					<div className="prose pr-8 text-sm dark:prose-invert">{item.description}</div>
				)}
      </div>
    </li>
  )
}

