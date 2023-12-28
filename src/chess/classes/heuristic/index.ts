import { Color } from "../../enums/color";
import { Chessboard } from "../chessboard";
import { Piece } from "../piece";
import { getMapping } from "./get-mapping";

export function getHeuristic(board: Chessboard<Piece>, color: Color): number {
  let sum = 0;
  board.getPieces(Color.WHITE).forEach((piece, index) => {
    const { column, row } = board.decompressSuperIndex(index);
    const mapping = getMapping(piece);
    sum += mapping[row][column];
  });
  board.getPieces(Color.BLACK).forEach((piece, index) => {
    const { column, row } = board.decompressSuperIndex(index);
    const mapping = getMapping(piece);
    sum -= mapping[Math.abs(row - 7)][column];
  });
  return sum;
}
