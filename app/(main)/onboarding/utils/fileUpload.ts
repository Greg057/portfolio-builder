import { Education, Project, UploadResult, UserInfo, WorkExperience } from "@/types/supabase-types";
import { createClient } from "@/utils/supabase/client";

const uploadPublicFile = async (file: File, path: string): Promise<UploadResult> => {
  const supabase = createClient();

  const { data, error } = await supabase.storage
    .from('user-files')
    .upload(path, file, {
      upsert: true, // Overwrite if file exists
    });

  if (error) {
    console.error('Error uploading file:', error);
    return { publicUrl: null, error };
  }

  return { publicUrl: path, error: null };
};

const uploadFileWithValidation = async (
  file: File,
  userId: string,
  fileType: 'avatar' | 'cv' | 'logo' | 'projectPic',
  name?: string
): Promise<UploadResult> => {
  const fileExtension = file.name.split('.').pop()?.toLowerCase();
  const validExtensions: { [key in 'avatar' | 'cv' | 'logo' | 'projectPic']: string[] } = {
    avatar: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
    cv: ['pdf', 'doc', 'docx'],
    logo: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
    projectPic: ['jpg', 'jpeg', 'png', 'webp', 'gif']
  };

  if (!fileExtension || !validExtensions[fileType].includes(fileExtension)) {
    throw new Error(`Invalid ${fileType} file type. Supported types: ${validExtensions[fileType].join(', ')}.`);
  }

  const sanitizedName = name && name.toLowerCase().replace(/[^a-z0-9]/g, '-');
  let path = '';

  switch (fileType) {
    case 'avatar':
      path = `${userId}/avatar.${fileExtension}`;
      break;
    case 'cv':
      path = `${userId}/cv.${fileExtension}`;
      break;
    case 'logo':
      path = `${userId}/education/${sanitizedName}.${fileExtension}`;
      break;
    case 'projectPic':
      path = `${userId}/project/${sanitizedName}.${fileExtension}`;
      break;
  }

  return await uploadPublicFile(file, path);
};

export const uploadAvatarFile = async (userId: string, userInfo: UserInfo) => {
	if (userInfo.avatarFile) {
		try {
			const { publicUrl: avatarPath, error } = await uploadFileWithValidation(userInfo.avatarFile, userId, 'avatar');
			if (!error) {
				return avatarPath;
			}
		} catch (error) {
			console.error('Error uploading avatar:', (error as Error).message);
			return null
		}
	}
	return null
};

export const uploadCvFile = async (userId: string, userInfo: UserInfo) => {
	if (userInfo.cvFile) {
		try {
			const { publicUrl: cvPath, error } = await uploadFileWithValidation(userInfo.cvFile, userId, 'cv');
			if (!error) {
				return cvPath;
			}
		} catch (error) {
			console.error('Error uploading CV:', (error as Error).message);
			return null
		}
	}
	return null
};

export const uploadEducationLogos = async (userId: string, educations: Education[]) => {
	return await Promise.all(
		educations.map(async (edu) => {
			const { logoFile, ...eduData } = edu;
			if (logoFile) {
				try {
					const { publicUrl: logoPath, error } = await uploadFileWithValidation(logoFile, userId, 'logo', edu.university);
					if (error) {
						console.error(`Error uploading logo for university "${edu.university}":`, error.message);
						return { ...eduData };
					}
					console.log(`Education logo successfully uploaded for university "${edu.university}":`, logoPath);
					return { ...eduData, logoUrl: logoPath };
				} catch (error) {
					console.error(`Unexpected error during education logo upload for university "${edu.university}":`, (error as Error).message);
					return { ...eduData };
				}
			}
			return { ...eduData };
		})
	);
};

export const uploadCompanyLogos = async (userId: string, experiences: WorkExperience[]) => {
	return await Promise.all(
		experiences.map(async (exp) => {
			const { logoFile, ...expData } = exp;
			if (logoFile) {
				try {
					const { publicUrl: logoPath, error } = await uploadFileWithValidation(logoFile, userId, 'logo', exp.company);
					if (error) {
						console.error(`Error uploading logo for company "${exp.company}":`, error.message);
						return { ...expData };
					}
					console.log(`Company logo successfully uploaded for company "${exp.company}":`, logoPath);
					return { ...expData, logoUrl: logoPath };
				} catch (error) {
					console.error(`Unexpected error during company logo upload for company "${exp.company}":`, (error as Error).message);
					return { ...expData };
				}
			}
			return { ...expData };
		})
	);
};

export const uploadProjectPics = async (userId: string, projects: Project[]) => {
	return await Promise.all(
		projects.map(async (proj) => {
			const { picFile, ...projData } = proj;
			if (picFile) {
				try {
					const { publicUrl: picUrl, error } = await uploadFileWithValidation(picFile, userId, 'projectPic', proj.name);
					if (error) {
						console.error(`Error uploading pic for project "${proj.name}":`, error.message);
						return { ...projData };
					}
					console.log(`Project pic successfully uploaded for project "${proj.name}":`, picUrl);
					return { ...projData, picUrl };
				} catch (error) {
					console.error(`Unexpected error during project pic upload for project "${proj.name}":`, (error as Error).message);
					return { ...projData };
				}
			}
			return { ...projData };
		})
	);
};