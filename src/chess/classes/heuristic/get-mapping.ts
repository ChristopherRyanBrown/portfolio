import { PieceType } from "../../enums/piece-type";
import { Piece } from "../piece";

export function getMapping({ type }: Piece) {
  switch (type) {
    case PieceType.BISHOP:
      return 7000;
    case PieceType.KING:
      return 10000;
    case PieceType.KNIGHT:
      return 8000;
    case PieceType.PAWN:
      return 2000;
    case PieceType.QUEEN:
      return 9000;
    case PieceType.ROOK:
      return 7000;
  }
}
