import { BasePiece } from "../base-piece";
import { Chessboard } from "../chessboard";
import { Color } from "../../enums/color";
import { PieceType } from "../../enums/piece-type";
import { Piece } from "../piece";
import { Move } from "../../types/move";
import { Position } from "../../types/position";

export class Pawn extends BasePiece implements Piece {
  constructor(color: Color, hasMoved: boolean) {
    super(color, PieceType.PAWN, hasMoved);
  }

  public getAvailableMoves(
    position: Position,
    chessboard: Chessboard<Piece>,
  ): Move[] {
    const { column, row } = position;
    const endPositions = new Array<Position>();
    const direction = this.color === Color.BLACK ? 1 : -1;
    const endRow = row + direction;
    if (endRow < 0 || endRow > 7) {
      return [];
    }
    const leftDiag: Position = { column: column - 1, row: endRow };
    const rightDiag: Position = { column: column + 1, row: endRow };
    const middle: Position = { column, row: endRow };
    let piece = chessboard.at(leftDiag);
    if (piece && piece.color !== this.color) {
      endPositions.push(leftDiag);
    }
    piece = chessboard.at(rightDiag);
    if (piece && piece.color !== this.color) {
      endPositions.push(rightDiag);
    }
    endPositions.push(middle);
    return endPositions.map(
      (end: Position): Move => ({ end, start: position }),
    );
  }

  clone<T extends BasePiece>(): T {
    return new Pawn(this.color, this.hasMoved) as unknown as T;
  }
}
