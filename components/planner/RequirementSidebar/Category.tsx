import InfoIcon from '@mui/icons-material/Info';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

import { CategoryRequirement } from '../../../modules/planner/types';
import { Course } from './Course';
import { CourseGroup } from './CourseGroup';

export function Category({ name, requirements }: CategoryRequirement) {
  const children = requirements.map((requirement, index) => {
    if ('catalogCode' in requirement) {
      return (
        <Course
          key={requirement.id}
          id={requirement.id}
          status={requirement.status}
          name={requirement.name}
          totalRequired={requirement.totalRequired}
          title={requirement.title}
          catalogCode={requirement.catalogCode}
          description={requirement.description}
          creditHours={requirement.creditHours}
          index={index}
        />
      );
    } else {
      return <CourseGroup group={requirement} index={index} key={requirement.id} />;
    }
  });

  return (
    <Accordion className="my-2 w-full bg-white rounded-xl hover:bg-gray-100 border-gray-200 border-2 ">
      <AccordionSummary
        className="flex flex-row"
        expandIcon={<InfoIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <div className=""> {name} </div>
      </AccordionSummary>

      <AccordionDetails className="flex flex-col">{children}</AccordionDetails>
    </Accordion>
  );
}
