import { Color } from "../../enums/color";
import { Chessboard } from "../chessboard";
import { Piece } from "../piece";
import { getMapping } from "./get-mapping";

export function getHeuristic(board: Chessboard<Piece>, color: Color): number {
  let sum = 0;
  board.getPieces(Color.WHITE).forEach((piece, index) => {
    const { base, mapping } = getMapping(piece);
    const { column, row } = board.decompressSuperIndex(index);
    sum += base + mapping[Math.abs(row - 7)][column];
  });
  board.getPieces(Color.BLACK).forEach((piece, index) => {
    const { base, mapping } = getMapping(piece);
    const { column, row } = board.decompressSuperIndex(index);
    sum -= base + mapping[row][column];
  });
  const sign = color === Color.BLACK ? -1 : 1;
  return sum * sign;
}
