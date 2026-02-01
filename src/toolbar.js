import { DraggableNode } from './draggableNode';
import {
    ArrowRightOnRectangleIcon,
    CpuChipIcon,
    ArrowLeftOnRectangleIcon,
    DocumentTextIcon
} from '@heroicons/react/24/solid';

export const PipelineToolbar = () => {

    return (
        <div style={{ padding: '10px' }}>
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <DraggableNode type='customInput' label='Input' icon={ArrowRightOnRectangleIcon} />
                <DraggableNode type='llm' label='LLM' icon={CpuChipIcon} />
                <DraggableNode type='customOutput' label='Output' icon={ArrowLeftOnRectangleIcon} />
                <DraggableNode type='text' label='Text' icon={DocumentTextIcon} />
            </div>
        </div>
    );
};

