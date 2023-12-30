import { PieceType } from "../../enums/piece-type";
import { Piece } from "../piece";
import { bishopMapping } from "./bishop-mapping";
import { kingMapping } from "./king-mapping";
import { knightMapping } from "./knight-mapping";
import { pawnMapping } from "./pawn-mapping";
import { queenMapping } from "./queen-mapping";
import { rookMapping } from "./rook-mapping";

export function getMapping({ type }: Piece): Mapping {
  switch (type) {
    case PieceType.BISHOP:
      return { base: 300, mapping: bishopMapping };
    case PieceType.KING:
      return { base: 20000, mapping: kingMapping };
    case PieceType.KNIGHT:
      return { base: 300, mapping: knightMapping };
    case PieceType.PAWN:
      return { base: 100, mapping: pawnMapping };
    case PieceType.QUEEN:
      return { base: 900, mapping: queenMapping };
    case PieceType.ROOK:
      return { base: 500, mapping: rookMapping };
  }
}

interface Mapping {
  base: number;
  mapping: Array<Array<number>>;
}
