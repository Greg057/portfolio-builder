export type UserInfo = {
    id?: string;
    user_id?: string;
    full_name: string;
    title: string | null;
    email: string;
    phone: string | null;
    github: string | null;
    linkedin: string | null;
    about_me: string | null;
};
  
export type WorkExperience = {
    id?: string;
    user_id?: string;
    company: string;
    position: string;
    start_date: string;
    end_date: string | null;
    description: string | null;
};
  
export type Project = {
    id?: string;
    user_id?: string;
    name: string;
    description: string;
    github_link: string | null;
    technologies: string[];
};
  
export type Education = {
    id?: string;
    user_id?: string;
    degree: string;
    university: string;
    start_year: string;
    end_year: string | null;
    description: string | null;
};
  
export type Skill = {
    id?: string;
    user_id?: string;
    name: string;
};
  