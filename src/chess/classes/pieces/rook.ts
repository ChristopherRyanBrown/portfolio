import { BasePiece } from "../base-piece";
import { Chessboard } from "../chessboard";
import { Color } from "../../enums/color";
import { PieceType } from "../../enums/piece-type";
import { Piece } from "../piece";
import { Move } from "../../types/move";
import { Position } from "../../types/position";

export class Rook extends BasePiece implements Piece {
  constructor(color: Color, hasMoved: boolean) {
    super(color, PieceType.ROOK, hasMoved);
  }

  public getAvailableMoves(
    position: Position,
    chessboard: Chessboard<Piece>,
  ): Move[] {
    const endPositions = new Array<Position>();

    const { column, row } = position;

    for (let i = row - 1; i >= 0; i--) {
      const newPosition: Position = { row: i, column };
      const piece = chessboard.at(newPosition);
      if (piece) {
        if (piece.color !== this.color) {
          endPositions.push(newPosition);
        }
        break;
      } else {
        endPositions.push(newPosition);
      }
    }

    for (let i = row + 1; i < 8; i++) {
      const newPosition: Position = { row: i, column };
      const piece = chessboard.at(newPosition);
      if (piece) {
        if (piece.color !== this.color) {
          endPositions.push(newPosition);
        }
        break;
      } else {
        endPositions.push(newPosition);
      }
    }

    for (let i = column - 1; i >= 0; i--) {
      const newPosition: Position = { row, column: i };
      const piece = chessboard.at(newPosition);
      if (piece) {
        if (piece.color !== this.color) {
          endPositions.push(newPosition);
        }
        break;
      } else {
        endPositions.push(newPosition);
      }
    }

    for (let i = column + 1; i < 8; i++) {
      const newPosition: Position = { row, column: i };
      const piece = chessboard.at(newPosition);
      if (piece) {
        if (piece.color !== this.color) {
          endPositions.push(newPosition);
        }
        break;
      } else {
        endPositions.push(newPosition);
      }
    }

    return endPositions.map(
      (end: Position): Move => ({ end, start: position }),
    );
  }

  clone<T extends BasePiece>(): T {
    return new Rook(this.color, this.hasMoved) as unknown as T;
  }
}
