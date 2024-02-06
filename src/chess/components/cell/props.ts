import { Piece } from "../../classes/piece";
import { Color } from "../../enums/color";
import { Move } from "../../types/move";
import { Position } from "../../types/position";

export interface Props
  extends Readonly<{
    availableMoves: ReadonlyArray<Move>;
    color: string;
    currentPlayer: Color;
    piece?: Piece;
    position: Position;
    selectedCell?: Position;
    onMove(move: Move): void;
    onSelect(position?: Position): void;
  }> {}
