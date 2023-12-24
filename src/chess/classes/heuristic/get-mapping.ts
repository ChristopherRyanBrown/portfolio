import { PieceType } from "../../enums/piece-type";
import { Piece } from "../piece";
import { bishopMapping } from "./bishop-mapping";
import { kingMapping } from "./king-mapping";
import { knightMapping } from "./knight-mapping";
import { pawnMapping } from "./pawn-mapping";
import { queenMapping } from "./queen-mapping";
import { rookMapping } from "./rook-mapping";

export function getMapping({ type }: Piece) {
  switch (type) {
    case PieceType.BISHOP:
      return bishopMapping;
    case PieceType.KING:
      return kingMapping;
    case PieceType.KNIGHT:
      return knightMapping;
    case PieceType.PAWN:
      return pawnMapping;
    case PieceType.QUEEN:
      return queenMapping;
    case PieceType.ROOK:
      return rookMapping;
  }
}
