import { BasePiece } from "../base-piece";
import { Chessboard } from "../chessboard";
import { Color } from "../../enums/color";
import { PieceType } from "../../enums/piece-type";
import { Piece } from "../piece";
import { Move } from "../../types/move";
import { Position } from "../../types/position";

export class Knight extends BasePiece implements Piece {
  constructor(color: Color, numMoves: number) {
    super(color, PieceType.KNIGHT, numMoves);
  }

  public getAvailableMoves(
    position: Position,
    chessboard: Chessboard<Piece>,
  ): Move[] {
    const { column, row } = position;
    const endPositions = new Array<Position>();

    for (let i = -2; i <= 2; i++) {
      for (let j = -2; j <= 2; j++) {
        if (!i || !j || Math.abs(i) === Math.abs(j)) {
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
    return new Knight(this.color, this.numMoves) as unknown as T;
  }
}
