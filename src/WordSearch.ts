import { Letter } from "./Letter";
import { Word } from "./Word";
import { createCanvas, loadImage } from "canvas";
import * as fs from "fs";

export class WordSearch {
  _rows: number; // number of rows in the grid
  _columns: number; // number of columns in the grid
  _letters: Letter[] = []; // array of Letter objects
  _foundWords: Word[] = []; // array of Word objects

  constructor(rows: number, columns: number) {
    this._rows = rows;
    this._columns = columns;
  }

  /**
   * Add a letter to the grid
   * @param letter The letter to add
   * @param row The row to add the letter to
   * @param column The column to add the letter to
   */
  addLetter(letter: string, row: number, column: number) {
    if (this.getLetter(row, column))
      return console.error("Letter already exists at this position");

    if (row < 0 || row >= this._rows || column < 0 || column >= this._columns)
      return console.error("Position out of bounds");

    const newLetter = new Letter(letter, row, column);
    this._letters.push(newLetter);
  }

  /**
   * Add a row of letters to the grid
   * @param row The row to add the letters to
   * @param letters The letters to add
   * @returns void
   */
  addRow(row: number, letters: string) {
    if (letters.length !== this._columns)
      return console.error("Invalid row length");

    for (let i = 0; i < letters.length; i++) {
      this.addLetter(letters[i], row, i);
    }
  }

  /**
   * Get the letter at a given position
   * @param row The row
   * @param column The column
   * @returns Letter object if found, undefined otherwise
   */
  getLetter(row: number, column: number): Letter | undefined {
    if (row < 0 || row >= this._rows || column < 0 || column >= this._columns)
      return undefined;

    return this._letters.find(
      (letter) => letter._row === row && letter._column === column
    );
  }

  /**
   * Find a given letter in the 3x3 grid around a given position
   * @param row The row to search around
   * @param column The column to search around
   * @param letter The character to search for
   */
  findLetter(row: number, column: number, letter: string): Letter | undefined {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const foundLetter = this.getLetter(row + i, column + j);
        if (foundLetter?._letter === letter) return foundLetter;
      }
    }
    return undefined;
  }

  /**
   * Find a given word in the grid
   * @param word The word to search for
   * @returns A Word object if found, undefined otherwise
   */
  findWord(word: string): Word | undefined {
    word = word.toUpperCase();
    const firstLetter = word[0];
    const wordLength = word.length;
    const firstLetters = this._letters.filter(
      (letter) => letter._letter === firstLetter
    );

    for (const letter of firstLetters) {
      // Search in all possible directions from the first letter
      const directions = [
        [-1, 0], // Up
        [1, 0], // Down
        [0, -1], // Left
        [0, 1], // Right
        [-1, -1], // Up-Left
        [-1, 1], // Up-Right
        [1, -1], // Down-Left
        [1, 1], // Down-Right
      ];

      for (const [directionRow, directionCol] of directions) {
        let foundWord = [letter];
        let isValid = true;

        for (let i = 1; i < wordLength; i++) {
          const expectedRow = letter._row + i * directionRow;
          const expectedCol = letter._column + i * directionCol;

          const nextLetterPosition = this.getLetter(expectedRow, expectedCol);
          if (!nextLetterPosition || nextLetterPosition._letter !== word[i]) {
            isValid = false;
            break;
          }

          foundWord.push(nextLetterPosition);
        }

        if (isValid && foundWord.length === wordLength) {
          const newWord = new Word(word, foundWord);
          console.log(`Found word: ${newWord._word}`);
          this._foundWords.push(newWord);
          return newWord;
        }
      }
    }

    console.log(`Word not found: ${word}`);
    return undefined;
  }

  /**
   * Print the grid
   * @param showLines Whether to show lines between each cell
   */
  printGrid(showLines: boolean = false) {
    // Print the grid with equal spacing and | and - to make a nice table
    // If showLines is true, print the grid with lines between each cell

    let grid = "";
    for (let i = 0; i < this._rows; i++) {
      for (let j = 0; j < this._columns; j++) {
        const letter = this.getLetter(i, j)?._letter || " ";
        grid += ` ${letter} `;
        if (showLines) grid += "|";
      }
      grid += "\n";
      if (showLines) {
        for (let j = 0; j < this._columns; j++) {
          grid += "---";
          if (j < this._columns - 1) grid += "+";
        }
        grid += "\n";
      }
    }
    console.log(grid);
  }

  /**
   * Convert the grid to an image
   * The image will be saved at the given location
   * The unused letters will be displayed at the bottom of the image
   */
  toImage(filepath: string = "./wordsearch.png") {
    const canvas = createCanvas(this._columns * 50 + 25, this._rows * 50 + 25);
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "black";
    context.font = "20px Arial";

    for (let i = 0; i < this._rows; i++) {
      for (let j = 0; j < this._columns; j++) {
        const letter = this.getLetter(i, j)?._letter || " ";
        context.fillText(letter, j * 50 + 20, i * 50 + 30);
      }
    }

    for (const word of this._foundWords) {
      const start = word._startCoordinates;
      const end = word._endCoordinates;

      context.strokeStyle = word._colour;
      context.lineWidth = 15;
      context.globalAlpha = 0.75;

      context.beginPath();
      context.moveTo(start.column * 50 + 25, start.row * 50 + 25);
      context.lineTo(end.column * 50 + 30, end.row * 50 + 25);
      context.stroke();
    }

    const unusedLetters = this.unusedLetters()
      .map((letter) => letter._letter)
      .join("");

    context.font = "15px Arial";
    context.fillText(unusedLetters, 10, this._rows * 50 + 10);

    context.strokeStyle = "red";
    context.lineWidth = 4;
    context.globalAlpha = 1;

    for (const letter of this.unusedLetters()) {
      context.beginPath();
      context.arc(
        letter._column * 50 + 25,
        letter._row * 50 + 25,
        20,
        0,
        2 * Math.PI
      );
      context.stroke();
    }

    // From the top right, draw a text rotated 90 degrees (heading downwards, top of the letter on the right), same font size
    // Text should be the date and time of the image creation
    const date = new Date().toISOString().split("T")[0].replace(/-/g, "/");
    context.save();
    context.translate(canvas.width - 20, 10);
    context.rotate(Math.PI / 2);
    context.textAlign = "left";
    context.fillText(date + " - https://platenburg.dev", 0, 0);
    context.restore();

    // Save the image with proper stream handling
    const out = fs.createWriteStream(filepath);
    const stream = canvas.createPNGStream();

    return new Promise<void>((resolve, reject) => {
      stream.pipe(out);
      out.on("finish", () => {
        resolve(); // Resolve the promise once the writing is done
      });
      out.on("error", (err) => {
        reject(err); // Reject the promise on an error
      });
    });
  }

  /**
   * Get the letters that are not part of any word
   * @returns An array of Letter objects
   */
  unusedLetters(): Letter[] {
    return this._letters.filter(
      (letter) =>
        !this._foundWords.some((word) => word._letters.includes(letter))
    );
  }
}
