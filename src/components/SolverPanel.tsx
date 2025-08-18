import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Lightbulb, Target } from "lucide-react";

interface SolverPanelProps {
  possibleWords: string[];
  bestGuess: string | null;
  onClear: () => void;
  onGetHint: () => void;
}

export const SolverPanel = ({ possibleWords, bestGuess, onClear, onGetHint }: SolverPanelProps) => {
  return (
    <Card className="p-6 space-y-4 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Target className="w-6 h-6 text-primary" />
          Wordle Solver
        </h2>
        <Button
          variant="outline"
          size="sm"
          onClick={onClear}
          className="flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Reset
        </Button>
      </div>

      {bestGuess && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-wordle-present" />
            Sugestie următoare:
          </h3>
          <Badge variant="secondary" className="text-lg px-4 py-2 bg-primary text-primary-foreground">
            {bestGuess}
          </Badge>
        </div>
      )}

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">
          Cuvinte posibile ({possibleWords.length})
        </h3>
        {possibleWords.length > 0 ? (
          <div className="max-h-40 overflow-y-auto space-y-1">
            <div className="grid grid-cols-3 gap-2">
              {possibleWords.slice(0, 12).map((word, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="justify-center hover:bg-secondary"
                >
                  {word}
                </Badge>
              ))}
            </div>
            {possibleWords.length > 12 && (
              <p className="text-sm text-muted-foreground text-center">
                ... și încă {possibleWords.length - 12} cuvinte
              </p>
            )}
          </div>
        ) : (
          <p className="text-muted-foreground">Nu s-au găsit cuvinte posibile.</p>
        )}
      </div>

      <Button
        onClick={onGetHint}
        className="w-full flex items-center gap-2"
        disabled={!bestGuess}
      >
        <Lightbulb className="w-4 h-4" />
        Obține sugestie
      </Button>
    </Card>
  );
};