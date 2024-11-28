'use client'

import { useState } from 'react'
import { useToast } from "@/components/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { EyeIcon, RocketIcon, SaveIcon } from 'lucide-react'
import PortfolioPage from '../portfolio/page'

// Placeholder components for the preview
const Component1 = () => <div className="p-4 border rounded">Template for Component 1</div>
const Component2 = () => <div className="p-4 border rounded">Template for Component 2</div>

const sections = [
  { name: 'User Info', key: 'userInfo' },
  { name: 'Work Experience', key: 'workExperience' },
  { name: 'Education', key: 'education' },
  { name: 'Projects', key: 'projects' },
  { name: 'User Skills', key: 'userSkills' },
]

export default function PortfolioEditor() {
  const { toast } = useToast()
  const [selectedComponents, setSelectedComponents] = useState({
    userInfo: 'Component1',
    workExperience: 'Component1',
    education: 'Component1',
    projects: 'Component1',
    userSkills: 'Component1',
  })

  const handleComponentChange = (section: string, component: string) => {
    setSelectedComponents(prev => ({ ...prev, [section]: component }))
  }

  const handleSave = () => {
    // Save logic here (e.g., to sessionStorage or database)
    console.log('Saving configuration:', selectedComponents)
    toast({
      title: "Configuration Saved",
      description: "Your portfolio configuration has been saved.",
    })
  }

  const handlePreview = () => {
    // Navigate to preview page logic here
    console.log('Navigating to preview page')
    toast({
      title: "Previewing Portfolio",
      description: "Opening preview in a new tab.",
    })
  }

  const handleDeploy = () => {
    // Deploy logic here
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
                  value={selectedComponents[section.key as keyof typeof selectedComponents]}
                  onValueChange={(value) => handleComponentChange(section.key, value)}
                >
                  <SelectTrigger id={section.key}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Component1">Component 1</SelectItem>
                    <SelectItem value="Component2">Component 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ))}
          </ScrollArea>
        </div>

        <ScrollArea className="h-[calc(100vh-8rem)]">
          <PortfolioPage />
        </ScrollArea>
      </main>
    </div>
  )
}