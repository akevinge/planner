import InfoIcon from '@mui/icons-material/Info';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

import { DegreeRequirement } from '../../../modules/planner/types';
import { Category } from './Category';

export function Degree({ requirements, name, totalRequired }: DegreeRequirement) {
  const hours = totalRequired;

  const children = requirements.map((category) => {
    return (
      <Category
        key={category.id}
        fulfilled={category.fulfilled}
        id={category.id}
        status={category.status}
        requirements={category.requirements}
        name={category.name}
        totalRequired={category.totalRequired}
      />
    );
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
        <div> {hours}</div>
      </AccordionSummary>

      <AccordionDetails className="flex flex-col">{children}</AccordionDetails>
    </Accordion>
  );
}
