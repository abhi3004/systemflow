import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { useStore } from './store';
import { ThemeToggle } from './ThemeToggle';

function App() {
  const { nodes, edges } = useStore();

  return (
    <div>
      <ThemeToggle />
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton nodes={nodes} edges={edges} />
    </div>
  );
}

export default App;
