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
import { UserTechnology } from '@/types/supabase-types';

// Initial list of all available technologies
const initialAvailableTechnologies = [
  { value: 1, label: 'JavaScript' },
  { value: 2, label: 'TypeScript' },
  { value: 3, label: 'React' },
  { value: 4, label: 'Next.js' },
  { value: 5, label: 'Node.js' },
];

export default function TechnologySection({
  userTechnologies,
  setUserTechnologies,
}: {
  userTechnologies: UserTechnology[];
  setUserTechnologies: React.Dispatch<React.SetStateAction<UserTechnology[]>>;
}) {
  const [availableTechnologies, setAvailableTechnologies] = useState(
    initialAvailableTechnologies
  );
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const addTechnology = () => {
    setUserTechnologies([...userTechnologies, { technology_id: null }]);
  };

  const removeTechnology = (index: number) => {
    const removedTech = userTechnologies[index].technology_id;
    if (removedTech) {
      // Add the removed technology back to the available list
      const removedTechOption = initialAvailableTechnologies.find(
        (tech) => tech.value === removedTech
      );
      if (removedTechOption) {
        setAvailableTechnologies((prev) => [...prev, removedTechOption]);
      }
    }
    setUserTechnologies(userTechnologies.filter((_, i) => i !== index));
  };

  const updateTechnology = (index: number, techID: number) => {
    const previouslySelectedTech = userTechnologies[index].technology_id;
  
    // Add the previously selected technology back to the available list
    if (previouslySelectedTech && previouslySelectedTech !== techID) {
      const prevTechOption = initialAvailableTechnologies.find(
        (tech) => tech.value === previouslySelectedTech
      );
      if (prevTechOption) {
        setAvailableTechnologies((prev) =>
          prev.some((t) => t.value === prevTechOption.value)
            ? prev
            : [...prev, prevTechOption]
        );
      }
    }
  
    // Remove the newly selected technology from the available list
    const selectedTechOption = initialAvailableTechnologies.find(
      (tech) => tech.value === techID
    );
    if (selectedTechOption) {
      setAvailableTechnologies((prev) =>
        prev.filter((tech) => tech.value !== techID)
      );
    }
  
    // Update the technology in userTechnologies
    setUserTechnologies(
      userTechnologies.map((item, i) =>
        i === index ? { ...item, technology_id: techID } : item
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
        {userTechnologies.map((tech, index) => (
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
                    aria-expanded={openIndexes.includes(tech.technology_id!)}
                    className="flex-1 justify-between"
                  >
                    {tech.technology_id
                      ? initialAvailableTechnologies.find(
                          (t) => t.value === tech.technology_id
                        )?.label || tech.technology_id
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
                                techOption.value === userTechnologies[index].technology_id
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
