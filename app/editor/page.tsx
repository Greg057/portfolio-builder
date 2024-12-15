'use client'

import { useState } from 'react'
import { useToast } from "@/components/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { EyeIcon, RocketIcon, SaveIcon } from 'lucide-react'
import PortfolioPage from '../portfolio/page'
import UserInfo1 from '../portfolio/userInfo/UserInfo1'
import UserInfo2 from '../portfolio/userInfo/UserInfo2'
import Experiences1 from '../portfolio/experiences/Experiences1'
import Education1 from '../portfolio/education/Education1'
import Projects1 from '../portfolio/projects/Projects1'
import Skills1 from '../portfolio/skills/Skills1'

const userInfoComponents = [UserInfo1, UserInfo2]
const workExperienceComponents = [Experiences1]
const educationComponents = [Education1]
const projectsComponents = [Projects1]
const userSkillsComponents = [Skills1]

const sections = [
  { name: 'User Info', key: 'userInfo', components: userInfoComponents },
  { name: 'Work Experience', key: 'workExperience', components: workExperienceComponents },
  { name: 'Education', key: 'education', components: educationComponents },
  { name: 'Projects', key: 'projects', components: projectsComponents },
  { name: 'User Skills', key: 'userSkills', components: userSkillsComponents },
]

export default function PortfolioEditor() {
  const { toast } = useToast()
  const [selectedComponents, setSelectedComponents] = useState({
    userInfo: UserInfo1,
    workExperience: Experiences1,
    education: Education1,
    projects: Projects1,
    userSkills: Skills1,
  })

  const handleComponentChange = (section: string, componentName: string) => {
    const componentList = sections.find(s => s.key === section)?.components || []
    const selectedComponent = componentList.find(c => c.name === componentName) || componentList[0]
    setSelectedComponents(prev => ({ ...prev, [section]: selectedComponent }))
  }

  const handleSave = () => {
    console.log('Saving configuration:', selectedComponents)
    toast({
      title: "Configuration Saved",
      description: "Your portfolio configuration has been saved.",
    })
  }

  const handlePreview = () => {
    console.log('Navigating to preview page')
    toast({
      title: "Previewing Portfolio",
      description: "Opening preview in a new tab.",
    })
  }

  const handleDeploy = () => {
    console.log('Deploying portfolio')
    toast({
      title: "Portfolio Deployed",
      description: "Your portfolio is now live!",
    })
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="flex justify-between items-center p-4 border-b">
        <Button onClick={handleSave}>
          <SaveIcon className="w-4 h-4 mr-2" />
          Save
        </Button>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handlePreview}>
            <EyeIcon className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button onClick={handleDeploy}>
            <RocketIcon className="w-4 h-4 mr-2" />
            Deploy
          </Button>
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden">
        <div className="w-1/3 p-4 border-r">
          <h2 className="text-lg font-semibold mb-4">Customize Sections</h2>
          <ScrollArea className="h-[calc(100vh-8rem)]">
            {sections.map(section => (
              <div key={section.key} className="mb-4">
                <label htmlFor={section.key} className="block text-sm font-medium text-gray-700 mb-1">
                  {section.name} UI Component
                </label>
                <Select
                  value={selectedComponents[section.key as keyof typeof selectedComponents].name}
                  onValueChange={(value) => handleComponentChange(section.key, value)}
                >
                  <SelectTrigger id={section.key}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {section.components.map((Component, index) => (
                      <SelectItem key={index} value={Component.name}>
                        {Component.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </ScrollArea>
        </div>

        <ScrollArea className="h-[100%] w-[100%]">
          <PortfolioPage
            UserInfoComponent={selectedComponents.userInfo}
            WorkExperienceComponent={selectedComponents.workExperience}
            EducationComponent={selectedComponents.education}
            ProjectsComponent={selectedComponents.projects}
            UserSkillsComponent={selectedComponents.userSkills}
          />
        </ScrollArea>
      </main>
    </div>
  )
}