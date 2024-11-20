import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PlusIcon, TrashIcon } from '@radix-ui/react-icons'
import { Project } from '@/types/supabase-types'

export default function ProjectSection({
    projects,
    setProjects,
}: {
    projects: Project[];
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}) {
    const addProject = () => {
      setProjects([
        ...projects,
        { name: '', description: '', github_link: '', technologies: [] },
      ])
    }
  
    const removeProject = (index: number) => {
      setProjects(projects.filter((_, i) => i !== index))
    }
  
    return (
      <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
          <CardDescription>Showcase your coding projects</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {projects.map((proj, index) => (
            <div key={index} className="space-y-4 mb-4">
              <div className="flex space-x-4">
                <div className="flex-1 space-y-2">
                  <Label>Name</Label>
                  <Input
                    placeholder="Project Name"
                    required
                    value={proj.name || ""}
                    onChange={(e) =>
                      setProjects(
                        projects.map((item, i) =>
                          i === index ? { ...item, name: e.target.value } : item
                        )
                      )
                    }
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <Label>GitHub Link</Label>
                  <Input
                    placeholder="e.g., https://github.com/project"
                    value={proj.github_link || ""}
                    onChange={(e) =>
                      setProjects(
                        projects.map((item, i) =>
                          i === index
                            ? { ...item, github_link: e.target.value }
                            : item
                        )
                      )
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Short description of the project"
                  value={proj.description || ""}
                  onChange={(e) =>
                    setProjects(
                      projects.map((item, i) =>
                        i === index
                          ? { ...item, description: e.target.value }
                          : item
                      )
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Technologies</Label>
                <Input
                  placeholder="e.g., React, Node.js (comma-separated)"
                  value={proj.technologies.join(", ") || ""}
                  onChange={(e) =>
                    setProjects(
                      projects.map((item, i) =>
                        i === index
                          ? { 
                              ...item, 
                              technologies: e.target.value.split(",").map((tech) => tech.trim()) 
                            }
                          : item
                      )
                    )
                  }
                />
              </div>
              <Button
                variant="destructive"
                onClick={() => removeProject(index)}
                className="mt-2"
              >
                <TrashIcon className="mr-2 h-4 w-4" />
                Remove
              </Button>
            </div>
          ))}
          <Button type='button' variant="outline" onClick={addProject} className="mt-4">
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Project
          </Button>
        </CardContent>
      </Card>
    );
}