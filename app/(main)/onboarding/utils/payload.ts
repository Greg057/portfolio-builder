import { Education, Payload, Project, UserInfo, UserTechnology, WorkExperience } from "@/types/supabase-types";
import { User } from "@supabase/supabase-js";
import { uploadAvatarFile, uploadCompanyLogos, uploadCvFile, uploadEducationLogos, uploadProjectPics } from './fileUpload'

export const initializePayload = async (user: User | null, userInfo: UserInfo, educations: Education[], experiences: WorkExperience[], projects: Project[], userTechnologies: UserTechnology[]): Promise<Payload> => {
  const userId: string = user ? user.id : ''  
	
	const payload: any = {
		userInfo: {
			user_id: userId,
			full_name: userInfo.full_name.trim(),
			email: userInfo.email.trim(),
			title: userInfo.title?.trim() || null,
			github: userInfo.github?.trim() || null,
			linkedin: userInfo.linkedin?.trim() || null,
			about_me: userInfo.about_me?.trim() || null,
			location: userInfo.location?.trim() || null,
			avatarUrl: userInfo.avatarUrl?.trim() || null,
			cvUrl: userInfo.cvUrl?.trim() || null,
			x: userInfo.x?.trim() || null,
		},
		educations: educations
			.filter(
				(edu) => edu.degree.trim() && edu.university.trim() && edu.start_year.trim() && edu.end_year.trim()
			)
			.map((edu) => ({
				user_id: userId,
				degree: edu.degree.trim(),
				university: edu.university.trim(),
				start_year: edu.start_year.trim(),
				end_year: edu.end_year.trim(),
				description: edu.description?.trim() || null,
				logoUrl: edu.logoUrl?.trim() || null,
				logoFile: edu.logoFile || null,
			})),
		experiences: experiences
			.filter(
				(exp) =>
					exp.company.trim() && exp.position.trim() && exp.start_date.trim() && exp.end_date.trim()
			)
			.map((exp) => ({
				user_id: userId,
				company: exp.company.trim(),
				position: exp.position.trim(),
				start_date: exp.start_date.trim(),
				end_date: exp.end_date.trim(),
				description: exp.description?.trim() || null,
				logoUrl: exp.logoUrl?.trim() || null,
				logoFile: exp.logoFile || null,	
			})),
		projects: projects
			.filter((proj) => proj.name.trim())
			.map((proj) => ({
				project: {
					user_id: userId,
					id: proj.id,
					name: proj.name.trim(),
					description: proj.description?.trim() || null,
					github_link: proj.github_link?.trim() || null,
					live_link: proj.live_link?.trim() || null,
					picUrl: proj.picUrl?.trim() || null,
					picFile: proj.picFile || null,
				},
				projectTechnologies: proj.technologies.map((techID) => ({
					project_id: proj.id,
					technology_id: techID,
				})),
			})),
		userTechnologies: userTechnologies.map((tech) => ({ technology_id: tech.technology_id, user_id: userId })),
		portfolioData: {
			user_id: userId,
			user_info_component: "UserInfo1",
			education_work_component: "EducationWork1",
			projects_component: "Projects1",
			skills_component: "Skills1",
		}
	};
	
	payload.projectTechnologies = payload.projects.map((proj: any) => proj.projectTechnologies).flat()
	payload.projects = payload.projects.map((proj: any) => proj.project)

	if (user) {
		const updateFiles = async (userId: string) => {
			const updatedFiles = await Promise.all([
				uploadAvatarFile(userId, userInfo.avatarFile),
				uploadCvFile(userId, userInfo.cvFile),
				uploadEducationLogos(userId, payload.educations),
				uploadCompanyLogos(userId, payload.experiences),
				uploadProjectPics(userId, payload.projects),
			]);

			payload.userInfo.avatarUrl = updatedFiles[0];
			payload.userInfo.cvUrl = updatedFiles[1];
			payload.educations = updatedFiles[2]; // Upload education logos
			payload.experiences = updatedFiles[3]; // Upload company logos
			payload.projects = updatedFiles[4]; // Upload project pictures
		};

		await updateFiles(user.id);
		console.log('Files successfully uploaded to Supabase for authenticated user');
	}

	payload.educations.forEach((edu: any) => {
		delete edu.logoFile;
	});
	  
	payload.experiences.forEach((exp: any) => {
		delete exp.logoFile;
	});
	  
	payload.projects.forEach((proj: any) => {
		delete proj.picFile;
	});

	return payload
}