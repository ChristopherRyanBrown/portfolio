import { BasePiece } from "./base-piece";
import { Color } from "../enums/color";
import { Move } from "../types/move";
import { Position } from "../types/position";

export class Chessboard<T extends BasePiece> {
  private blacks: Map<number, T>;
  private whites: Map<number, T>;
  private capturedBlacks: T[];
  private capturedWhites: T[];

  constructor(
    blacks?: Map<number, T>,
    whites?: Map<number, T>,
    capturedBlacks?: T[],
    capturedWhites?: T[],
  ) {
    this.blacks = blacks ?? new Map<number, T>();
    this.whites = whites ?? new Map<number, T>();
    this.capturedBlacks = capturedBlacks ?? new Array<T>();
    this.capturedWhites = capturedWhites ?? new Array<T>();
  }

  public clone(): Chessboard<T> {
    return new Chessboard<T>(
      this.cloneMap(this.blacks),
      this.cloneMap(this.whites),
      this.cloneArray(this.capturedBlacks),
      this.cloneArray(this.capturedWhites),
    );
  }

  public at(position: Position): T | undefined {
    const index = this.superIndex(position);
    return this.blacks.get(index) ?? this.whites.get(index);
  }

  public addPiece(piece: T, position: Position): void {
    const { color } = piece;
    const pieces = this.getPieces(color);
    const index = this.superIndex(position);
    pieces.set(index, piece);
  }

  public executeMove(move: Move): void {
    const { end } = move;
    this.clearCell(end);
    this.movePiece(move);
  }

  public clearCell(position: Position): void {
    const piece = this.at(position);
    if (!piece) {
      return;
    }
    const { color } = piece;
    const index = this.superIndex(position);
    const pieces = this.getPieces(color);
    const captured = this.getCapturedPieces(color);
    captured.push(piece);
    pieces.delete(index);
  }

  public getPieces(color: Color): Map<number, T> {
    return color === Color.BLACK ? this.blacks : this.whites;
  }

  public getCapturedPieces(color: Color): T[] {
    return color === Color.BLACK ? this.capturedBlacks : this.capturedWhites;
  }

  public decompressSuperIndex(superIndex: number): Position {
    const column = superIndex % 8;
    const row = (superIndex - column) / 8;
    return { column, row };
  }

  public isPositionValid({ column, row }: Position): boolean {
    return row >= 0 && row < 8 && column >= 0 && column < 8;
  }

  private cloneMap(map: Map<number, T>): Map<number, T> {
    return new Map(
      [...map.entries()].map(([key, value]) => [key, value.clone() as T]),
    );
  }

  private cloneArray(arr: T[]): T[] {
    return arr.map((piece) => piece.clone() as T);
  }

  private movePiece({ end, start }: Move): void {
    const piece = this.at(start);
    if (!piece) {
      return;
    }
    const { color } = piece;
    const startIndex = this.superIndex(start);
    const endIndex = this.superIndex(end);
    const pieces = this.getPieces(color);
    piece.numMoves++;
    pieces.set(endIndex, piece);
    pieces.delete(startIndex);
  }

  private superIndex({ column, row }: Position): number {
    return row * 8 + column;
  }
}
