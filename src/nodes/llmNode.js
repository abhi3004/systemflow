import React, { useState, useCallback } from "react";
import { Node, Position } from "./Node";
import { useReactFlow } from "reactflow";
import { SettingsDrawer, SettingsButton } from "../components/SettingsDrawer";
import { CpuChipIcon } from '@heroicons/react/24/solid';

const LLM_FIELDS = [
  {
    kind: "select", key: "model", label: "Model", options: [
      { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
      { value: "gpt-4", label: "GPT-4" },
      { value: "gpt-4-turbo", label: "GPT-4 Turbo" },
      { value: "claude-3", label: "Claude 3" },
    ]
  },
  {
    kind: "select", key: "temperature", label: "Temperature", options: [
      { value: "0", label: "0" },
      { value: "0.25", label: "0.25" },
      { value: "0.5", label: "0.5" },
      { value: "0.75", label: "0.75" },
      { value: "1", label: "1" },
    ]
  },
  {
    kind: "select", key: "maxTokens", label: "Max Tokens", options: [
      { value: "100", label: "100" },
      { value: "200", label: "200" },
      { value: "500", label: "500" },
      { value: "1000", label: "1000" },
      { value: "2000", label: "2000" },
    ]
  },
  { kind: "text", key: "systemPrompt", label: "System Prompt" },
];

export const LLMNode = ({ id, data, selected }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const { setNodes } = useReactFlow();

  const openDrawer = () => {
    setFormData({
      model: data?.model || "gpt-3.5-turbo",
      temperature: data?.temperature || "0.5",
      maxTokens: data?.maxTokens || "100",
      systemPrompt: data?.systemPrompt || "",
    });
    setIsDrawerOpen(true);
  };

  const handleFormChange = (key) => (e) => {
    setFormData(prev => ({ ...prev, [key]: e.target.value }));
  };

  const handleApply = useCallback(() => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: { ...node.data, ...formData },
          };
        }
        return node;
      })
    );
  }, [id, formData, setNodes]);

  const handleCancel = () => {
    setFormData({});
  };

  return (
    <>
      <Node
        id={id}
        data={data}
        selected={selected}
        title={'LLM'}
        icon={CpuChipIcon}
        handles={[
          { id: "system", type: "target", position: Position.Left, style: { top: "33%" } },
          { id: "prompt", type: "target", position: Position.Left, style: { top: "66%" } },
          { id: "response", type: "source", position: Position.Right },
        ]}
        fields={[
          { kind: "select", key: "model", label: "Model", options: LLM_FIELDS.find(f => f.key === "model").options },
        ]}
      >
        <SettingsButton onClick={openDrawer} />
      </Node>

      <SettingsDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="LLM Settings"
        onApply={handleApply}
        onCancel={handleCancel}
      >
        <div className="space-y-4">
          {LLM_FIELDS.map((field) => (
            <label key={field.key} className="block">
              <span className="label">{field.label}</span>
              {field.kind === "select" ? (
                <select
                  className="select w-full"
                  value={formData[field.key] || ""}
                  onChange={handleFormChange(field.key)}
                >
                  {field.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  className="input w-full"
                  value={formData[field.key] || ""}
                  onChange={handleFormChange(field.key)}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                />
              )}
            </label>
          ))}
        </div>
      </SettingsDrawer>
    </>
  );
};