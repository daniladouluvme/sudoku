export class SudokuGenerator {
  private solved: number[] = new Array(81).fill(0);
  private notSolved: number[] = [];

  constructor(difficulty: number) {
    this.fillGrid();
    this.removeNumbers(difficulty);
  }

  private fillGrid(): boolean {
    for (let index = 0; index < 81; index++) {
      if (this.solved[index] === 0) {
        const numbers = this.shuffle(
          Array.from({ length: 9 }, (_, i) => i + 1)
        );
        for (const num of numbers) {
          if (this.isValid(index, num)) {
            this.solved[index] = num;
            if (this.fillGrid()) {
              return true;
            }
            this.solved[index] = 0;
          }
        }
        return false;
      }
    }
    return true;
  }

  private isValid(index: number, num: number): boolean {
    const row = Math.floor(index / 9);
    const col = index % 9;

    for (let i = 0; i < 9; i++) {
      if (
        this.solved[row * 9 + i] === num ||
        this.solved[i * 9 + col] === num
      ) {
        return false;
      }
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.solved[(startRow + i) * 9 + (startCol + j)] === num) {
          return false;
        }
      }
    }
    return true;
  }

  private shuffle(array: number[]): number[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  private removeNumbers(difficulty: number): void {
    this.notSolved = [...this.solved];
    let attempts = difficulty;
    while (attempts > 0) {
      const index = Math.floor(Math.random() * 81);
      if (this.notSolved[index] !== 0) {
        const backup = this.notSolved[index];
        this.notSolved[index] = 0;
        if (!this.hasSolution()) {
          this.notSolved[index] = backup;
        } else {
          attempts--;
        }
      }
    }
  }

  private hasSolution(): boolean {
    const tempGrid = [...this.solved];
    return this.solve(tempGrid);
  }

  private solve(solved: number[]): boolean {
    for (let index = 0; index < 81; index++) {
      if (solved[index] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (this.isValid(index, num)) {
            solved[index] = num;
            if (this.solve(solved)) {
              return true;
            }
            solved[index] = 0;
          }
        }
        return false;
      }
    }
    return true;
  }

  public getSudoku() {
    return {
      solvedSudoku: [...this.solved],
      notSolvedSudoku: [...this.notSolved],
    };
  }
}
