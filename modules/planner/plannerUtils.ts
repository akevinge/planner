import { v4 as uuid } from 'uuid';

import { RecentSemester } from '../../components/planner/PlannerContainer';
import DUMMY_PLAN from '../../data/add_courses.json';
import { Semester, SemesterCode, StudentPlan } from '../common/data';
import {
  CategoryRequirement,
  CourseGroupRequirement,
  CourseRequirement,
  DegreeRequirement,
  DegreeType,
  OtherRequirement,
} from './types';

// Initial value for plan until data is properly loaded
export const initialPlan: StudentPlan = {
  id: 'empty-plan',
  title: 'Just a Degree Plan',
  major: 'Computer Science',
  semesters: DUMMY_PLAN,
};

/**
 * This function generates the metadata needed
 * create a new semester inside the user plan
 * @param semesters Array of semesters obtained from the user plan
 * @returns metatdata to create a new semester
 */
export function getRecentSemesterMetadata(semesters: Semester[]) {
  const lastSemester: Semester = semesters[semesters.length - 1];
  const recentSemester: RecentSemester = {
    year: parseInt(lastSemester.code.substring(0, lastSemester.code.length - 1)),
    semester: lastSemester.code.substring(lastSemester.code.length - 1) as SemesterCode,
  };
  return recentSemester;
}

/**
 * Generate metadata for adding a new semester.
 *
 * @param onlyLong Whether or not to only output long (fall/spring) semesters.
 */
export function getUpdatedSemesterData(recentSemesterData: RecentSemester, onlyLong = true) {
  const { year, semester } = recentSemesterData;
  let updatedYear;
  let updatedSemester = semester;
  if (semester === SemesterCode.f) {
    updatedYear = year + 1;
    updatedSemester = SemesterCode.s;
  } else {
    // Semester code is either spring or summer
    updatedYear = year;
    if (onlyLong || semester === SemesterCode.s) {
      updatedSemester = SemesterCode.f;
    } else {
      updatedSemester = SemesterCode.u;
    }
  }
  return {
    year: updatedYear,
    semester: updatedSemester,
  };
}

/**
 * Move the item at the given start index to the given end index.
 *
 * @param courses The semester to reorder
 * @param startIndex The starting index of the item to move
 * @param endIndex The destination index of the item to move
 */
export function reorderSemester(courses: string[], startIndex: number, endIndex: number): string[] {
  const result = Array.from(courses);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export function reorderList<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

/**
 * This function gets degree information from the API
 */
export async function getDegreeData() {
  console.log('Implement me!');
}

/**
 * This function creates a Requirement Object for the degree planning tool
 */
export function createRequirementObject(degreeObject) {
  // Create Degree Object
  const degree: DegreeRequirement = {
    name: degreeObject.abbreviation,
    fulfilled: 0,
    requirements: [],
    id: uuid(),
    status: false,
    totalRequired: degreeObject.minimum_credit_hours,
    type: 'major' as unknown as DegreeType,
  };

  // Build Category Requirements
  const categories = degreeObject.requirements;
  degree.requirements = categories.map((category) => {
    // Create category object
    const categoryObj: CategoryRequirement = {
      fulfilled: 0,
      status: false,
      name: category.name,
      id: uuid(),
      requirements: [],
      totalRequired: category.required,
    };
    // Build Course Requirements to category object
    const courses = category.options;
    const requirements = courses.map((requirement) => {
      // Create CourseRequirement object
      if (requirement.type === 'course') {
        // Get Course data from API
        const courseObj: CourseRequirement = {
          name: requirement.class_reference,
          id: uuid(),
          status: false,
          totalRequired: 1,
          title: requirement.class_reference,
          catalogCode: requirement.class_reference,
          description: 'Coming Soon!',
          creditHours: 0,
        };
        return courseObj;
      } else if (requirement.type === 'other') {
        // Other Type
        const otherObj: OtherRequirement = {
          name: 'Other Requirement',
          id: uuid(),
          status: false,
          totalRequired: 1,
          description: requirement.description,
        };
        return otherObj;
      } else {
        // Create CourseGroup Object
        const courseGroupObj: CourseGroupRequirement = {
          name: requirement.name,
          status: false,
          id: uuid(),
          totalRequired: requirement.required,
          requirements: [],
          fulfilled: 0,
          selected: [],
        };

        // Put all courses into course group
        const courseGroupCourses = requirement.courses.map((course) => {
          if (requirement.type === 'course') {
            // Get Course data from API
            const courseObj: CourseRequirement = {
              name: requirement.class_reference,
              id: uuid(),
              status: false,
              totalRequired: 1,
              title: requirement.class_reference,
              catalogCode: requirement.class_reference,
              description: 'Coming Soon!',
              creditHours: 0,
            };
            return courseObj;
          } else {
            // Other Type
            const otherObj: OtherRequirement = {
              name: 'Other Requirement',
              id: uuid(),
              status: false,
              totalRequired: 1,
              description: requirement.description,
            };
            return otherObj;
          }
        });
        courseGroupObj.requirements = courseGroupCourses;
        return courseGroupObj;
      }
    });
    categoryObj.requirements = requirements;
    return categoryObj;
  });
  return degree;
}

/**
 * This function creates course map & marks courses that appear on a user's degree plan
 * multiple times
 */

/**
 * This function fills requirement object out with all courses user has taken
 */
