import { Payload, PortfolioData, UserTechnology } from "@/types/supabase-types";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner"

export const handleSave = async (selectedComponents: any, config: any = null) => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
  
    try {
      if (!user) {
        sessionStorage.removeItem("portfolioSessionData");
        // Save the current configuration in sessionStorage
        sessionStorage.setItem(
          "portfolioSessionData",
          JSON.stringify({
            user_info_component: selectedComponents.userInfo.key,
            education_work_component: selectedComponents.educationWork.key,
            projects_component: selectedComponents.projects.key,
            skills_component: selectedComponents.userSkills.key,
          })
        );
        return;
      }

      console.log('selectedComponents', selectedComponents)

      const componentsData = config || {
        user_info_component: selectedComponents.userInfo.key,
        education_work_component: selectedComponents.educationWork.key,
        projects_component: selectedComponents.projects.key,
        skills_component: selectedComponents.userSkills.key
      };
      const payload = { ...componentsData , user_id: user.id, is_saved: true }

      const { error: saveError } = await supabase.from('portfolio_data').upsert(payload);
      if (saveError) throw saveError;

      toast("Changes saved", {
        description: "Your changes have been saved. You can close this window.",
        action: {
          label: "Close",
          onClick: () => console.log()
        },
      })
    } catch (error) {
      console.error("Error saving data:", error);
    }
}

export const fetchConfig = async (selectedComponents: any, setSelectedComponents: any, userInfoComponents: any, educationWorkComponents: any, projectsComponents: any, userSkillsComponents: any) => {
	const portfolioSessionData = sessionStorage.getItem("portfolioSessionData");

	if (portfolioSessionData) {
		const parsedConfig: PortfolioData = JSON.parse(portfolioSessionData);

		setSelectedComponents({
			userInfo: require(`@/app/(portfolio)/(components)/userInfo/${parsedConfig.user_info_component}`).default,
			educationWork: require(`@/app/(portfolio)/(components)/educationWork/${parsedConfig.education_work_component}`).default,
			projects: require(`@/app/(portfolio)/(components)/projects/${parsedConfig.projects_component}`).default,
			userSkills: require(`@/app/(portfolio)/(components)/skills/${parsedConfig.skills_component}`).default,
		});

    setSelectedComponents({
      userInfo: userInfoComponents[parsedConfig.user_info_component as keyof typeof userInfoComponents] || userInfoComponents.UserInfo1,
      educationWork: educationWorkComponents[parsedConfig.education_work_component as keyof typeof educationWorkComponents] || educationWorkComponents.EducationWork1,
      projects: projectsComponents[parsedConfig.projects_component as keyof typeof projectsComponents] || projectsComponents.Projects1,
      userSkills: userSkillsComponents[parsedConfig.skills_component as keyof typeof userSkillsComponents] || userSkillsComponents.Skills1,
    });

		sessionStorage.removeItem("portfolioSessionData");

		await handleSave(selectedComponents, parsedConfig); // Await the asynchronous handleSave function
	}
};

export const getUserTechNames = async (sessionData: Payload) => {
  const supabase = createClient();

  const userTechnologies = sessionData.userTechnologies || [];
  if (userTechnologies.length === 0) return [];

  const techIds = userTechnologies
    .map((ut: UserTechnology) => ut.technology_id)
    .filter((id) => id); // Ensure IDs are not null or undefined

  if (techIds.length === 0) return []; // Return early if no valid IDs exist

  try {
    const { data: technologies, error } = await supabase
      .from("technologies")
      .select("*")
      .in("id", techIds);

    if (error) {
      console.error("Error fetching technology details from Supabase:", error);
      return [];
    }

    return userTechnologies
      .map((ut: UserTechnology) => {
        const tech = technologies.find((t) => t.id === ut.technology_id);
        if (!ut.technology_id || !tech) return null; // Exclude invalid entries
        return { id: ut.technology_id, name: tech.name || "Unknown" };
      })
      .filter((item) => item !== null); // Filter out null results
  } catch (error) {
    console.error("Unexpected error fetching technology details:", error);
    return [];
  }
};