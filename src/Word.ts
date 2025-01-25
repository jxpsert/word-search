import { Letter } from "./Letter";

export class Word {
  _word: string; // the word itself
  _colour: string; // the colour of the word
  _letters: Letter[] = []; // array of Letter objects that make up the word
  _startCoordinates: { row: number; column: number }; // the starting coordinates of the word
  _endCoordinates: { row: number; column: number }; // the ending coordinates of the word

  constructor(word: string, letters: Letter[]) {
    this._word = word.toUpperCase();
    this._letters = letters;
    this._colour = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
      Math.random() * 255
    })`;

    this._startCoordinates = {
      row: letters[0]._row,
      column: letters[0]._column,
    };

    this._endCoordinates = {
      row: letters[letters.length - 1]._row,
      column: letters[letters.length - 1]._column,
    };
  }
}
