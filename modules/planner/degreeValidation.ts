/*
 * schedule is a 2d array. we assume it's in chronological order.
 */
export function validation(schedule: number[]) {
  const completed = {};
  let validSchedule = true;

  schedule.forEach((semester) => {
    semester.forEach((course) => {
      const prereq_courses = getPrerequisites(course.group);

      //Check if the prerequisites are in completed
      prereq_courses.forEach((prerequisite) => {
        if (completed[prerequisite.name] === null) {
          validSchedule = false;
          return validSchedule;
        }
      });
    });
    semester.forEach((course) => {
      completed[course.name] = 'TAKEN';
    });
  });

  return validSchedule;
}

/*
 *  Returns list of courses that are prereqs for the parameter.
 */
export function getPrerequisites(node_id: number) {
  const prerequisite_courses = [];
  links.forEach((courseRelation) => {
    const postreq_id = courseRelation.target;
    if (node_id === postreq_id) {
      const course = nodes[courseRelation.source - 1];
      prerequisite_courses.push(course);
    }
  });
  return prerequisite_courses;
}
