'use client'

import { Mail, Github, Linkedin, Twitter, Download, MapPin } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { UserInfo } from '@/types/supabase-types'
import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function UserInfo1({ personalInfo }: { personalInfo: UserInfo }) {
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
  const [cvUrl, setCvUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    const generatePublicUrls = async () => {
      const supabase = createClient(); // Initialize with your Supabase credentials

      try {
        // Generate avatar URL
        if (personalInfo.avatarUrl) {
          const { data: avatarData } = supabase
            .storage
            .from("user-files")
            .getPublicUrl(personalInfo.avatarUrl);
          
          setAvatarUrl(avatarData.publicUrl);
        }

        // Generate CV URL
        if (personalInfo.cvUrl) {
          const { data: cvData } = supabase
            .storage
            .from("user-files")
            .getPublicUrl(personalInfo.cvUrl);

          setCvUrl(cvData.publicUrl);
        }
      } catch (error) {
        console.error("Error generating public URLs:", error);
      }
    };

    generatePublicUrls();
  }, []);

  return (
    <header className="py-20 px-3 flex flex-col items-center justify-center">
      <Avatar className="w-32 h-32 mx-auto mb-8 border-4 border-primary">
        <AvatarImage src={avatarUrl} alt={`${personalInfo.full_name}'s avatar`} />
        <AvatarFallback>{personalInfo.full_name.charAt(0)}</AvatarFallback>
      </Avatar>
      
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-clip-text">
        {personalInfo.full_name}
      </h1>
      
      {personalInfo.title && (
        <p className="text-xl sm:text-2xl mb-2 text-muted-foreground">
          {personalInfo.title}
        </p>
      )}
  
      {personalInfo.location && (
        <p className="text-lg mb-8 text-muted-foreground flex items-center">
          <MapPin className="h-5 w-5 mr-2" />
          {personalInfo.location}
        </p>
      )}
  
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <Button variant="outline" size="icon" asChild>
          <a href={`mailto:${personalInfo.email}`} aria-label="Email">
            <Mail className="h-5 w-5" />
          </a>
        </Button>
        {personalInfo.github && (
          <Button variant="outline" size="icon" asChild>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
          </Button>
        )}
        {personalInfo.linkedin && (
          <Button variant="outline" size="icon" asChild>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
        )}
        {personalInfo.x && (
          <Button variant="outline" size="icon" asChild>
            <a href={personalInfo.x} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </a>
          </Button>
        )}
        {cvUrl && (
          <Button asChild>
            <a href={cvUrl} target="_blank" download aria-label="Download CV">
              <Download className="h-5 w-5 mr-2" />
              Download CV
            </a>
          </Button>
        )}
      </div>
  
      {personalInfo.about_me && (
        <p className="mx-auto text-center">
          {personalInfo.about_me}
        </p>
      )}
    </header>
  );  
}