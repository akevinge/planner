import { Course } from '@/modules/common/data';
import { UniqueIdentifier } from '@dnd-kit/core';

// Temporary semester type
// TODO: Remove
export interface Semester {
  id: UniqueIdentifier;
  name: string;
  courses: Course[];
}

export interface DegreeRequirementGroup {
  name: string;
  requirements: DegreeRequirement[];
}

export interface DegreeRequirement {
  name: string;
  validCourses: string[];
  courses: string[];
  hours: number;
  isFilled: boolean;
  description?: string;
}

export interface DraggableCourse extends Course {
  status?: 'complete' | 'incomplete';
}

/**
 * Data from drag event origin and destination
 * Drag origin is referred to as 'active' by @dnd-kit
 * Drag destination is referred to as 'over' by @dnd-kit
 */
export type DragEventOriginData = DragDataFromSemesterTile | DragDataFromCourseList;

export interface DragDataFromSemesterTile {
  from: 'semester-tile';
  semester: Semester;
  course: DraggableCourse;
}

export interface DragDataFromCourseList {
  from: 'course-list';
  course: DraggableCourse;
}

export type DragEventDestinationData = DragDataToSemesterTile;

export interface DragDataToSemesterTile {
  to: 'semester-tile';
  semester: Semester;
}

// Date stored during drag
export interface ActiveDragData {
  from: 'semester-tile' | 'course-list';
  course: DraggableCourse;
}

// Callbacks to generate drag and drop id's
export type GetDragIdByCourse = (course: DraggableCourse) => UniqueIdentifier;

export type GetDragIdByCourseAndReq = (
  course: DraggableCourse,
  requirement: DegreeRequirement,
) => UniqueIdentifier;

export type GetDragIdByCourseAndSemester = (
  course: DraggableCourse,
  semester: Semester,
) => UniqueIdentifier;

// Toast message passed back to Planner component
export interface ToastMessage {
  message: string;
  level: 'ok' | 'warn' | 'error';
}