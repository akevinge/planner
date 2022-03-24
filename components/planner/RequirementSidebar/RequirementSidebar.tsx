import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import plan from '../../../data/Bachelor of Science in Computer Science.json';
import { createRequirementObject } from '../../../modules/planner/plannerUtils';
import { ChildUpdateMap, PlanRequirements } from '../../../modules/planner/types';
import { Degree } from './Degree';

/**
 * This component lists all the requirements needed to fulfill a course plan
 */
export function RequirementSidebar() {
  // TODO: Get requirement data from Redux state
  // TODO: Change to PlanRequirements
  const degreePlan: PlanRequirements = {
    name: 'Degree Plan',
    requirements: [createRequirementObject(plan)],
    status: false,
    fulfilled: 0,
    id: 'plan',
    totalRequired: 1,
  };

  /* 
  Rendering plan: 
  1. Get data from degree & render in DegreeRequirement
  2. Pass "requirements" data into DegreeRequirement
  3. For each data point in DegreeRequirement, recursively pass into Category
  4. For each category, pass into either course or section
  5. For section, render the card & give user option to select (have it either be a course or array of courses)
  6. Provide override flag for all course & sections
  */

  // Change to PlanRequirements
  const [requirements, setRequirements] = React.useState<PlanRequirements>(degreePlan);

  const children = requirements.requirements.map((degree) => {
    return (
      <Degree
        type={degree.type}
        key={degree.id}
        fulfilled={degree.fulfilled}
        id={degree.id}
        status={degree.status}
        requirements={degree.requirements}
        name={degree.name}
        totalRequired={degree.totalRequired}
      />
    );
  });

  // Contains content of application
  const content = (
    <article className="flex flex-col w-80 bg-green-100 h-80">
      <Droppable key={'selector'} droppableId={'selector'} isDropDisabled={true}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <section>{children}</section>
          </div>
        )}
      </Droppable>
    </article>
  );

  // TODO: Figure out how to initialize
  let updateMap: ChildUpdateMap;

  // TODO: Write logic to update sidebar
  // Idea is to pass in a course, use a map to find all instances of course in requirement,
  // update requirements object, then rerender the memoized contents
  const updateSidebar = (course: string) => {
    console.log('Implement me');
  };
  return <div>{content}</div>;
}
