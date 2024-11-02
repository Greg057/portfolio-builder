
import { Suspense } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { GitHubLogoIcon, FileTextIcon } from '@radix-ui/react-icons'

export default function OnboardingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Set Up Your Portfolio</h1>
      <div className="max-w-3xl mx-auto">
        <GitHubConnect />
        <div className="mt-8">
          <CVUploadOrManualEntry />
        </div>
      </div>
    </div>
  )
}

function GitHubConnect() {
    return (
        <Card>
        <CardHeader>
            <CardTitle>Connect GitHub</CardTitle>
            <CardDescription>Link your GitHub account to import your projects</CardDescription>
        </CardHeader>
        <CardContent>
            <Button className="w-full">
            <GitHubLogoIcon className="mr-2 h-4 w-4" />
            Connect GitHub Account
            </Button>
        </CardContent>
        </Card>
    );
}

function CVUploadOrManualEntry() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Professional Information</CardTitle>
        <CardDescription>Upload your CV or manually enter your details</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upload">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload CV</TabsTrigger>
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
          </TabsList>
          <TabsContent value="upload">
            <CVUpload />
          </TabsContent>
          <TabsContent value="manual">
            <Suspense fallback={<div>Loading form...</div>}>
              <ManualEntryForm />
            </Suspense>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function CVUpload() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center w-full">
        <label htmlFor="cv-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/50">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <FileTextIcon className="w-8 h-8 mb-4 text-muted-foreground" />
            <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-muted-foreground">PDF, DOCX (MAX. 5MB)</p>
          </div>
          <input id="cv-upload" type="file" className="hidden" accept=".pdf,.docx" />
        </label>
      </div>
      <Button className="w-full">Upload CV</Button>
    </div>
  )
}

function ManualEntryForm() {
  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input id="fullName" placeholder="John Doe" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="john@example.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="education">Education</Label>
        <Textarea id="education" placeholder="e.g. BSc in Computer Science, University of Technology (2018-2022)" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="experience">Work Experience</Label>
        <Textarea id="experience" placeholder="e.g. Software Engineer at Tech Co. (2022-Present)" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="skills">Skills</Label>
        <Textarea id="skills" placeholder="e.g. JavaScript, React, Node.js, Python" />
      </div>
      <Button type="submit" className="w-full">Save Information</Button>
    </form>
  )
}