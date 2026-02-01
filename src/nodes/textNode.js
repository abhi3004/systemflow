import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Handle, Position, useReactFlow } from "reactflow";
import { DocumentTextIcon } from '@heroicons/react/24/solid';

const VARIABLE_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

export const TextNode = ({ id, data, selected }) => {
  const [text, setText] = useState(data?.text ?? "{{input}}");
  const textareaRef = useRef(null);
  const { setNodes } = useReactFlow();

  const variables = useMemo(() => {
    const matches = [...text.matchAll(VARIABLE_REGEX)];
    const uniqueVars = [...new Set(matches.map(m => m[1]))];
    return uniqueVars;
  }, [text]);

  // Sync text to node data
  useEffect(() => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: { ...node.data, text },
          };
        }
        return node;
      })
    );
  }, [id, text, setNodes]);

  const adjustSize = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, []);

  useEffect(() => {
    adjustSize();
  }, [text, adjustSize]);

  const variableHandles = useMemo(() => {
    return variables.map((varName, index) => ({
      id: varName,
      type: "target",
      position: Position.Left,
      style: {
        top: `${((index + 1) / (variables.length + 1)) * 100}%`
      },
    }));
  }, [variables]);

  const nodeWidth = useMemo(() => {
    const minWidth = 200;
    const maxWidth = 400;
    const charWidth = 8;
    const longestLine = text.split('\n').reduce((max, line) => Math.max(max, line.length), 0);
    return Math.min(maxWidth, Math.max(minWidth, longestLine * charWidth + 40));
  }, [text]);

  return (
    <div
      className={`card relative ${selected ? 'ring-2 ring-blue-500' : ''}`}
      style={{ width: nodeWidth, minHeight: 80 }}
    >
      {variableHandles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={`${id}-${handle.id}`}
          style={handle.style}
        >
          <span className="absolute right-4 text-xs text-[var(--text-color)] whitespace-nowrap bg-[var(--card-bg)] px-1 rounded">
            {handle.id}
          </span>
        </Handle>
      ))}

      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
      />

      {/* Title */}
      <div className="flex items-center gap-2 font-semibold mb-2 text-[var(--text-color)]">
        <DocumentTextIcon className="w-4 h-4" />
        Text
      </div>

      {/* Auto-resizing textarea */}
      <div className="space-y-2">
        <label className="block">
          <span className="label">Text</span>
          <textarea
            ref={textareaRef}
            className="input w-full resize-none overflow-hidden"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text with {{variables}}"
            rows={1}
            style={{ minHeight: '36px' }}
          />
        </label>
      </div>

      {variables.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {variables.map((v) => (
            <span
              key={v}
              className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full"
            >
              {v}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};