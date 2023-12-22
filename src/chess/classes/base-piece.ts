import { Color } from "../enums/color";
import { PieceType } from "../enums/piece-type";

export abstract class BasePiece {
  color: Color;
  type: PieceType;
  hasMoved: boolean;

  constructor(color: Color, type: PieceType, hasMoved: boolean) {
    this.color = color;
    this.type = type;
    this.hasMoved = hasMoved;
  }

  abstract clone<T extends BasePiece>(): T;
}
