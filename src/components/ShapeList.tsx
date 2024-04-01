import { h, FunctionalComponent } from 'preact';

interface Shape {
  id: number;
  type: string;
  selected: boolean;
}

interface ShapeListProps {
  shapes: Shape[];
  onSelectShape: (id: number) => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const ShapeList: FunctionalComponent<ShapeListProps> = ({
  shapes,
  onSelectShape,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
}) => {
  const handleSelectShape = (id: number) => {
    onSelectShape(id);
  };

  return (
    <div class="shapelist">
      {shapes.map((shape) => (
        <div
          key={shape.id}
          class={`shape ${shape.selected ? 'selected' : ''}`}
          onClick={() => handleSelectShape(shape.id)}
        >
          {shape.type}
        </div>
      ))}
      <button onClick={onUndo} disabled={!canUndo}>
        Undo
      </button>
      <button onClick={onRedo} disabled={!canRedo}>
        Redo
      </button>
    </div>
  );
};

export default ShapeList;
