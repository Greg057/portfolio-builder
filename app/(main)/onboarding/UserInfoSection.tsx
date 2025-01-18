'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { UserInfo } from '@/types/supabase-types'
import { createClient } from "@/utils/supabase/client"
import { MapPin, Upload, Twitter } from 'lucide-react'

export default function UserInfoSection({
    userInfo,
    setUserInfo,
}: {
    userInfo: UserInfo;
    setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}) {

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, field: 'avatar' | 'cv') => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("You need to sign in to upload files")
    }
          
    const file = e.target.files?.[0];
    if (file) {
      setUserInfo({ ...userInfo, [field]: file });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Enter your basic details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            placeholder="John Doe"
            required
            value={userInfo.full_name}
            onChange={(e) => setUserInfo({ ...userInfo, full_name: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="title">Job Title</Label>
          <Input
            id="title"
            placeholder="Software Engineer"
            value={userInfo.title || ''}
            onChange={(e) => setUserInfo({ ...userInfo, title: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            required
            value={userInfo.email}
            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <div className="relative">
            <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="location"
              placeholder="City, Country"
              className="pl-8"
              value={userInfo.location || ''}
              onChange={(e) => setUserInfo({ ...userInfo, location: e.target.value })}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="github">GitHub</Label>
          <Input
            id="github"
            placeholder="https://github.com/yourusername"
            value={userInfo.github || ''}
            onChange={(e) => setUserInfo({ ...userInfo, github: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            placeholder="https://linkedin.com/in/yourprofile"
            value={userInfo.linkedin || ''}
            onChange={(e) => setUserInfo({ ...userInfo, linkedin: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="x">X (Twitter)</Label>
          <div className="relative">
            <Twitter className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="x"
              placeholder="https://x.com/yourusername"
              className="pl-8"
              value={userInfo.x || ''}
              onChange={(e) => setUserInfo({ ...userInfo, x: e.target.value })}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="avatar">Profile Picture</Label>
          <Input
            id="avatar"
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'avatar')}
          />
          {userInfo.avatar && (
            <p className="text-sm text-muted-foreground">
              Selected file: {userInfo.avatar instanceof File ? userInfo.avatar.name : userInfo.avatar}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="cv">CV Upload</Label>
          <div className="relative">
            <Upload className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="cv"
              type="file"
              accept=".pdf,.doc,.docx"
              className="pl-8"
              onChange={(e) => handleFileChange(e, 'cv')}
            />
          </div>
          {userInfo.cv && (
            <p className="text-sm text-muted-foreground">
              Selected file: {userInfo.cv instanceof File ? userInfo.cv.name : userInfo.cv}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="aboutMe">About Me</Label>
          <Textarea
            id="aboutMe"
            placeholder="Tell us about yourself..."
            value={userInfo.about_me || ''}
            onChange={(e) => setUserInfo({ ...userInfo, about_me: e.target.value })}
          />
        </div>
      </CardContent>
    </Card>
  )
}

