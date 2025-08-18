import { useState, useCallback } from "react";
import { WordleGrid, GridData } from "@/components/WordleGrid";
import { SolverPanel } from "@/components/SolverPanel";
import { WordleSolver } from "@/utils/wordleSolver";
import { CellState } from "@/components/WordleCell";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Keyboard, Brain } from "lucide-react";

const Index = () => {
  const { toast } = useToast();
  const [solver] = useState(() => new WordleSolver());
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);
  const [inputWord, setInputWord] = useState("");
  
  const [gridData, setGridData] = useState<GridData>({
    letters: Array(6).fill(null).map(() => Array(5).fill("")),
    states: Array(6).fill(null).map(() => Array(5).fill("empty" as CellState))
  });

  const [possibleWords, setPossibleWords] = useState<string[]>([]);
  const [bestGuess, setBestGuess] = useState<string | null>(null);

  const cycleState = (state: CellState): CellState => {
    const states: CellState[] = ['empty', 'absent', 'present', 'correct'];
    const currentIndex = states.indexOf(state);
    return states[(currentIndex + 1) % states.length];
  };

  const handleCellClick = useCallback((row: number, col: number) => {
    if (gridData.letters[row][col] === "") return;

    setGridData(prev => {
      const newStates = [...prev.states];
      newStates[row] = [...newStates[row]];
      newStates[row][col] = cycleState(newStates[row][col]);

      // Update solver constraints
      const letter = prev.letters[row][col];
      const state = newStates[row][col];
      
      if (state !== 'empty') {
        solver.addConstraint({
          letter: letter.toUpperCase(),
          position: col,
          state
        });
      }

      return {
        ...prev,
        states: newStates
      };
    });

    updateSolver();
  }, [gridData.letters, solver]);

  const updateSolver = useCallback(() => {
    const words = solver.getPossibleWords();
    const guess = solver.getBestNextGuess();
    
    setPossibleWords(words);
    setBestGuess(guess);
  }, [solver]);

  const handleAddWord = () => {
    if (inputWord.length !== 5) {
      toast({
        title: "Eroare",
        description: "Cuvântul trebuie să aibă exact 5 litere",
        variant: "destructive",
      });
      return;
    }

    if (currentRow >= 6) {
      toast({
        title: "Eroare", 
        description: "Nu mai sunt rânduri disponibile",
        variant: "destructive",
      });
      return;
    }

    setGridData(prev => {
      const newLetters = [...prev.letters];
      newLetters[currentRow] = inputWord.toUpperCase().split("");
      
      return {
        ...prev,
        letters: newLetters
      };
    });

    setCurrentRow(prev => prev + 1);
    setInputWord("");
    
    toast({
      title: "Succes",
      description: `Cuvântul "${inputWord.toUpperCase()}" a fost adăugat. Faceți clic pe litere pentru a seta starea lor.`,
    });
  };

  const handleClear = () => {
    setGridData({
      letters: Array(6).fill(null).map(() => Array(5).fill("")),
      states: Array(6).fill(null).map(() => Array(5).fill("empty" as CellState))
    });
    setCurrentRow(0);
    setCurrentCol(0);
    setInputWord("");
    solver.clearConstraints();
    setPossibleWords([]);
    setBestGuess(null);
    
    toast({
      title: "Reset complet",
      description: "Toate datele au fost șterse",
    });
  };

  const handleGetHint = () => {
    if (bestGuess) {
      toast({
        title: "Sugestie",
        description: `Încearcă cuvântul: ${bestGuess}`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 animate-slide-up">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-wordle-correct bg-clip-text text-transparent flex items-center justify-center gap-3">
            <Brain className="w-10 h-10 text-primary" />
            Wordle Solver Român
          </h1>
          <p className="text-xl text-muted-foreground">
            Descoperă automat răspunsul la Wordle în română!
          </p>
        </div>

        {/* Input Section */}
        <Card className="p-6 animate-bounce-in">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Keyboard className="w-5 h-5" />
              Adaugă încercarea ta
            </h3>
            <div className="flex gap-2">
              <Input
                value={inputWord}
                onChange={(e) => setInputWord(e.target.value.slice(0, 5))}
                placeholder="Introdu cuvântul de 5 litere"
                className="text-center uppercase font-bold text-lg"
                maxLength={5}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAddWord();
                  }
                }}
              />
              <Button onClick={handleAddWord} disabled={inputWord.length !== 5}>
                Adaugă
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              După ce adaugi cuvântul, fă clic pe fiecare literă pentru a seta starea ei:
              <span className="ml-2 space-x-2">
                <span className="inline-block w-3 h-3 bg-wordle-absent rounded-sm"></span> Absent
                <span className="inline-block w-3 h-3 bg-wordle-present rounded-sm"></span> Prezent
                <span className="inline-block w-3 h-3 bg-wordle-correct rounded-sm"></span> Corect
              </span>
            </p>
          </div>
        </Card>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Wordle Grid */}
          <div className="animate-bounce-in">
            <WordleGrid
              gridData={gridData}
              onCellClick={handleCellClick}
            />
          </div>

          {/* Solver Panel */}
          <SolverPanel
            possibleWords={possibleWords}
            bestGuess={bestGuess}
            onClear={handleClear}
            onGetHint={handleGetHint}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;