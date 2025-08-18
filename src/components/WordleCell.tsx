import { cn } from "@/lib/utils";

export type CellState = 'empty' | 'correct' | 'present' | 'absent';

interface WordleCellProps {
  letter: string;
  state: CellState;
  onClick?: () => void;
  className?: string;
}

const stateStyles = {
  empty: 'bg-wordle-empty border-2 border-border text-muted-foreground',
  correct: 'bg-wordle-correct text-white border-wordle-correct animate-flip',
  present: 'bg-wordle-present text-white border-wordle-present animate-flip',
  absent: 'bg-wordle-absent text-white border-wordle-absent animate-flip'
};

export const WordleCell = ({ letter, state, onClick, className }: WordleCellProps) => {
  return (
    <div
      className={cn(
        "w-14 h-14 rounded-md flex items-center justify-center font-bold text-2xl uppercase cursor-pointer transition-all duration-200 hover:scale-105",
        stateStyles[state],
        className
      )}
      onClick={onClick}
    >
      {letter}
    </div>
  );
};