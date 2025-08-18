import { WordleCell, CellState } from "./WordleCell";

export interface GridData {
  letters: string[][];
  states: CellState[][];
}

interface WordleGridProps {
  gridData: GridData;
  onCellClick: (row: number, col: number) => void;
}

export const WordleGrid = ({ gridData, onCellClick }: WordleGridProps) => {
  return (
    <div className="grid grid-rows-6 gap-2 p-6 bg-card rounded-lg shadow-lg">
      {Array.from({ length: 6 }, (_, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-5 gap-2">
          {Array.from({ length: 5 }, (_, colIndex) => (
            <WordleCell
              key={colIndex}
              letter={gridData.letters[rowIndex]?.[colIndex] || ''}
              state={gridData.states[rowIndex]?.[colIndex] || 'empty'}
              onClick={() => onCellClick(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};