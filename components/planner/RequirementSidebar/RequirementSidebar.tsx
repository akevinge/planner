import React from 'react';

import { ChildUpdateMap, PlanRequirements } from '../../../modules/planner/types';

/**
 * This component lists all the requirements needed to fulfill a course plan
 */
export function RequirementSidebar() {
  // TODO: Get requirement data from Redux state
  let planRequirements: PlanRequirements;

  const [requirements, setRequirements] = React.useState<PlanRequirements>(planRequirements);

  // TODO: Write logic to render sidebar requirement children
  let children;

  // Contains content of application
  const content = (
    <article className="flex">
      <section className="">
        <div>Major(s) here</div>
        <div># credit hours here</div>
      </section>
      <section>{children}</section>
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
  return { content };
}
