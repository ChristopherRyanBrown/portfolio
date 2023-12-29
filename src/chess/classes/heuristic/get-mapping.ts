import { PieceType } from "../../enums/piece-type";
import { Piece } from "../piece";

export function getMapping({ type }: Piece) {
  switch (type) {
    case PieceType.BISHOP:
      return 3000;
    case PieceType.KING:
      return 200000;
    case PieceType.KNIGHT:
      return 3000;
    case PieceType.PAWN:
      return 1000;
    case PieceType.QUEEN:
      return 9000;
    case PieceType.ROOK:
      return 5000;
  }
}
