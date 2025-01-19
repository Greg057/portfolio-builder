'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PlusIcon, TrashIcon } from '@radix-ui/react-icons';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Project } from '@/types/supabase-types';
import { v4 as uuidv4 } from 'uuid';
import { createClient } from '@/utils/supabase/client';

// Initial list of all available technologies
const initialAvailableTechnologies = [
  { value: 1, label: 'JavaScript' },
  { value: 2, label: 'TypeScript' },
  { value: 3, label: 'React' },
  { value: 4, label: 'Next.js' },
  { value: 5, label: 'Node.js' },
];

export default function ProjectSection({
  projects,
  setProjects,
}: {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}) {
  // Ensure all projects have availableTechnologies initialized
  const initializeAvailableTechnologies = (technologies: number[]) => {
    return initialAvailableTechnologies.filter(
      (techID) => !technologies.includes(techID.value)
    );
  };

  const addProject = () => {
    setProjects([
      ...projects,
      {
        id: uuidv4(),
        name: '',
        description: null,
        github_link: null,
        live_link: null,
        technologies: [],
        availableTechnologies: [...initialAvailableTechnologies], // Initialize with the full available list
        picUrl: null,
        picFile: null
      },
    ]);
  };

  const removeProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const updateProject = (index: number, field: keyof Project, value: any) => {
    setProjects(
      projects.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const addTechnologyToProject = (projectIndex: number, techID: number) => {
    setProjects(
      projects.map((proj, i) =>
        i === projectIndex
          ? {
              ...proj,
              technologies: [...(proj.technologies || []), techID],
              availableTechnologies: initializeAvailableTechnologies([
                ...(proj.technologies || []),
                techID,
              ]),
            }
          : proj
      )
    );
  };

  const removeTechnologyFromProject = (projectIndex: number, techID: number) => {
    setProjects(
      projects.map((proj, i) =>
        i === projectIndex
          ? {
              ...proj,
              technologies: proj.technologies?.filter((t) => t !== techID),
              availableTechnologies: initializeAvailableTechnologies(
                proj.technologies?.filter((t) => t !== techID) || []
              ),
            }
          : proj
      )
    );
  };

  const handlePicUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
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
          setProjects(projects.map((item, i) => 
            i === index ? { ...item, picFile: file } : item
          ))
        }
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
                  value={proj.name || ''}
                  onChange={(e) => updateProject(index, 'name', e.target.value)}
                />
              </div>
              <div className="flex-1 space-y-2">
                <Label>GitHub Link</Label>
                <Input
                  placeholder="e.g., https://github.com/project"
                  value={proj.github_link || ''}
                  onChange={(e) =>
                    updateProject(index, 'github_link', e.target.value)
                  }
                />
              </div>
              <div className="flex-1 space-y-2">
                <Label>Live Link</Label>
                <Input
                  placeholder="e.g., https://your-live-site.com"
                  value={proj.live_link || ''}
                  onChange={(e) =>
                    updateProject(index, 'live_link', e.target.value)
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor={`logo-upload-${index}`}>Upload Picture</Label>
                <Input
                  id={`logo-upload-${index}`}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handlePicUpload(e, index)}
                />
                {proj.picFile && (
                  <p className="text-sm text-muted-foreground">
                    Selected file: {proj.picFile.name}
                  </p>
                )}
              </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Short description of the project"
                value={proj.description || ''}
                onChange={(e) =>
                  updateProject(index, 'description', e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Technologies</Label>
              <div className="flex flex-wrap gap-2">
                {proj.technologies?.map((techID) => (
                  <Button
                    key={techID}
                    variant="outline"
                    size="sm"
                    onClick={() => removeTechnologyFromProject(index, techID)}
                  >
                    {initialAvailableTechnologies.find(
                      (t) => t.value === techID
                    )?.label || techID}
                    <TrashIcon className="ml-2 h-4 w-4" />
                  </Button>
                ))}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">
                      Add Technology
                      <PlusIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search technology..." />
                      <CommandList>
                        <CommandEmpty>No technology found.</CommandEmpty>
                        <CommandGroup>
                          {proj.availableTechnologies?.map((techOption) => (
                            <CommandItem
                              key={techOption.value}
                              onSelect={() => {
                                addTechnologyToProject(index, techOption.value);
                              }}
                            >
                              {techOption.label}
                              <Check
                                className={cn(
                                  'ml-auto',
                                  proj.technologies?.includes(techOption.value)
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <Button
              type="button"
              variant="destructive"
              onClick={() => removeProject(index)}
              className="mt-2"
            >
              <TrashIcon className="mr-2 h-4 w-4" />
              Remove
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={addProject}
          className="mt-4"
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Project
        </Button>
      </CardContent>
    </Card>
  );
}
