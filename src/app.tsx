import { h, FunctionalComponent } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import Toolbar from './components/Toolbar';
import ShapeList from './components/ShapeList';
import StatusBar from './components/StatusBar';
import './app.css'; // Assuming you have global styles in this file

interface Shape {
  id: number;
  type: string;
  selected: boolean;
}

interface HistoryItem {
  shapes: Shape[];
  selectedShapes: number[];
}

const App: FunctionalComponent = () => {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [selectedShapes, setSelectedShapes] = useState<number[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  useEffect(() => {
    // Initialize history with the current state
    setHistory([{ shapes, selectedShapes }]);
    setHistoryIndex(0);
  }, []);

  const addShape = (shapeType: string) => {
    if (shapes.length >= 25) return; // Limit to 25 shapes
    const newShape: Shape = {
      id: shapes.length + 1,
      type: shapeType,
      selected: false,
    };
    const updatedShapes = [...shapes, newShape];
    setShapes(updatedShapes);
    setSelectedShapes([...selectedShapes, newShape.id]);

    // Update history
    updateHistory({ shapes: updatedShapes, selectedShapes });
  };

  const deleteSelectedShapes = () => {
    const remainingShapes = shapes.filter(
      (shape) => !selectedShapes.includes(shape.id)
    );
    setShapes(remainingShapes);
    setSelectedShapes([]);

    // Update history
    updateHistory({ shapes: remainingShapes, selectedShapes: [] });
  };

  const clearAllShapes = () => {
    setShapes([]);
    setSelectedShapes([]);

    // Update history
    updateHistory({ shapes: [], selectedShapes: [] });
  };

  const toggleShapeSelection = (id: number) => {
    if (selectedShapes.includes(id)) {
      setSelectedShapes(selectedShapes.filter((shapeId) => shapeId !== id));
    } else {
      setSelectedShapes([...selectedShapes, id]);
    }
  };

  const updateHistory = (state: HistoryItem) => {
    const newHistory = [...history.slice(0, historyIndex + 1), state];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1];
      setShapes(prevState.shapes);
      setSelectedShapes(prevState.selectedShapes);
      setHistoryIndex(historyIndex - 1);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      setShapes(nextState.shapes);
      setSelectedShapes(nextState.selectedShapes);
      setHistoryIndex(historyIndex + 1);
    }
  };

  return (
    <div class="app">
      {/* Toolbar component */}
      <Toolbar
        onAddShape={addShape}
        onDeleteSelected={deleteSelectedShapes}
        onClearAll={clearAllShapes}
        onUndo={undo}
        onRedo={redo}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
      />

      {/* Shape list component */}
      <ShapeList shapes={shapes} onSelectShape={toggleShapeSelection} />

      {/* Status bar component */}
      <StatusBar
        numShapes={shapes.length}
        numSelected={selectedShapes.length}
      />
    </div>
  );
};

export default App;
