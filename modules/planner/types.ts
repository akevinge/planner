import { Course } from '../common/data';

/**
 * Denotes type of degree
 */
enum DegreeType {
  'major',
  'minor',
  'special',
}

/**
 * Contains a map between course name & its location(s) in the PlanRequirements object
 */
interface ChildUpdateMap {
  [name: string]: Array<LocationObject>;
}

/**
 * An object that states a courses's location in the PlanRequirements object
 */
interface LocationObject {
  [name: string]: string;
}

/**
 * Generic interface for all requirements used in CourseRequirementSidebar
 */
interface Requirement {
  name: string;
  id: string;
  status: boolean;
  totalRequired: number;
}

/**
 * Generic interface for requirements that contain other requirements
 */
interface RequirementWrapper<T extends Requirement> extends Requirement {
  fulfilled: number;
  requirements: Array<T>;
}

/**
 * Requirements for a student's CoursePlan
 */
type PlanRequirements = RequirementWrapper<DegreeRequirement>;

/**
 * Requirements for a specific degree
 */
type DegreeRequirement = RequirementWrapper<CategoryRequirement> & {
  type: DegreeType;
};

/**
 * Requirements for a category within a degree (i.e. Core Curriculum)
 */
type CategoryRequirement = RequirementWrapper<CourseRequirement | CourseGroupRequirement>;

/**
 * Requirements for a section within a category (i.e. Major Prepatory Courses)
 */
type SectionRequirement = RequirementWrapper<CourseRequirement | CourseGroupRequirement>;

/**
 * Requirements for a required course inside a section (i.e. RHET 1302)
 */
type CourseRequirement = Requirement & Course;

/**
 * Requirements for a required set of credits inside a section (i.e. pick 6 credits for 030 Core Curriculum)
 */
type CourseGroupRequirement = RequirementWrapper<CourseRequirement> & {
  selected: Array<CourseRequirement>;
};

type OtherRequirement = Requirement & {
  description: string;
};

export type {
  CategoryRequirement,
  ChildUpdateMap,
  CourseGroupRequirement,
  CourseRequirement,
  DegreeRequirement,
  DegreeType,
  OtherRequirement,
  PlanRequirements,
  SectionRequirement,
};
