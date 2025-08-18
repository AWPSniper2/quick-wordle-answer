import { ROMANIAN_WORDS } from "@/data/romanianWords";
import { CellState } from "@/components/WordleCell";

export interface LetterConstraint {
  letter: string;
  position: number;
  state: CellState;
}

export interface SolverConstraints {
  correctLetters: { [position: number]: string };
  presentLetters: string[];
  absentLetters: string[];
  wrongPositions: { [letter: string]: number[] };
}

export class WordleSolver {
  private constraints: SolverConstraints = {
    correctLetters: {},
    presentLetters: [],
    absentLetters: [],
    wrongPositions: {}
  };

  addConstraint(letterConstraint: LetterConstraint) {
    const { letter, position, state } = letterConstraint;
    
    switch (state) {
      case 'correct':
        this.constraints.correctLetters[position] = letter;
        break;
      case 'present':
        if (!this.constraints.presentLetters.includes(letter)) {
          this.constraints.presentLetters.push(letter);
        }
        if (!this.constraints.wrongPositions[letter]) {
          this.constraints.wrongPositions[letter] = [];
        }
        if (!this.constraints.wrongPositions[letter].includes(position)) {
          this.constraints.wrongPositions[letter].push(position);
        }
        break;
      case 'absent':
        if (!this.constraints.absentLetters.includes(letter)) {
          this.constraints.absentLetters.push(letter);
        }
        break;
    }
  }

  clearConstraints() {
    this.constraints = {
      correctLetters: {},
      presentLetters: [],
      absentLetters: [],
      wrongPositions: {}
    };
  }

  getPossibleWords(): string[] {
    return ROMANIAN_WORDS.filter(word => this.isWordValid(word));
  }

  private isWordValid(word: string): boolean {
    // Check correct letters
    for (const [position, letter] of Object.entries(this.constraints.correctLetters)) {
      if (word[parseInt(position)] !== letter) {
        return false;
      }
    }

    // Check present letters
    for (const letter of this.constraints.presentLetters) {
      if (!word.includes(letter)) {
        return false;
      }
    }

    // Check absent letters
    for (const letter of this.constraints.absentLetters) {
      if (word.includes(letter)) {
        return false;
      }
    }

    // Check wrong positions
    for (const [letter, wrongPositions] of Object.entries(this.constraints.wrongPositions)) {
      for (const position of wrongPositions) {
        if (word[position] === letter) {
          return false;
        }
      }
    }

    return true;
  }

  getBestNextGuess(): string | null {
    const possibleWords = this.getPossibleWords();
    
    if (possibleWords.length === 0) return null;
    if (possibleWords.length === 1) return possibleWords[0];

    // Simple heuristic: prefer words with common letters
    const letterFrequency = this.calculateLetterFrequency(possibleWords);
    
    let bestWord = possibleWords[0];
    let bestScore = this.scoreWord(bestWord, letterFrequency);

    for (const word of possibleWords) {
      const score = this.scoreWord(word, letterFrequency);
      if (score > bestScore) {
        bestScore = score;
        bestWord = word;
      }
    }

    return bestWord;
  }

  private calculateLetterFrequency(words: string[]): { [letter: string]: number } {
    const frequency: { [letter: string]: number } = {};
    
    for (const word of words) {
      for (const letter of word) {
        frequency[letter] = (frequency[letter] || 0) + 1;
      }
    }
    
    return frequency;
  }

  private scoreWord(word: string, letterFrequency: { [letter: string]: number }): number {
    let score = 0;
    const usedLetters = new Set<string>();
    
    for (const letter of word) {
      if (!usedLetters.has(letter)) {
        score += letterFrequency[letter] || 0;
        usedLetters.add(letter);
      }
    }
    
    return score;
  }
}