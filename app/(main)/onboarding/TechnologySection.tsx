'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Technology } from '@/types/supabase-types';

// Initial list of all available technologies
const initialAvailableTechnologies = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'react', label: 'React' },
  { value: 'nextjs', label: 'Next.js' },
  { value: 'nodejs', label: 'Node.js' },
];

export default function TechnologySection({
  technologies,
  setTechnologies,
}: {
  technologies: Technology[];
  setTechnologies: React.Dispatch<React.SetStateAction<Technology[]>>;
}) {
  const [availableTechnologies, setAvailableTechnologies] = useState(
    initialAvailableTechnologies
  );
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const addTechnology = () => {
    setTechnologies([...technologies, { name: '', id: '' }]);
  };

  const removeTechnology = (index: number) => {
    const removedTech = technologies[index].name;
    if (removedTech) {
      // Add the removed technology back to the available list
      const removedTechOption = initialAvailableTechnologies.find(
        (tech) => tech.value === removedTech
      );
      if (removedTechOption) {
        setAvailableTechnologies((prev) => [...prev, removedTechOption]);
      }
    }
    setTechnologies(technologies.filter((_, i) => i !== index));
  };

  const updateTechnology = (index: number, techName: string) => {
    const previouslySelectedTech = technologies[index].name;

    // If switching technologies, first add the previously selected one back to the available list
    if (previouslySelectedTech && previouslySelectedTech !== techName) {
      const prevTechOption = initialAvailableTechnologies.find(
        (tech) => tech.value === previouslySelectedTech
      );
      if (prevTechOption) {
        setAvailableTechnologies((prev) => [...prev, prevTechOption]);
      }
    }

    // Remove the selected technology from the available list
    const selectedTechOption = initialAvailableTechnologies.find(
      (tech) => tech.value === techName
    );
    if (selectedTechOption) {
      setAvailableTechnologies((prev) =>
        prev.filter((tech) => tech.value !== techName)
      );
    }

    // Update the technology for the current index
    setTechnologies(
      technologies.map((item, i) =>
        i === index ? { ...item, name: techName } : item
      )
    );
  };

  const toggleOpen = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Technologies</CardTitle>
        <CardDescription>Select your key technical skills</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {technologies.map((tech, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center space-x-2">
              <Popover
                open={openIndexes.includes(index)}
                onOpenChange={() => toggleOpen(index)}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openIndexes.includes(index)}
                    className="flex-1 justify-between"
                  >
                    {tech.name
                      ? initialAvailableTechnologies.find(
                          (t) => t.value === tech.name
                        )?.label || tech.name
                      : 'Select technology...'}
                    <PlusIcon className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search technology..." />
                    <CommandList>
                      <CommandEmpty>No technology found.</CommandEmpty>
                      <CommandGroup>
                        {availableTechnologies.map((techOption) => (
                          <CommandItem
                            key={techOption.value}
                            onSelect={() => {
                              updateTechnology(index, techOption.value);
                              toggleOpen(index);
                            }}
                          >
                            {techOption.label}
                            <Check
                              className={cn(
                                'ml-auto',
                                techOption.value === tech.name
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
              <Button
                type="button"
                variant="destructive"
                onClick={() => removeTechnology(index)}
                size="sm"
                className="ml-2"
              >
                <TrashIcon className="mr-2 h-4 w-4" />
                Remove
              </Button>
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={addTechnology}
          className="mt-4"
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Skill
        </Button>
      </CardContent>
    </Card>
  );
}
