import { Color } from "../enums/color";
import { PieceType } from "../enums/piece-type";

export abstract class BasePiece {
  color: Color;
  type: PieceType;
  numMoves: number;

  constructor(color: Color, type: PieceType, numMoves: number) {
    this.color = color;
    this.type = type;
    this.numMoves = numMoves;
  }

  abstract clone<T extends BasePiece>(): T;
}
