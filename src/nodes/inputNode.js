import React from "react";
import { Node, Position } from "./Node";
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';

export const InputNode = ({ id, data, selected }) => {
  return (
    <Node
      id={id}
      data={data}
      selected={selected}
      title="Input"
      icon={ArrowRightOnRectangleIcon}
      handles={[{ id: "value", type: "source", position: Position.Right }]}
      fields={[
        { kind: "text", key: "inputName", label: "Name", defaultValue: id.replace("customInput-", "input_") },
        {
          kind: "select",
          key: "inputType",
          label: "Type",
          defaultValue: "Text",
          options: [
            { value: "Text", label: "Text" },
            { value: "File", label: "File" },
          ],
        },
      ]}
    />
  );
};
