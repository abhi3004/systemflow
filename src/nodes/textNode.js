import React from "react";
import { Node, Position } from "./Node";

export const TextNode = ({ id, data, selected }) => {
  return (
    <Node
      id={id}
      data={data}
      selected={selected}
      title="Text"
      handles={[{ id: "output", type: "source", position: Position.Right }]}
      fields={[
        { kind: "text", key: "text", label: "Text", defaultValue: "{{input}}" },
      ]}
    />
  );
};