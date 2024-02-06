import { SpecialtyMove } from "../enums/specialty-move";
import { Position } from "./position";

export interface Move
  extends Readonly<{
    end: Position;
    specialtyMoveType?: SpecialtyMove;
    start: Position;
  }> {}
