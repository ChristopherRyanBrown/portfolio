import { BasePiece } from "./base-piece";
import { Chessboard } from "./chessboard";
import { Move } from "../types/move";
import { Position } from "../types/position";

export interface Piece {
  specialtyMove?(move: Move, chessboard: Chessboard<Piece>): void;
}

export abstract class Piece extends BasePiece {
  public abstract getAvailableMoves(
    position: Position,
    chessboard: Chessboard<Piece>,
  ): Move[];
}
