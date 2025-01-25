export class Letter {
  _letter: string; // the letter itself
  _row: number; // the row in the grid
  _column: number; // the column in the grid

  constructor(letter: string, row: number, column: number) {
    this._letter = letter.toUpperCase();
    this._row = row;
    this._column = column;
  }
}
