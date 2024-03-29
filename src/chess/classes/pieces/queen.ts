import { BasePiece } from "../base-piece";
import { Chessboard } from "../chessboard";
import { Color } from "../../enums/color";
import { PieceType } from "../../enums/piece-type";
import { Piece } from "../piece";
import { Move } from "../../types/move";
import { Position } from "../../types/position";
import { getDiagonalMoves } from "./util/get-diagonal-moves";
import { getHorizontalAndVerticalMoves } from "./util/get-horizontal-and-vertical-moves";

export class Queen extends BasePiece implements Piece {
  constructor(color: Color, numMoves: number) {
    super(color, PieceType.QUEEN, numMoves);
  }

  public getAvailableMoves(
    position: Position,
    chessboard: Chessboard<Piece>,
  ): Move[] {
    return [
      ...getDiagonalMoves(this.color, position, chessboard),
      ...getHorizontalAndVerticalMoves(this.color, position, chessboard),
    ];
  }

  public clone<T extends BasePiece>(): T {
    return new Queen(this.color, this.numMoves) as unknown as T;
  }
}
