'use client'

import { Education } from '@/types/supabase-types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Education1({ education }: { education: Education[]}) {
    return (
      <section id="education" className="mb-20">
          <h2 className="text-3xl font-bold mb-8">Education</h2>
          <div className="space-y-8">
            {education.map((edu, index) => (
              <Card key={edu.id || index} className="bg-card">
                <CardHeader>
                  <CardTitle className="text-xl">{edu.university}</CardTitle>
                  <CardDescription>
                    {edu.degree} | {edu.start_year}-{edu.end_year}
                  </CardDescription>
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
    )
}