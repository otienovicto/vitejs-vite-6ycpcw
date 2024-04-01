import { h, FunctionalComponent } from 'preact';
import { useState } from 'preact/hooks';

interface ToolbarProps {
  onAddShape: (shapeType: string) => void;
  onDeleteSelected: () => void;
  onClearAll: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const Toolbar: FunctionalComponent<ToolbarProps> = ({
  onAddShape,
  onDeleteSelected,
  onClearAll,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
}) => {
  const [selectedShape, setSelectedShape] = useState<string>('Square');

  const handleAddShape = () => {
    onAddShape(selectedShape);
  };

  const handleSelectChange = (e: h.JSX.TargetedEvent<HTMLSelectElement>) => {
    setSelectedShape(e.currentTarget.value);
  };

  return (
    <div class="toolbar">
      <button onClick={handleAddShape}>Add {selectedShape}</button>
      <select value={selectedShape} onChange={handleSelectChange}>
        <option value="Square">Square</option>
        <option value="Star">Star</option>
        <option value="Bullseye">Bullseye</option>
        <option value="Cat">Cat</option>
      </select>
      <button onClick={onDeleteSelected}>Delete</button>
      <button onClick={onClearAll}>Clear</button>
      <button onClick={onUndo} disabled={!canUndo}>
        Undo
      </button>
      <button onClick={onRedo} disabled={!canRedo}>
        Redo
      </button>
    </div>
  );
};

export default Toolbar;
