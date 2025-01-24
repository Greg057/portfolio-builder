import { UploadResult } from "@/types/supabase-types";
import { createClient } from "@/utils/supabase/client";

const uploadPublicFile = async (file: File, path: string): Promise<UploadResult> => {
  const supabase = createClient();

  const { error } = await supabase.storage
    .from('user-files')
    .upload(path, file, {
      upsert: true, // Overwrite if file exists
    });

  if (error) {
    console.error('Error uploading file:', error);
    return { publicUrl: null, error };
  }

  const { data } = supabase
		.storage
		.from('user-files')
		.getPublicUrl(path)

	console.log(`publicUrl of ${path}:`, data.publicUrl)

  return { publicUrl: data.publicUrl, error: null };
};

const uploadFileWithValidation = async (
  file: File,
  userId: string,
  fileType: 'avatar' | 'cv' | 'edu' | 'exp' | 'proj',
  name?: string
): Promise<UploadResult> => {
  const fileExtension = file.name.split('.').pop()?.toLowerCase();
  const validExtensions: { [key in 'avatar' | 'cv' | 'edu' | 'exp' | 'proj']: string[] } = {
    avatar: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
    cv: ['pdf', 'doc', 'docx'],
    edu: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
    exp: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
	proj: ['jpg', 'jpeg', 'png', 'webp', 'gif']
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
    case 'edu':
      path = `${userId}/education/${sanitizedName}.${fileExtension}`;
      break;
	case 'exp':
      path = `${userId}/experience/${sanitizedName}.${fileExtension}`;
      break;
    case 'proj':
      path = `${userId}/project/${sanitizedName}.${fileExtension}`;
      break;
  }

  return await uploadPublicFile(file, path);
};

export const uploadAvatarFile = async (userId: string, avatarFile: File | null) => {
	if (avatarFile) {
		try {
			const { publicUrl: avatarPath, error } = await uploadFileWithValidation(avatarFile, userId, 'avatar');
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

export const uploadCvFile = async (userId: string, cvFile: File | null) => {
	if (cvFile) {
		try {
			const { publicUrl: cvPath, error } = await uploadFileWithValidation(cvFile, userId, 'cv');
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

export const uploadEducationLogos = async (userId: string, payloadEducations: any) => {
	return await Promise.all(
		payloadEducations.map(async (edu: any) => {
			const { logoFile, ...eduData } = edu;
			if (logoFile) {
				try {
					const { publicUrl: logoPath, error } = await uploadFileWithValidation(logoFile, userId, 'edu', edu.university);
					if (error) {
						console.error(`Error uploading logo for university "${edu.university}":`, error.message);
						return { ...eduData };
					}
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

export const uploadCompanyLogos = async (userId: string, payloadExperiences: any) => {
	return await Promise.all(
		payloadExperiences.map(async (exp: any) => {
			const { logoFile, ...expData } = exp;
			if (logoFile) {
				try {
					const { publicUrl: logoPath, error } = await uploadFileWithValidation(logoFile, userId, 'exp', exp.company);
					if (error) {
						console.error(`Error uploading logo for company "${exp.company}":`, error.message);
						return { ...expData };
					}
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

export const uploadProjectPics = async (userId: string, payloadProjects: any) => {
	return await Promise.all(
		payloadProjects.map(async (proj: any) => {
			const { picFile, ...projData } = proj;
			if (picFile) {
				try {
					const { publicUrl: picPath, error } = await uploadFileWithValidation(picFile, userId, 'proj', proj.name);
					if (error) {
						console.error(`Error uploading pic for project "${proj.name}":`, error.message);
						return { ...projData };
					}
					return { ...projData, picUrl: picPath };
				} catch (error) {
					console.error(`Unexpected error during project pic upload for project "${proj.name}":`, (error as Error).message);
					return { ...projData };
				}
			}
			return { ...projData };
		})
	);
};