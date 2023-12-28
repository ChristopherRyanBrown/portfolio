import { Color } from "../../enums/color";
import { Chessboard } from "../chessboard";
import { Piece } from "../piece";
import { getMapping } from "./get-mapping";

export function getHeuristic(board: Chessboard<Piece>, color: Color): number {
  let sum = 0;
  board.getPieces(Color.WHITE).forEach((piece) => {
    const mapping = getMapping(piece);
    sum += mapping;
  });
  board.getPieces(Color.BLACK).forEach((piece) => {
    const mapping = getMapping(piece);
    sum -= mapping;
  });
  const sign = color === Color.BLACK ? -1 : 1;
  return sum * sign;
}
