import { BasePiece } from "../base-piece";
import { Chessboard } from "../chessboard";
import { Color } from "../../enums/color";
import { PieceType } from "../../enums/piece-type";
import { Piece } from "../piece";
import { Move } from "../../types/move";
import { Position } from "../../types/position";
import { SpecialtyMove } from "../../enums/specialty-move";

export class King extends BasePiece implements Piece {
  constructor(color: Color, numMoves: number) {
    super(color, PieceType.KING, numMoves);
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
        const piece = chessboard.at(newPosition);
        if (!piece || piece.color !== this.color) {
          endPositions.push(newPosition);
        }
      }
    }

    const specialtyMoves = new Array<Move>();

    const king = chessboard.at(position);
    if (!king?.numMoves) {
      const leftRook = chessboard.at({ column: 0, row });
      if (leftRook && leftRook.type === PieceType.ROOK && !leftRook.numMoves) {
        if (![1, 2, 3].find((col) => chessboard.at({ column: col, row }))) {
          specialtyMoves.push({
            end: { column: column - 2, row },
            specialtyMoveType: SpecialtyMove.CASTLE,
            start: position,
          });
        }
      }
      const rightRook = chessboard.at({ column: 7, row });
      if (
        rightRook &&
        rightRook.type === PieceType.ROOK &&
        !rightRook.numMoves
      ) {
        if (![5, 6].find((col) => chessboard.at({ column: col, row }))) {
          specialtyMoves.push({
            end: { column: column + 2, row },
            specialtyMoveType: SpecialtyMove.CASTLE,
            start: position,
          });
        }
      }
    }

    return [
      ...endPositions.map((end: Position): Move => ({ end, start: position })),
      ...specialtyMoves,
    ].filter(({ end }) => chessboard.isPositionValid(end));
  }

  public clone<T extends BasePiece>(): T {
    return new King(this.color, this.numMoves) as unknown as T;
  }

  public specialtyMove(move: Move, chessboard: Chessboard<Piece>): void {
    const { specialtyMoveType } = move;
    if (specialtyMoveType === SpecialtyMove.CASTLE) {
      this.castle(move, chessboard);
    }
  }

  private castle({ end }: Move, chessboard: Chessboard<Piece>): void {
    const { column, row } = end;
    const startColumn = column > 4 ? 7 : 0;
    const endColumn = column > 4 ? column - 1 : column + 1;
    chessboard.executeMove({
      end: { column: endColumn, row },
      start: { column: startColumn, row },
    });
  }
}
