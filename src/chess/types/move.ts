import { Position } from "./position";

export interface Move
  extends Readonly<{
    end: Position;
    start: Position;
  }> {}
