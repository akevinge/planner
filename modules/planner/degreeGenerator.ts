const nodes = [
  { name: 'ECS 1100', group: 1 },
  { name: 'UNIV 1010', group: 2 },
  { name: 'MATH 2413', group: 3 },
  { name: 'MATH 2414', group: 4 },
  { name: 'CS 1200', group: 5 },
  { name: 'CS 1336', group: 6 },
  { name: 'CS 1136', group: 7 },
  { name: 'CS 1337', group: 8 },
  { name: 'PHYS 2325', group: 9 },
  { name: 'PHYS 2125', group: 10 },
  { name: 'CS 2305', group: 11 },
  { name: 'CS 2336', group: 12 },
  { name: 'PHYS 2326', group: 13 },
  { name: 'PHYS 2126', group: 14 },
  { name: 'CS 3305', group: 15 },
  { name: 'CS 2340', group: 16 },
  { name: 'MATH 2418', group: 17 },
  { name: 'CS 3341', group: 18 },
  { name: 'CS 3345', group: 19 },
  { name: 'CS 3377', group: 20 },
  { name: 'CS 4341', group: 21 },
  { name: 'CS 4141', group: 22 },
  { name: 'CS 4337', group: 23 },
  { name: 'CS 3354', group: 24 },
  { name: 'ECS 3390', group: 25 },
  { name: 'CS 4349', group: 26 },
  { name: 'CS 3162', group: 27 },
  { name: 'CS 4348', group: 28 },
  { name: 'CS 4384', group: 29 },
  { name: 'CS 4347', group: 30 },
  { name: 'CS 4485', group: 31 },
  { name: 'UNIV 2020', group: 32 },
];
const links = [
  { source: 1, target: 2, weight: 1 },
  { source: 3, target: 4, weight: 1 },
  { source: 3, target: 17, weight: 1 },
  { source: 4, target: 9, weight: 1 },
  { source: 4, target: 18, weight: 1 },
  { source: 6, target: 7, weight: 1 },
  { source: 6, target: 8, weight: 1 },
  { source: 8, target: 12, weight: 1 },
  { source: 8, target: 16, weight: 1 },
  { source: 9, target: 10, weight: 1 },
  { source: 9, target: 13, weight: 1 },
  { source: 11, target: 18, weight: 1 },
  { source: 11, target: 15, weight: 1 },
  { source: 11, target: 16, weight: 1 },
  { source: 11, target: 19, weight: 1 },
  { source: 11, target: 23, weight: 1 },
  { source: 11, target: 24, weight: 1 },
  { source: 12, target: 19, weight: 1 },
  { source: 12, target: 20, weight: 1 },
  { source: 12, target: 23, weight: 1 },
  { source: 12, target: 24, weight: 1 },
  { source: 13, target: 14, weight: 1 },
  { source: 13, target: 21, weight: 1 },
  { source: 15, target: 28, weight: 1 },
  { source: 15, target: 26, weight: 1 },
  { source: 15, target: 29, weight: 1 },
  { source: 16, target: 21, weight: 1 },
  { source: 16, target: 23, weight: 1 },
  { source: 16, target: 28, weight: 1 },
  { source: 18, target: 19, weight: 1 },
  { source: 19, target: 30, weight: 1 },
  { source: 19, target: 26, weight: 1 },
  { source: 19, target: 27, weight: 1 },
  { source: 19, target: 28, weight: 1 },
  { source: 19, target: 31, weight: 1 },
  { source: 20, target: 28, weight: 1 },
  { source: 21, target: 22, weight: 1 },
  { source: 24, target: 27, weight: 1 },
  { source: 25, target: 24, weight: 1 },
  { source: 24, target: 31, weight: 1 },
];

/*
 *  Given a single course, returns all the courses required in semester chunks.
 */
export function generateDegree(node_ids: number[], creditHours: number) {
  const first_level = [];
  node_ids.forEach((id) => {
    first_level.push(nodes[id - 1]);
  });
  let courses = [first_level];
  let prereqs_exist = true;
  while (prereqs_exist) {
    prereqs_exist = addNextLevel(courses);
    courses = filter_prereqs(courses);
  }

  courses = courses.reverse();

  const credithours_limit = creditHours || 15;
  print_prereqs(semesterify(courses, credithours_limit));
}

/*
 *  Given a "semester" of courses, addNextLevel finds all courses that must be taken a semester before.
 *  If a course has to have been taken, then it returns true, else it returns false.
 *  Note that it does not check for duplicate courses.
 */
function addNextLevel(course_arr: number[]) {
  const level = [];
  const slice = course_arr[course_arr.length - 1];
  let courses_added = false;

  //TODO: Clean this up later
  for (let slice_index = 0; slice_index < slice.length; slice_index++) {
    const course = slice[slice_index];
    //console.log(course)
    for (let link_index = 0; link_index < links.length; link_index++) {
      //temporary implmementation
      if (links[link_index].target == course.group) {
        level.push(nodes[links[link_index].source - 1]);
        courses_added = true;
      }
    }
  }
  if (courses_added) {
    course_arr.push(level);
  }
  return courses_added;
}

/*
 *  Given a set of required courses, filters out duplicate entries prioritizing earlier semesters first.
 *  Returns an array of the trimmed down set of semesters.
 */
function filter_prereqs(courseLevels: number[]) {
  const seen = {};
  const filteredLevels = [];
  courseLevels.reverse();
  courseLevels.forEach((level) => {
    const singleFilterLevel = [];
    level.forEach((course) => {
      if (!seen[course.name]) {
        seen[course.name] = 1;
        singleFilterLevel.push(course);
      }
    });
    if (singleFilterLevel.length > 0) {
      filteredLevels.push(singleFilterLevel);
    }
  });
  filteredLevels.reverse();
  courseLevels.reverse();
  return filteredLevels;
}

/*
 *  Converts an object array of semesters into a set of strings and displays it in the DOM.
 */
function print_prereqs(courses: number[]) {
  const root = document.getElementById('output');
  for (let slice_index = 0; slice_index < courses.length; slice_index++) {
    const slice = courses[slice_index];
    let line = 'Semester ' + (slice_index + 1) + ': ';
    for (let course_index = 0; course_index < slice.length; course_index++) {
      const course = slice[course_index];
      line = line + ' ' + course.name;
    }
    //Add the line of text to the DOM
    const paragraph = document.createElement('p');
    paragraph.textContent = line;
    root.appendChild(paragraph);
  }
}

/*
 *  Retrieves the course in the textfield and tries to match it with a course in nodes.
 */
function parseInput(stringOfCourses: string) {
  const names = stringOfCourses.value.replaceAll(' ', '').split(',');
  const input = [];

  //Simple formatting to trim spaces
  for (let name_index = 0; name_index < names.length; name_index++) {
    const name = names[name_index];
    const numbers = name.replaceAll(/[^0-9]/g, '');
    let letters = name.replaceAll(/[0-9]/g, '');
    letters = letters.toUpperCase();
    names[name_index] = letters + ' ' + numbers;
  }

  //If the course number exists, add it to the input list
  names.forEach((courseName) => {
    nodes.forEach((courseObject) => {
      if (courseObject.name === courseName) {
        input.push(courseObject.group);
      }
    });
  });
  find_prereqs(input);
}

/*
 * prereqLayers is a 2d array of the FASTEST sequence.
 * max_credit_hour is the MAX number of credits a user wants to take per semester
 * note that this is far from optimal. it just ensures a decently fast plan
 */
function semesterify(prereqLayers: number[], maxCreditHour: number) {
  const degreePlan = [];
  const semesterCourses = [];
  let currentCredits = 0;
  const ELECTIVE_CREDITS = 3;

  prereqLayers.forEach((requiredCourses) => {
    requiredCourses.forEach((course) => {
      //temp value for now
      const courseCreditHours = 3;
      if (currentCredits + courseCreditHours <= maxCreditHour) {
        semesterCourses.push(course);
        currentCredits += courseCreditHours;
      } else {
        degreePlan.push(semesterCourses.splice(0, semesterCourses.length));
        semesterCourses.push(course);
        currentCredits = courseCreditHours;
      }
    });
    if (currentCredits + ELECTIVE_CREDITS <= maxCreditHour) {
      while (currentCredits + ELECTIVE_CREDITS <= maxCreditHour) {
        //temp values for now
        semesterCourses.push({ name: '[ELECTIVE]', credithours: ELECTIVE_CREDITS });
        currentCredits += ELECTIVE_CREDITS;
      }
      degreePlan.push(semesterCourses.splice(0, semesterCourses.length));
      currentCredits = 0;
    }
  });
  return degreePlan;
}
