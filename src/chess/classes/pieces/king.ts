import { BasePiece } from "../base-piece";
import { Chessboard } from "../chessboard";
import { Color } from "../../enums/color";
import { PieceType } from "../../enums/piece-type";
import { Piece } from "../piece";
import { Move } from "../../types/move";
import { Position } from "../../types/position";

export class King extends BasePiece implements Piece {
  constructor(color: Color, hasMoved: boolean) {
    super(color, PieceType.KING, hasMoved);
  }

  public getAvailableMoves(
    position: Position,
    chessboard: Chessboard<Piece>,
  ): Move[] {
    const { column, row } = position;
    const endPositions = new Array<Position>();

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) {
          continue;
        }
        const newPosition: Position = { column: column + j, row: row + i };
        if (chessboard.isPositionValid(newPosition)) {
          const piece = chessboard.at(newPosition);
          if (!piece || piece.color !== this.color) {
            endPositions.push(newPosition);
          }
        }
      }
    }

    return endPositions.map(
      (end: Position): Move => ({ end, start: position }),
    );
  }

  public clone<T extends BasePiece>(): T {
    return new King(this.color, this.hasMoved) as unknown as T;
  }
}