import React, { useCallback } from "react";
import { Handle, Position, useReactFlow } from "reactflow";

function useNodeData(id, data) {
    const { setNodes } = useReactFlow();
    const getValue = useCallback((key, fallback) =>
        (data && data?.[key] !== undefined ? data[key] : fallback)
        , [data]);
    const setValue = useCallback((key, value) => {
        setNodes((nodes) => {
            return nodes.map((node) => {
                if (node.id === id) {
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            [key]: value,
                        },
                    };
                }
                return node;
            });
        });
    }, [id, setNodes]);

    const handleChange = useCallback((key) => (e) => {
        setValue(key, e.target.value);
    }, [setValue]);

    return {
        getValue,
        setValue,
        handleChange,
    };
}

export const Node = ({
    id,
    data,
    title,
    width = 200,

    height = 100,
    handles = [],
    fields = [],
    selected,
    children,
    ...props
}) => {
    const { getValue, handleChange } = useNodeData(id, data);
    return (
        <div
            className={`card relative ${selected ? 'ring-2 ring-blue-500' : ''}`}
            style={{ width, minHeight: height }}
            {...props}
        >
            {children}
            {handles.map((handle) => (
                <Handle
                    key={handle.id}
                    type={handle.type}
                    position={handle.position}
                    id={`${id}-${handle.id}`}
                />
            ))}
            {title && <div className="font-semibold mb-2 text-[var(--text-color)]">{title}</div>}
            {fields.length > 0 && (
                <div className="space-y-2">
                    {fields.map((f) => {
                        const value = getValue(f.key, f.defaultValue ?? "");
                        if (f.kind === "text") {
                            return (
                                <label key={f.key} className="block">
                                    <span className="label">{f.label}</span>
                                    <input
                                        type="text"
                                        className="input w-full"
                                        value={value}
                                        onChange={handleChange(f.key)}
                                    />
                                </label>
                            );
                        }

                        if (f.kind === "select") {
                            return (
                                <label key={f.key} className="block">
                                    <span className="label">{f.label}</span>
                                    <select className="select w-full" value={value} onChange={handleChange(f.key)}>
                                        {f.options.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            );
                        }

                        return null;
                    })}
                </div>
            )}
        </div>
    )
}

export { Position };