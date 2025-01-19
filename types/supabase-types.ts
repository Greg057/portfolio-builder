export type UserInfo = {
    user_id?: string; // References `auth.users.id`
    full_name: string;
    email: string;
    title: string | null;
    github: string | null;
    linkedin: string | null;
    about_me: string | null;
    location: string | null;
    avatarUrl: string | null;
    avatarFile: File | null;
    cvUrl: string | null;
    cvFile: File | null;
    x: string | null;
};

export type WorkExperience = {
    id?: string; // Primary key
    user_id?: string; // References `auth.users.id`
    company: string;
    position: string;
    start_date: string;
    end_date: string;
    description: string | null;
    logoUrl: string | null;
    logoFile: File | null
};

export type Project = {
    id: string; // Primary key
    user_id?: string; // References `auth.users.id`
    name: string;
    description: string | null;
    github_link: string | null;
    live_link: string | null; // Optional live project link
    technologies: number[]; // Array of technology IDs
    availableTechnologies: {value: number, label: string}[];
    technologyNames?: string[];
    picUrl: string | null;
    picFile: File | null
};

export type Education = {
    id?: string; // Primary key
    user_id?: string; // References `auth.users.id`
    degree: string;
    university: string;
    start_year: string;
    end_year: string;
    description: string | null;
    logoUrl: string | null;
    logoFile: File | null
};

export type Technology = {
    id: number;
    name: string;
}

export type ProjectTechnology = {
    project_id: string;
    technology_id: number;
}

export type UserTechnology = {
    user_id?: string;
    technology_id: number | null;
}

export type TechnologyImage = {
    id: number; // Primary key
    technology_id: number; // References `technologies.id`
    image_url: string; // URL for the technology image
    version: string; // Type of image (e.g., "default", "rounded", "flat")
};

export type PortfolioData = {
    user_id: string; // Primary key, references `auth.users.id`
    primary_color: string | null; // Portfolio primary color
    secondary_color: string | null; // Portfolio secondary color
    is_saved: boolean | null; // Whether the portfolio is saved
    is_deployed: boolean | null; // Whether the portfolio is deployed
    deployed_at: string | null; // Timestamp of deployment
    updated_at: string | null; // Auto-updated timestamp
    created_at: string | null; // Creation timestamp
    user_info_component: string;
    education_component: string;
    experiences_component: string;
    projects_component: string;
    skills_component: string;
    slug: string | null;
};

export type Payload = {
    userInfo: {
        user_id: string; // References `auth.users.id`
        full_name: string;
        email: string;
        title: string | null;
        github: string | null;
        linkedin: string | null;
        about_me: string | null;
        location: string | null;
        avatarUrl: string | null;
        cvUrl: string | null;
        x: string | null;
    };
    educations: {
        id?: string; // Primary key
        user_id: string; // References `auth.users.id`
        degree: string;
        university: string;
        start_year: string;
        end_year: string;
        description: string | null;
        logoUrl: string | null;
    }[];
    experiences: {
        id?: string; // Primary key
        user_id: string; // References `auth.users.id`
        company: string;
        position: string;
        start_date: string;
        end_date: string;
        description: string | null;
        logoUrl: string | null;
    }[];
    projects: {
        id: string; // Primary key
        user_id: string; // References `auth.users.id`
        name: string;
        description: string | null;
        github_link: string | null;
        live_link: string | null;
        picUrl: string | null
    }[];
    projectTechnologies: ProjectTechnology[];
    userTechnologies: UserTechnology[];
    portfolioData: PortfolioData
}

export type UploadResult = {
    publicUrl: string | null;
    error: Error | null;
};
  