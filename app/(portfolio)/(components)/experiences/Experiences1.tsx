import { WorkExperience } from '@/types/supabase-types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';

export default function Experiences1({ experiences }: { experiences: WorkExperience[] }) {
  return (
    <section id="experience" className="mb-14">
      <h2 className="text-3xl font-bold mb-5">Work Experience</h2>
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <Card key={exp.id || index} className="bg-card overflow-hidden">
            <CardHeader className="flex flex-row items-center space-x-4 pb-4">
              {exp.logoUrl && (
                <Image
                  src={exp.logoUrl}
                  alt={`${exp.company} logo`}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              )}
              <div>
                <CardTitle className="text-xl">{exp.company}</CardTitle>
                <CardDescription>{exp.position} | {exp.start_date} - {exp.end_date}</CardDescription>
              </div>
            </CardHeader>
            {exp.description && (
              <CardContent>
                <p>{exp.description}</p>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
}