import { DragDropContext } from 'react-beautiful-dnd';
import { Semester } from '../../modules/common/data';
import DroppableSemesterBlock from '../common/DroppableSemesterBlock/DroppableSemesterBlock';
import homePageSemesters from '../../data/home-page-plan.json';

const DEMO_SEMESTERS: Semester[] = homePageSemesters;

/**
 * A section that displays a scrollable list of semster blocks.
 */
export default function DemoCoursesSection() {
  const listItems = DEMO_SEMESTERS.map((semester) => {
    return (
      <div className="inline-block" key={semester.code}>
        <DroppableSemesterBlock
          semesterCode={semester.code}
          semesterTitle={semester.title}
          courses={semester.courses}
        />
      </div>
    );
  });

  return (
    <div className="md:ml-16 md:flex md:flex-nowrap">
      <DragDropContext
        onDragEnd={() => undefined}
        // We don't really care about the drag-drop functionality.
        // This is just a side effct of how the DroppableSemesterBlocks are implemented.
      >
        {listItems}
      </DragDropContext>
    </div>
  );
}
