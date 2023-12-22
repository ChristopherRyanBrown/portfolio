import { BasePiece } from "../base-piece";
import { Chessboard } from "../chessboard";
import { Color } from "../../enums/color";
import { PieceType } from "../../enums/piece-type";
import { Piece } from "../piece";
import { Move } from "../../types/move";
import { Position } from "../../types/position";
import { getDiagonalMoves } from "./util/get-diagonal-moves";

export class Bishop extends BasePiece implements Piece {
  constructor(color: Color, hasMoved: boolean) {
    super(color, PieceType.BISHOP, hasMoved);
  }

  public getAvailableMoves(
    position: Position,
    chessboard: Chessboard<Piece>,
  ): Move[] {
    return getDiagonalMoves(this.color, position, chessboard);
  }

  clone<T extends BasePiece>(): T {
    return new Bishop(this.color, this.hasMoved) as unknown as T;
  }
}
