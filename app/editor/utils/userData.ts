import { Technology } from "@/types/supabase-types";
import { createClient } from "@/utils/supabase/client";

export const fetchUserData = async (userId: string): Promise<any> => {
	const supabase = createClient();

	try {
		const { data: userInfo, error: userInfoError } = await supabase
			.from("personal_info")
			.select("*")
			.eq("user_id", userId)
			.single();

		const { data: educations, error: educationError } = await supabase
			.from("education")
			.select("*")
			.eq("user_id", userId);

		const { data: experiences, error: experienceError } = await supabase
			.from("work_experience")
			.select("*")
			.eq("user_id", userId);

		const { data: projects, error: projectError } = await supabase
			.from("projects")
			.select("*")
			.eq("user_id", userId);

		const { data: userTechnologies, error: technologiesError } = await supabase
			.from("user_technologies")
			.select("technology_id")
			.eq("user_id", userId);

		if (userInfoError || educationError || experienceError || projectError || technologiesError) {
			console.error(
				"Error fetching data:",
				userInfoError,
				educationError,
				experienceError,
				projectError,
				technologiesError
			);
			return null;
		}

		const projectsUpdated = await addProjectTechNames(projects || []);
		const userTechnologyNames = await addUserTechNames(userTechnologies || []);

		const { data: userComponents, error: userComponentError } = await supabase
			.from("portfolio_data")
			.select("user_info_component, education_component, experiences_component, projects_component, skills_component")
			.eq("user_id", userId)
			.single();

		if (userComponentError) {
			throw userComponentError;
		}

		return {
			userInfo,
			educations,
			experiences,
			projects: projectsUpdated,
			userTechnologies: userTechnologyNames,
			userComponents,
		};
	} catch (error) {
		console.error("Error fetching user data:", error);
		return null;
	}
}

const addProjectTechNames = async (projects: any[]) => {
  const supabase = createClient();

  if (projects && projects.length > 0) {
    await Promise.all(projects.map(async (project) => {
      project.technologyIds = [];
      project.technologyNames = [];
      const { data: projectTechnologies, error: projectTechnologiesError } = await supabase
        .from("project_technologies")
        .select("*")
        .eq("project_id", project.id);
      
      if (projectTechnologiesError) {
        console.log('Error fetching project technologies')
      }
      
      if (projectTechnologies) {
        projectTechnologies.map(tech => {
          project.technologyIds.push(tech.technology_id)
        })
      } 

      if (project.technologyIds.length > 0) {
        const { data: technologies, error: techDetailsError } = await supabase
          .from("technologies")
          .select("*")
          .in("id", project.technologyIds);

        if (techDetailsError) {
          console.error("Error fetching technology details:", techDetailsError);
          return; // Exit or handle the error appropriately
        }

        if (technologies) {
          technologies.map(tech => {
            project.technologyNames.push(tech.name)
          })
        }
      }
    }))
  }
  return projects;
}

const addUserTechNames = async (userTechnologies: any[]) => {
  const supabase = createClient();
  let userTechnologyNames: Technology[] = [];

  if (userTechnologies && userTechnologies.length > 0) {
    const techIds = userTechnologies.map((ut) => ut.technology_id);

    // Fetch technologies data
    const { data: technologies, error: techDetailsError } = await supabase
      .from("technologies")
      .select("*")
      .in("id", techIds);

    if (techDetailsError) {
      console.error("Error fetching technology details:", techDetailsError);
      return []; // Exit or handle the error appropriately
    }

    if (technologies) {
      // Map user technologies to names
      userTechnologyNames = userTechnologies.map((ut) => {
        const tech = technologies.find((t) => t.id === ut.technology_id);
        return { id: ut.technology_id, name: tech?.name || "Unknown" };
      });
    }
  }
  return userTechnologyNames;
}