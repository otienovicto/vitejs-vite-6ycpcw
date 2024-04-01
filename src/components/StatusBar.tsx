import { h, FunctionalComponent } from 'preact';

interface StatusBarProps {
  numShapes: number;
  numSelected: number;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const StatusBar: FunctionalComponent<StatusBarProps> = ({
  numShapes,
  numSelected,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
}) => {
  return (
    <div class="statusbar">
      {numSelected === 0 ? (
        <span>{numShapes} shapes</span>
      ) : (
        <span>Selected {numSelected}</span>
      )}
      <button onClick={onUndo} disabled={!canUndo}>
        Undo
      </button>
      <button onClick={onRedo} disabled={!canRedo}>
        Redo
      </button>
    </div>
  );
};

export default StatusBar;
