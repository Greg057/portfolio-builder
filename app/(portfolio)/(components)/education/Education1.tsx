import { Education } from '@/types/supabase-types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';

export default function Education1({ education }: { education: Education[] }) {
  return (
    <section id="education" className="mb-20">
      <h2 className="text-3xl font-bold mb-8">Education</h2>
      <div className="space-y-8">
        {education.map((edu, index) => (
          <Card key={edu.id || index} className="bg-card">
            <CardHeader className="flex flex-row items-center space-x-4 pb-4">
              {edu.logoUrl && (
                <Image
                  src={edu.logoUrl}
                  alt={`${edu.university} logo`}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              )}
              <div>
                <CardTitle className="text-xl">{edu.university}</CardTitle>
                <CardDescription>
                  {edu.degree} | {edu.start_year}-{edu.end_year}
                </CardDescription>
              </div>
            </CardHeader>
            {edu.description && (
              <CardContent className="prose prose-lg dark:prose-invert">
                <p>{edu.description}</p>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
}