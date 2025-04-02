import { WorkExperience, Education } from '@/types/supabase-types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

export default function EducationWork1({ education, experiences }: { education: Education[], experiences: WorkExperience[] }) {
  return (
		<>
			<section id="experience" className="mb-14">
				<h2 className="text-2xl font-bold mb-5">Work Experience</h2>
				<div className="space-y-4">
					{experiences.map((exp, index) => (
						<Card key={exp.id || index} className="bg-card overflow-hidden">
							<CardHeader className="flex flex-row items-center space-x-4 py-4">
								{exp.logoUrl && (
									<Avatar className="size-12 flex items-center justify-center rounded-none">
										<AvatarImage src={exp.logoUrl || ""} alt={`${exp.company} logo`} className="bg-background object-cover" />
									</Avatar>
								)}
								<div>
									<CardTitle className="text-xl">{exp.company}</CardTitle>
									<CardDescription>{exp.position} | {exp.start_date} - {exp.end_date}</CardDescription>
								</div>
							</CardHeader>
							{exp.description && (
								<CardContent className='pb-4'>
									<p>{exp.description}</p>
								</CardContent>
							)}
						</Card>
					))}
				</div>
			</section>
			<section id="education" className="mb-14">
				<h2 className="text-2xl font-bold mb-5">Education</h2>
				<div className="space-y-4">
					{education.map((edu, index) => (
						<Card key={edu.id || index} className="bg-card">
							<CardHeader className="flex flex-row items-center space-x-4 py-4">
								{edu.logoUrl && (
									<Avatar className="size-12 flex items-center justify-center rounded-none">
										<AvatarImage src={edu.logoUrl || ""} alt={`${edu.university} logo`} className="bg-background object-contain" />
									</Avatar>
								)}
								<div>
									<CardTitle className="text-xl">{edu.university}</CardTitle>
									<CardDescription>
										{edu.degree} | {edu.start_year} - {edu.end_year}
									</CardDescription>
								</div>
							</CardHeader>
							{edu.description && (
								<CardContent className='pb-4'>
									<p>{edu.description}</p>
								</CardContent>
							)}
						</Card>
					))}
				</div>
			</section>
		</>
	);
}