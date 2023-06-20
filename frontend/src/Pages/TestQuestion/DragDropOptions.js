import React from "react";
import { useDrag } from "react-dnd";

export default function DragDropOptions({ id, title }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "text",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <h6 
      ref={drag}
      title={title}
      width="150px"
      style={{ border: isDragging ? "5px solid black" : "0px",margin: "5px" }} className="ssdn-editor-font"
       dangerouslySetInnerHTML={{ __html: title }}
    />
  );
}
