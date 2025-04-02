import { WorkExperience, Education } from '@/types/supabase-types';
import Image from 'next/image';
import { CalendarIcon } from 'lucide-react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

export default function EducationWork2({ education, experiences }: { education: Education[], experiences: WorkExperience[] }) {
  return (
		<>
			<section id="experience" className="my-20">
				<h2 className="text-2xl font-bold mb-5">Work Experience</h2>
				<div className="space-y-16">
					{experiences.map((exp, index) => (
						<div key={exp.id || index} className="relative">
							<div className="absolute left-0 top-0 w-[3px] h-2/3 bg-primary rounded-full opacity-10" />
							<div className="pl-8">
								<div className="flex flex-col md:flex-row md:items-center mb-4">
									<div className="flex items-center mb-2 md:mb-0">
										{exp.logoUrl && (
											<Avatar className="size-12 mr-3 flex items-center justify-center rounded-none">
												<AvatarImage src={exp.logoUrl || ""} alt={`${exp.company} logo`} className="bg-background object-cover" />
											</Avatar>
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
			<section id="experience" className="my-20">
				<h2 className="text-2xl font-bold mb-5">Education</h2>
				<div className="space-y-16">
					{education.map((edu, index) => (
						<div key={edu.id || index} className="relative">
							<div className="absolute left-0 top-0 w-[3px] h-2/3 bg-primary rounded-full opacity-10" />
							<div className="pl-8">
								<div className="flex flex-col md:flex-row md:items-center mb-4">
									<div className="flex items-center mb-2 md:mb-0">
										{edu.logoUrl && (
											<Avatar className="size-12 mr-3 flex items-center justify-center rounded-none">
												<AvatarImage src={edu.logoUrl || ""} alt={`${edu.university} logo`} className="bg-background object-contain" />
											</Avatar>
										)}
										<h3 className="text-xl font-semibold">{edu.university}</h3>
									</div>
									<div className="md:ml-auto flex items-center text-sm text-muted-foreground">
										<CalendarIcon className="w-4 h-4 mr-1" />
										<span>
											{edu.start_year} - {edu.end_year}
										</span>
									</div>
								</div>
								<h4 className="text-lg font-medium mb-2">{edu.degree}</h4>
								{edu.description && <p className="text-muted-foreground">{edu.description}</p>}
							</div>
						</div>
					))}
				</div>
			</section>
		</>
	);
}