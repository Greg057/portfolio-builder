import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { UserInfo } from '@/types/supabase-types'

export default function UserInfoSection({
    userInfo,
    setUserInfo,
}: {
    userInfo: UserInfo;
    setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}) {

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
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                placeholder="123-456-7890"
                value={userInfo.phone || ''}
                onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
              />
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