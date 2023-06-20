import React, { useState } from "react";
import styled from "@emotion/styled";
import Column from "./Column";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const Container = styled("div")`
  display: flex;
  background-color: ${(props) =>
    props.isDraggingOver ? "#639ee2" : "inherit"};
`;

function DragDrop({
  options,
  index,
  name,
  props,
  questionId,
  takingInitialState,
}) {
  const [draggableId, setDraggableId] = useState([]);

  let taskId = [];
  let task = {};
  for (const i of options) {
    task[i.option_id] = { id: i.option_id, content: i.answer };
    taskId.push(i.option_id);
  }
  const [starter, setStarter] = useState({
    tasks: task,
    columns: {
      "column-1": {
        id: "column-1",
        title: "Options",
        taskIds: taskId,
      },
      "column-2": {
        id: "column-2",
        title: "Answer",
        taskIds: [],
      },
    },
    columnOrder: ["column-1", "column-2"],
  });

  const onDragEnd = ({ destination, source, draggableId, type }) => {
    props.setFieldValue(`${name}.${0}.question_id`, questionId.id);
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = starter.columns[source.droppableId];
    const end = starter.columns[destination.droppableId];

    if (type === "column") {
      const newOrder = [...starter.columnOrder];
      newOrder.splice(source.index, 1);
      newOrder.splice(destination.index, 0, draggableId);

      setStarter({
        ...starter,
        columnOrder: newOrder,
      });
      return;
    }

    if (start === end) {
      const column = starter.columns[source.droppableId];
      const taskIds = [...column.taskIds];
      taskIds.splice(source.index, 1);
      taskIds.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...column,
        taskIds,
      };

      setStarter({
        ...starter,
        columns: {
          ...starter.columns,
          [column.id]: newColumn,
        },
      });
      takingInitialState({
        ...starter,
        columns: {
          ...starter.columns,
          [column.id]: newColumn,
        },
      });
      return;
    }

    const startTaskIds = [...start.taskIds];
    const endTaskIds = [...end.taskIds];

    startTaskIds.splice(source.index, 1);
    endTaskIds.splice(destination.index, 0, draggableId);
    const newStartColumn = {
      ...start,
      taskIds: startTaskIds,
    };
    const endTaskColumn = {
      ...end,
      taskIds: endTaskIds,
    };

    
    if (newStartColumn.id === "column-2") {
      props.setFieldValue(`${name}.${0}.answer`, newStartColumn.taskIds);
    }
    if (endTaskColumn.id === "column-2") {
      props.setFieldValue(`${name}.${0}.answer`, endTaskColumn.taskIds);
    }

    setStarter({
      ...starter,
      columns: {
        ...starter.columns,
        [start.id]: newStartColumn,
        [end.id]: endTaskColumn,
      },
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-column" type="column" direction="horizontal">
        {(provided, snapshot) => (
          <Container
            isDraggingOver={snapshot.isDraggingOver}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {starter.columnOrder.map((columnId, index) => {
              const column = starter.columns[columnId];
              const tasks = column.taskIds.map(
                (taskId) => starter.tasks[taskId]
              );
              return (
                <>
                  <Column
                    index={index}
                    key={column.id}
                    column={column}
                    tasks={tasks}
                    name={name}
                    props={props}
                    draggableId={draggableId}
                    questionId={questionId}
                  />
                </>
              );
            })}

            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
}
export default DragDrop;
