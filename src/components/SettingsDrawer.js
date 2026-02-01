import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Cog6ToothIcon, XMarkIcon } from '@heroicons/react/24/solid';

export const SettingsDrawer = ({ isOpen, onClose, title, children, onApply, onCancel }) => {
    if (!isOpen) return null;

    const handleApply = () => {
        onApply?.();
        onClose();
    };

    const handleCancel = () => {
        onCancel?.();
        onClose();
    };

    return createPortal(
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/30 z-[1001] transition-opacity duration-300"
                onClick={handleCancel}
            />

            {/* Drawer */}
            <div className="fixed top-0 right-0 h-full w-80 bg-[var(--bg-color)] border-l border-[var(--border-color)] z-[1002] shadow-xl transform transition-transform duration-300 ease-out">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-[var(--border-color)]">
                    <h2 className="font-semibold text-lg text-[var(--text-color)]">{title}</h2>
                    <button
                        onClick={handleCancel}
                        className="p-1 rounded-lg hover:bg-[var(--card-bg)] transition-colors"
                    >
                        <XMarkIcon className="w-5 h-5 text-[var(--text-color)]" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 overflow-y-auto h-[calc(100%-130px)]">
                    {children}
                </div>

                {/* Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[var(--border-color)] bg-[var(--bg-color)] flex gap-3">
                    <button
                        onClick={handleCancel}
                        className="btn-secondary flex-1"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleApply}
                        className="btn-primary flex-1"
                    >
                        Apply
                    </button>
                </div>
            </div>
        </>,
        document.body
    );
};

export const SettingsButton = ({ onClick }) => {
    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                onClick?.();
            }}
            className="absolute top-2 right-2 p-1 rounded-lg hover:bg-[var(--border-color)] transition-colors z-10"
        >
            <Cog6ToothIcon className="w-4 h-4 text-[var(--text-color)]" />
        </button>
    );
};
