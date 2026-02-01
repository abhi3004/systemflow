import React from "react";
import { Node, Position } from "./Node";
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid';

export const OutputNode = ({ id, data, selected }) => {
  return (
    <Node
      id={id}
      data={data}
      selected={selected}
      title="Output"
      icon={ArrowLeftOnRectangleIcon}
      handles={[{ id: "value", type: "target", position: Position.Left }]}
      fields={[
        { kind: "text", key: "outputName", label: "Name", defaultValue: id.replace("customOutput-", "output_") },
        {
          kind: "select",
          key: "outputType",
          label: "Type",
          defaultValue: "Text",
          options: [
            { value: "Text", label: "Text" },
            { value: "File", label: "Image" },
          ],
        },
      ]}
    />
  );
};