import UserInfo1 from "@/app/(portfolio)/(components)/userInfo/UserInfo1"
import UserInfo2 from "@/app/(portfolio)/(components)/userInfo/UserInfo2"
import UserInfo3 from "@/app/(portfolio)/(components)/userInfo/UserInfo3"
import UserInfo4 from "@/app/(portfolio)/(components)/userInfo/UserInfo4"
import EducationWork1 from "@/app/(portfolio)/(components)/educationWork/EducationWork1"
import EducationWork2 from "@/app/(portfolio)/(components)/educationWork/EducationWork2"
import EducationWork3 from "@/app/(portfolio)/(components)/educationWork/EducationWork3"
import EducationWork4 from "@/app/(portfolio)/(components)/educationWork/EducationWork4"
import Skills1 from "@/app/(portfolio)/(components)/skills/Skills1"
import Skills2 from "@/app/(portfolio)/(components)/skills/Skills2"
import Projects1 from "@/app/(portfolio)/(components)/projects/Projects1"
import Projects2 from "@/app/(portfolio)/(components)/projects/Projects2"

export const userInfoComponents = {
  UserInfo1: { component: UserInfo1, name: "User Info 1", key: "UserInfo1" },
  UserInfo2: { component: UserInfo2, name: "User Info 2", key: "UserInfo2" },
  UserInfo3: { component: UserInfo3, name: "User Info 3", key: "UserInfo3" },
  UserInfo4: { component: UserInfo4, name: "User Info 4", key: "UserInfo4" },
}

export const educationWorkComponents = {
  EducationWork1: { component: EducationWork1, name: "Education Work 1", key: "EducationWork1" },
  EducationWork2: { component: EducationWork2, name: "Education Work 2", key: "EducationWork2" },
  EducationWork3: { component: EducationWork3, name: "Education Work 3", key: "EducationWork3" },
  EducationWork4: { component: EducationWork4, name: "Education Work 4", key: "EducationWork4" },
}

export const projectsComponents = {
  Projects1: { component: Projects1, name: "Projects 1", key: "Projects1" },
  Projects2: { component: Projects2, name: "Projects 2", key: "Projects2" },
}

export const userSkillsComponents = {
  Skills1: { component: Skills1, name: "Skills 1", key: "Skills1" },
  Skills2: { component: Skills2, name: "Skills 2", key: "Skills2" },
}

export const sections = [
  { name: "User Info", key: "userInfo", components: userInfoComponents },
  { name: "Education Work", key: "educationWork", components: educationWorkComponents },
  { name: "User Skills", key: "userSkills", components: userSkillsComponents },
  { name: "Projects", key: "projects", components: projectsComponents },
]