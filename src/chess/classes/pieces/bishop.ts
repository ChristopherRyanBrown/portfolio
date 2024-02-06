import { BasePiece } from "../base-piece";
import { Chessboard } from "../chessboard";
import { Color } from "../../enums/color";
import { PieceType } from "../../enums/piece-type";
import { Piece } from "../piece";
import { Move } from "../../types/move";
import { Position } from "../../types/position";
import { getDiagonalMoves } from "./util/get-diagonal-moves";

export class Bishop extends BasePiece implements Piece {
  constructor(color: Color, numMoves: number) {
    super(color, PieceType.BISHOP, numMoves);
  }

  public getAvailableMoves(
    position: Position,
    chessboard: Chessboard<Piece>,
  ): Move[] {
    return getDiagonalMoves(this.color, position, chessboard);
  }

  public clone<T extends BasePiece>(): T {
    return new Bishop(this.color, this.numMoves) as unknown as T;
  }
}
