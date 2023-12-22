import { BasePiece } from "../base-piece";
import { Chessboard } from "../chessboard";
import { Color } from "../../enums/color";
import { PieceType } from "../../enums/piece-type";
import { Piece } from "../piece";
import { Move } from "../../types/move";
import { Position } from "../../types/position";
import { getHorizontalAndVerticalMoves } from "./util/get-horizontal-and-vertical-moves";

export class Rook extends BasePiece implements Piece {
  constructor(color: Color, hasMoved: boolean) {
    super(color, PieceType.ROOK, hasMoved);
  }

  public getAvailableMoves(
    position: Position,
    chessboard: Chessboard<Piece>,
  ): Move[] {
    return getHorizontalAndVerticalMoves(this.color, position, chessboard);
  }

  public clone<T extends BasePiece>(): T {
    return new Rook(this.color, this.hasMoved) as unknown as T;
  }
}
