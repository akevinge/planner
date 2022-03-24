import InfoIcon from '@mui/icons-material/Info';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';

import { Course } from '../../../modules/common/data';
import { CourseRequirement } from '../../../modules/planner/types';

export function Course({
  catalogCode,
  title,
  description,
  creditHours,
  id,
  index,
}: CourseRequirement & { index: number }) {
  // TODO: Write logic to dictate whether or not component should be enabled

  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          className="mx-1"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Accordion className="my-2 w-full bg-white rounded-xl hover:bg-gray-100 border-gray-200 border-2 ">
            <AccordionSummary
              className="flex flex-row"
              expandIcon={<InfoIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <div className=""> {catalogCode} </div>
            </AccordionSummary>

            <AccordionDetails className="flex flex-col">
              <div className="text-xl">{title}</div>
              <div className="text-md"> Description: </div>
              <div className="text-xs">{description}</div>
            </AccordionDetails>
          </Accordion>
        </div>
      )}
    </Draggable>
  );
}
