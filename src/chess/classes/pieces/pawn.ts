import { BasePiece } from "../base-piece";
import { Chessboard } from "../chessboard";
import { Color } from "../../enums/color";
import { PieceType } from "../../enums/piece-type";
import { Piece } from "../piece";
import { Move } from "../../types/move";
import { Position } from "../../types/position";
import { Queen } from "./queen";
import { SpecialtyMove } from "../../enums/specialty-move";

export class Pawn extends BasePiece implements Piece {
  constructor(color: Color, numMoves: number) {
    super(color, PieceType.PAWN, numMoves);
  }

  public getAvailableMoves(
    position: Position,
    chessboard: Chessboard<Piece>,
  ): Move[] {
    const { column, row } = position;
    const endPositions = new Array<Position>();
    const direction = this.color === Color.BLACK ? 1 : -1;
    const endRow = row + direction;
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
    if (!chessboard.at(middle)) {
      endPositions.push(middle);
    }
    piece = chessboard.at(position);
    if (!piece?.numMoves) {
      const forwardTwo: Position = { column, row: endRow + direction };
      if (!chessboard.at(forwardTwo)) {
        endPositions.push(forwardTwo);
      }
    }
    const specialtyMoves = new Array<Move>();
    if (row > 1 && row < 6) {
      for (let i = -1; i <= 1; i += 2) {
        piece = chessboard.at({ column: column + i, row });
        if (piece) {
          const { color, numMoves, type } = piece;
          if (
            color !== this.color &&
            type === PieceType.PAWN &&
            numMoves === 1
          ) {
            const end: Position = { column: column + i, row: endRow };
            specialtyMoves.push({
              end,
              specialtyMoveType: SpecialtyMove.EN_PASSANT,
              start: position,
            });
          }
        }
      }
    }
    return [
      ...endPositions.map(
        (end: Position): Move => ({
          end,
          specialtyMoveType:
            end.row === 0 || end.row === 7
              ? SpecialtyMove.PROMOTION
              : undefined,
          start: position,
        }),
      ),
      ...specialtyMoves,
    ].filter(({ end }) => chessboard.isPositionValid(end));
  }

  public clone<T extends BasePiece>(): T {
    return new Pawn(this.color, this.numMoves) as unknown as T;
  }

  public specialtyMove(move: Move, chessboard: Chessboard<Piece>): void {
    const { specialtyMoveType } = move;
    switch (specialtyMoveType) {
      case SpecialtyMove.PROMOTION:
        this.promote(move, chessboard);
        break;
      case SpecialtyMove.EN_PASSANT:
        this.enPassant(move, chessboard);
        break;
    }
  }

  private promote({ end }: Move, chessboard: Chessboard<Piece>): void {
    chessboard.clearCell(end);
    chessboard.addPiece(new Queen(this.color, this.numMoves), end);
  }

  private enPassant({ end }: Move, chessboard: Chessboard<Piece>): void {
    const { column, row } = end;
    const enemyRow = row > 4 ? 4 : 3;
    chessboard.clearCell({ column, row: enemyRow });
  }
}
