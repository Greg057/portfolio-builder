import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PlusIcon, TrashIcon, UploadIcon } from 'lucide-react'
import { Education } from '@/types/supabase-types'
import { createClient } from "@/utils/supabase/client"

export default function EducationSection({
    educations,
    setEducations,
}: {
    educations: Education[]
    setEducations: React.Dispatch<React.SetStateAction<Education[]>>
}) {
    const addEducation = () => {
      setEducations([...educations, { degree: '', university: '', start_year: '', end_year: '', description: null, logoUrl: null, logoFile: null }])
    }
  
    const removeEducation = (index: number) => {
      setEducations(educations.filter((_, i) => i !== index))
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
        setEducations(educations.map((item, i) => 
          i === index ? { ...item, logoFile: file } : item
        ))
      }
    }
  
    return (
      <Card>
        <CardHeader>
          <CardTitle>Education</CardTitle>
          <CardDescription>List your educational background</CardDescription>
        </CardHeader>
        <CardContent>
          {educations.map((edu, index) => (
            <div key={index} className="space-y-4 mb-4">
              <div className="space-y-2">
                <Label>Degree</Label>
                <Input
                  placeholder="e.g., Bachelor of Science in Computer Science"
                  required
                  value={edu.degree}
                  onChange={(e) =>
                    setEducations(
                      educations.map((item, i) =>
                        i === index ? { ...item, degree: e.target.value } : item
                      )
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>University</Label>
                <Input
                  placeholder="e.g., University of Technology"
                  required
                  value={edu.university}
                  onChange={(e) =>
                    setEducations(
                      educations.map((item, i) =>
                        i === index ? { ...item, university: e.target.value } : item
                      )
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`logo-upload-${index}`}>University Logo</Label>
                <Input
                  id={`logo-upload-${index}`}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleLogoUpload(e, index)}
                />
                {edu.logoFile && (
                  <p className="text-sm text-muted-foreground">
                    Selected file: {edu.logoFile.name}
                  </p>
                )}
              </div>
              <div className="flex space-x-4">
                <div className="flex-1 space-y-2">
                  <Label>Start Year</Label>
                  <Input
                    placeholder="e.g., 2018"
                    required
                    value={edu.start_year}
                    onChange={(e) =>
                      setEducations(
                        educations.map((item, i) =>
                          i === index ? { ...item, start_year: e.target.value } : item
                        )
                      )
                    }
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <Label>End Year</Label>
                  <Input
                    placeholder="e.g., 2022"
                    value={edu.end_year || ""}
                    onChange={(e) =>
                      setEducations(
                        educations.map((item, i) =>
                          i === index ? { ...item, end_year: e.target.value } : item
                        )
                      )
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Optional details about your education"
                  value={edu.description || ""}
                  onChange={(e) =>
                    setEducations(
                      educations.map((item, i) =>
                        i === index ? { ...item, description: e.target.value } : item
                      )
                    )
                  }
                />
              </div>
              <Button
                type='button'
                variant="destructive"
                onClick={() => removeEducation(index)}
                className="mt-2"
              >
                <TrashIcon className="mr-2 h-4 w-4" />
                Remove
              </Button>
            </div>
          ))}
          <Button type='button' variant="outline" onClick={addEducation} className="mt-4">
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Education
          </Button>
        </CardContent>
      </Card>
    )
}

