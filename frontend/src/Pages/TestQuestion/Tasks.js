import React from "react";
import styled from "@emotion/styled";
import { Draggable } from "react-beautiful-dnd";

const Container = styled("div")`
  border: 1px solid lightgrey;
  margin-bottom: 8px;
  border-radius: 2px;
  padding: 8px;
  background: ${(props) => (props.isDragging ? "lightgreen" : "white")};
`;

const Task = ({ task, index}) => {


  return (
    <Draggable draggableId={task.id.toString()} index={index} type="task">
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          isDragging={snapshot.isDragging}
        >
          <div className="ssdn-editor-font"
            dangerouslySetInnerHTML={{ __html: task.content }}
          />
        </Container>
      )}
    </Draggable>
  );
};

export default Task;
