import { DragDropContext } from 'react-beautiful-dnd';

import { RequirementSidebar } from '../../../components/planner/RequirementSidebar/RequirementSidebar';

export default function Test() {
  return (
    <DragDropContext onDragEnd={() => console.log('HI')}>
      <RequirementSidebar />
    </DragDropContext>
  );
}
