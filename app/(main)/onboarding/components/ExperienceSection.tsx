'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PlusIcon, TrashIcon } from '@radix-ui/react-icons'
import { WorkExperience } from '@/types/supabase-types'
import { createClient } from "@/utils/supabase/client"

export default function ExperienceSection({
    experiences,
    setExperiences,
}: {
    experiences: WorkExperience[]
    setExperiences: React.Dispatch<React.SetStateAction<WorkExperience[]>>
}) {
    const addExperience = () => {
      setExperiences([
        ...experiences,
        { company: '', position: '', start_date: '', end_date: '', description: null, logoUrl: null, logoFile: null },
      ])
    }
  
    const removeExperience = (index: number) => {
      setExperiences(experiences.filter((_, i) => i !== index))
    }

    const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("You need to sign in to upload files")
        return;
      }
            
      const file = e.target.files?.[0];
      if (file) {
        setExperiences(experiences.map((item, i) => 
          i === index ? { ...item, logoFile: file } : item
        ))
      }
    }
  
    return (
      <Card>
        <CardHeader>
          <CardTitle>Work Experience</CardTitle>
          <CardDescription>Add your professional experience</CardDescription>
        </CardHeader>
        <CardContent>
          {experiences.map((exp, index) => (
            <div key={index} className="space-y-4 mb-4">
              <div className="space-y-4 mb-4">
                <Label>Company</Label>
                <Input
                  placeholder="e.g., Tech Innovators Inc."
                  required
                  value={exp.company}
                  onChange={(e) =>
                    setExperiences(
                      experiences.map((item, i) =>
                        i === index ? { ...item, company: e.target.value } : item
                      )
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Position</Label>
                <Input
                  placeholder="e.g., Full Stack Developer"
                  required
                  value={exp.position}
                  onChange={(e) =>
                    setExperiences(
                      experiences.map((item, i) =>
                        i === index ? { ...item, position: e.target.value } : item
                      )
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`logo-upload-${index}`}>Company Logo</Label>
                <Input
                  id={`logo-upload-${index}`}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleLogoUpload(e, index)}
                />
                {exp.logoFile && (
                  <p className="text-sm text-muted-foreground">
                    Selected file: {exp.logoFile.name}
                  </p>
                )}
              </div>
              <div className="flex space-x-4">
                <div className="flex-1 space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    placeholder="e.g., January 2023"
                    required
                    value={exp.start_date}
                    onChange={(e) =>
                      setExperiences(
                        experiences.map((item, i) =>
                          i === index ? { ...item, start_date: e.target.value } : item
                        )
                      )
                    }
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <Label>End Date</Label>
                  <Input
                    placeholder="e.g., December 2023 or Present"
                    value={exp.end_date || ""}
                    onChange={(e) =>
                      setExperiences(
                        experiences.map((item, i) =>
                          i === index ? { ...item, end_date: e.target.value } : item
                        )
                      )
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Describe your role and achievements"
                  value={exp.description || ""}
                  onChange={(e) =>
                    setExperiences(
                      experiences.map((item, i) =>
                        i === index ? { ...item, description: e.target.value } : item
                      )
                    )
                  }
                />
              </div>
              <Button
                type='button'
                variant="destructive"
                onClick={() => removeExperience(index)}
                className="mt-2"
              >
                <TrashIcon className="mr-2 h-4 w-4" />
                Remove
              </Button>
            </div>
          ))}
          <Button type='button' variant="outline" onClick={addExperience} className="mt-4">
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Experience
          </Button>
        </CardContent>
      </Card>
    )
}