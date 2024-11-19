import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusIcon, TrashIcon } from '@radix-ui/react-icons'
import { Skill } from '@/types/supabase-types'

export default function SkillsSection({
    skills,
    setSkills,
}: {
    skills: Skill[];
    setSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
}) {
    const addSkill = () => {
      setSkills([
        ...skills,
        { name: '' },
      ])
    }
  
    const removeSkill = (index: number) => {
      setSkills(skills.filter((_, i) => i !== index))
    }
  
    return (
      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
          <CardDescription>List your key technical skills</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Label>Skill</Label>
          {skills.map((skill, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center space-x-2">
                <Input
                  className="flex-1"
                  placeholder="e.g., JavaScript"
                  value={skill.name || ""}
                  onChange={(e) =>
                    setSkills(
                      skills.map((item, i) =>
                        i === index ? { ...item, name: e.target.value } : item
                      )
                    )
                  }
                />
                <Button
                  variant="destructive"
                  onClick={() => removeSkill(index)}
                  size="sm"
                  className="ml-2"
                >
                  <TrashIcon className="mr-2 h-4 w-4" />
                  Remove
                </Button>
              </div>
            </div>
          ))}
          <Button type='button' variant="outline" onClick={addSkill} className="mt-4">
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Skill
          </Button>
        </CardContent>
      </Card>
    );
}